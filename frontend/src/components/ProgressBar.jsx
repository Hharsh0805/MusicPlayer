// ProgressBar.js
import React from 'react';

const ProgressBar = ({ progress, duration, onProgressChange }) => {
  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e) => {
    const value = parseFloat(e.target.value);
    const seekTime = (value / 100) * duration;
    onProgressChange(seekTime);
  };

  const progressPercentage = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <div className="progress-bar">
      <span className="time current">{formatTime(progress)}</span>
      <input
        type="range"
        min="0"
        max="100"
        value={progressPercentage}
        onChange={handleSeek}
        className="progress-slider"
      />
      <span className="time total">{formatTime(duration)}</span>
    </div>
  );
};

export default ProgressBar;