import React, { useState, useEffect } from 'react';
import './PomodoroTimer.css'; // CSS файлын импорттау

const PomodoroTimer = () => {
  const [time, setTime] = useState(25 * 60); // 25 минут
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(25 * 60);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="pomodoro-container">
      <div className="timer-display">
        {formatTime(time)}
      </div>
      <button onClick={toggleTimer} className="timer-button">
        {isActive ? 'Тоқтату' : 'Бастау'}
      </button>
      <button onClick={resetTimer} className="reset-button">
        Қалпына келтіру
      </button>
    </div>
  );
};

export default PomodoroTimer;
