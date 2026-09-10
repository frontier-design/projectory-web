import React from 'react';
import { motion } from 'framer-motion';
import styles from './LoadingScreen.module.css';

interface LoadingScreenProps {
  fadeOut?: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ fadeOut = false }) => {
  const pathData =
    'm155.99,45.86c-2.67-2.56-5.65-4.66-9.05-6.39-.23-10.75-3.71-18.99-10.41-24.46-9.36-7.66-22.95-8.28-38.44-8.28h-33.38c-11.23,0-20.36,9.13-20.36,20.36v14.95C20.4,55.08,5.64,79.71,5.64,107.18v51.01c0,5.56,4.52,10.08,10.08,10.08h71c5.56,0,10.08-4.52,10.08-10.08l-.02-20.96h.64c26.15,0,43.04-.88,56.99-13.03,10.06-8.34,14.95-21.39,14.95-39.88,0-17.06-4.5-30.01-13.36-38.48Zm-59.84,18.59h-1.79c-4.71,0-8.55,3.83-8.55,8.55v53.27h-30.49V48.89c7.76-3.28,16-4.96,24.55-4.96h24.02c13.3,0,23.51.51,31.61,2.84-.9,5.17-3.07,8.93-6.66,11.48-7.29,5.42-13.52,6.19-32.69,6.19ZM55.33,27.09c0-5.17,4.21-9.38,9.38-9.38h33.38c13.35,0,24.93.44,31.49,5.8,3.33,2.71,5.34,6.65,6.09,11.95-9.75-2.28-20.95-2.51-31.78-2.51h-24.02c-8.47,0-16.7,1.39-24.55,4.15v-10.02Zm30.48,130.21H16.63v-50.11c0-21.34,10.43-40.68,27.72-52.36v72.33c0,5.56,4.52,10.08,10.08,10.08h31.39v20.06Zm61.48-41.45c-10.16,8.84-21.9,10.41-49.88,10.41h-.61v-50.83c19.45-.02,28.48-.84,38.49-8.28,5.2-3.69,8.69-8.92,10.42-15.6.95.69,1.84,1.44,2.69,2.25h0c6.71,6.41,9.97,16.4,9.97,30.55,0,15.02-3.59,25.3-11.08,31.51Z';

  return (
    <div className={`${styles.container} ${fadeOut ? styles.fadeOut : ''}`}>
      <div className={styles.logoWrapper}>
        <motion.svg
          viewBox="0 0 175 175"
          className={styles.animatedSvg}
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d={pathData}
            className={styles.trailPath}
            initial={{ pathLength: 0, opacity: 1 }}
            animate={{
              pathLength: [0, 1],
              opacity: [1, 1, 1, 0],
            }}
            transition={{
              pathLength: {
                duration: 3,
                ease: 'easeInOut',
                repeat: Infinity,
              },
              opacity: {
                duration: 3,
                ease: 'easeInOut',
                repeat: Infinity,
                times: [0, 0.65, 0.7, 0.75],
              },
            }}
          />

          <motion.path
            d={pathData}
            className={styles.strokePath}
            initial={{ pathLength: 1, opacity: 0 }}
            animate={{
              opacity: [0, 0, 1, 0],
            }}
            transition={{
              duration: 3,
              ease: 'easeInOut',
              repeat: Infinity,
              times: [0, 0.65, 0.7, 0.75],
            }}
          />

          <motion.path
            d={pathData}
            className={styles.fillPath}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0, 1, 1, 0],
            }}
            transition={{
              duration: 3,
              ease: 'easeInOut',
              repeat: Infinity,
              times: [0, 0.7, 0.75, 0.85, 1],
            }}
          />
        </motion.svg>
      </div>
    </div>
  );
};

export default LoadingScreen;
