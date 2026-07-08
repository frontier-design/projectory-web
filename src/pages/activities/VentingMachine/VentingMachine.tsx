import React, { useState, useEffect, useRef } from 'react';
import styles from './VentingMachine.module.css';

const PROXY_PATH = '/api/venting-machine-form';
// API key is injected server-side by the proxy (api/venting-machine-form.cjs);
// the client never sends or sees it.



// Simple fetch with timeout
async function fetchWithTimeout(url: string, timeoutMs: number = 30000, options?: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal, ...(options || {}) });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timed out after ' + (timeoutMs / 1000) + ' seconds');
    }
    throw error;
  }
}

async function withRetry<T>(fn: () => Promise<T>, retries = 2, baseDelayMs = 400): Promise<T> {
  let attempt = 0;
  // jittered exponential backoff
  while (true) {
    try {
      return await fn();
    } catch (err) {
      if (attempt >= retries) throw err;
      const jitter = Math.random() * 100;
      const delay = baseDelayMs * Math.pow(2, attempt) + jitter;
      await new Promise(res => setTimeout(res, delay));
      attempt++;
    }
  }
}

// Get a single question
async function fetchQuestion(): Promise<string> {
  console.log('Fetching question from:', `${PROXY_PATH}?action=question`);

  try {
    const response = await fetchWithTimeout(
      `${PROXY_PATH}?action=question&t=${Date.now()}`,
      10000
    );    
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Response error:', errorText);
      throw new Error(`Failed to fetch question: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Response data:', data);
    
    // Check if the response contains an error from the backend
    if (data.error) {
      throw new Error(`API error: ${data.error}`);
    }
    
    // Check if the response has the expected question field
    if (!data.question || typeof data.question !== 'string') {
      console.error('Invalid response structure:', data);
      throw new Error(`Invalid response format - expected question field but got: ${JSON.stringify(data)}`);
    }
    
    return data.question;
  } catch (error) {
    console.error('Fetch error details:', error);
    throw error;
  }

}

// Submit response
async function submitResponse(question: string, answer: string): Promise<void> {
  const url = `${PROXY_PATH}?t=${Date.now()}`;
  const response = await fetchWithTimeout(
    url,
    8000,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // keepalive lets the browser continue the POST if the page is navigating
      keepalive: true,
      body: JSON.stringify({ question, answer })
    }
  );

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(text || 'Submission failed');
  }
}

const VentingMachine: React.FC = () => {
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [wordCount, setWordCount] = useState(0);

  const formRef = useRef<HTMLDivElement>(null);
  const answerRef = useRef<HTMLInputElement>(null);
  const hasLoadedRef = useRef(false);

  // Load question on mount
  useEffect(() => {
    // Prevent multiple loads
    if (hasLoadedRef.current) return;
    hasLoadedRef.current = true;
    
    const loadQuestion = async () => {
      console.log('Starting to load question...');
      setLoading(true);
      setError(null);
      
      try {
        const questionText = await fetchQuestion();
        console.log('Question loaded successfully:', questionText);
        setQuestion(questionText);
        console.log('Question state set to:', questionText);
      } catch (error) {
        console.error('Error loading question:', error);
        setError(error instanceof Error ? error.message : 'Failed to load question');
      } finally {
        console.log('Setting loading to false');
        setLoading(false);
      }
    };

    loadQuestion();
  }, []); // Empty dependency array - only run once

  // Calculate word count
  useEffect(() => {
    const words = answer.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, [answer]);

  // Focus input when question loads
  useEffect(() => {
    if (question && answerRef.current) {
      answerRef.current.focus();
    }
  }, [question]);

  // Scroll to form on mount
  useEffect(() => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const nextQuestion = async () => {
    setLoading(true);
    setError(null);
    setAnswer('');
    
    try {
      const questionText = await fetchQuestion();
      setQuestion(questionText);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load new question');
    } finally {
      setLoading(false);
    }
  };

  const isValidAnswer = () => {
    const trimmed = answer.trim();
    return trimmed.length > 0 && wordCount <= 3;
  };

  const handleSubmit = async () => {
    if (!isValidAnswer()) return;

    setError(null);

    // Optimistic UI: show success immediately
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Fire submission in background with retry; on failure, roll back and show error
    withRetry(() => submitResponse(question, answer), 2, 400).catch((error) => {
      setSubmitted(false);
      setError(error instanceof Error ? error.message : 'Submission failed');
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isValidAnswer()) {
      handleSubmit();
    }
  };

  if (submitted) {
    return (
      <div className={styles.thankYou}>
        <h3 className={styles.thankYouTitle}>We got it. Thanks!</h3>
        <p className={styles.thankYouText}>And now we have something waiting for you outside…</p>
      </div>
    );
  }

  // Debug current state
  console.log('Current state - loading:', loading, 'question:', question, 'error:', error);

  if (loading && !question) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loading}></div>
      </div>
    );
  }

  if (error && !question) {
    return (
      <div className={styles.error}>
        <p>{error}</p>
        <button 
          onClick={() => {
            setError(null);
            setLoading(true);
            nextQuestion();
          }}
          className={styles.retryButton}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div ref={formRef} className={styles.formContainer}>
      
      <div className={styles.questionContainer}>
        <div className={styles.questionText}>{question}</div>
      </div>

      <div className={styles.answerContainer}>
        <input
          ref={answerRef}
          id="answer"
          type="text"
          value={answer}
          onChange={(e) => {
            const words = e.target.value.trim().split(/\s+/);
            if (words.length <= 3) {
              setAnswer(e.target.value);
            } else {
              setAnswer(words.slice(0, 3).join(" "));
            }
          }}
          onKeyPress={handleKeyPress}
          placeholder="Type your response here..."
          className={styles.answerInput}
          maxLength={50}
          disabled={loading}
        />
        <div className={styles.wordCount}>
          {wordCount}/3 words
          {wordCount > 3 && <span className={styles.wordCountError}> - Too many words!</span>}
        </div>
      </div>

      <div className={styles.submitContainer}>
        <button 
          onClick={handleSubmit} 
          disabled={!isValidAnswer() || loading}
          className={styles.submitButton}
        >
          {'Submit Response'}
        </button>
      </div>

      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default VentingMachine;
