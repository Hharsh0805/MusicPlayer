import React from 'react';
import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaVolumeUp, FaRandom, FaRedo } from 'react-icons/fa';

const Controls = ({
  isPlaying,
  onPlayPause,
  onSkipPrevious,
  onSkipNext,
  volume,
  onVolumeChange,
  shuffle,
  onShuffleToggle,
  repeat,
  onRepeatToggle
}) => {
  return (
    <div className="controls">
      <button className="control-button shuffle" onClick={onShuffleToggle} title="Shuffle">
        <FaRandom className={shuffle ? 'active' : ''} />
      </button>
      <button className="control-button" onClick={onSkipPrevious} title="Previous">
        <FaStepBackward />
      </button>
      <button className="control-button play-pause" onClick={onPlayPause} title={isPlaying ? 'Pause' : 'Play'}>
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
      <button className="control-button" onClick={onSkipNext} title="Next">
        <FaStepForward />
      </button>
      <button className="control-button repeat" onClick={onRepeatToggle} title="Repeat">
        <FaRedo className={repeat ? 'active' : ''} />
      </button>
      <div className="volume-control">
        <FaVolumeUp />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
          className="volume-slider"
        />
      </div>
    </div>
  );
};

export default Controls;

