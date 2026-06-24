import { useState, useEffect } from 'react';
import './ReadingProgress.css';

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(progress);
    };

    window.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', updateProgress);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return (
    <div className="reading-progress-container">
      <div 
        className="reading-progress-bar"
        style={{ width: `${progress}%` }}
      />
      {progress > 0 && progress < 100 && (
        <div className="reading-progress-indicator">
          <span className="progress-text">{Math.round(progress)}%</span>
          <span className="progress-emoji">
            {progress < 25 && '📖'}
            {progress >= 25 && progress < 50 && '📘'}
            {progress >= 50 && progress < 75 && '📕'}
            {progress >= 75 && progress < 95 && '🔥'}
            {progress >= 95 && '🎉'}
          </span>
        </div>
      )}
    </div>
  );
};

export default ReadingProgress;