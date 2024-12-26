import React from 'react';

const TrackInfo = ({ track }) => {
  return (
    <div className="track-info">
      <img src={track.artwork} alt={track.title} className="album-art" />
      <div className="track-details">
        <h2 className="track-title">{track.title}</h2>
        <p className="track-artist">{track.artist}</p>
      </div>
    </div>
  );
};

export default TrackInfo;

