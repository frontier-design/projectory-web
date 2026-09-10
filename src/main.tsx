import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import '@/styles/global.css'; // Import global styles

createRoot(document.getElementById('root')!).render(<App />);
