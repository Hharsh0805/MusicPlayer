import React from 'react';

const Playlist = ({ tracks, currentTrack, onTrackSelect }) => {
  return (
    <div className="playlist">
      <h2>Playlist</h2>
      <ul>
        {tracks.map((track) => (
          <li
            key={track.id}
            className={track.id === currentTrack.id ? 'active' : ''}
            onClick={() => onTrackSelect(track)}
          >
            <img src={track.artwork} alt={track.title} className="track-artwork" />
            <div className="track-info">
              <span className="track-title">{track.title}</span>
              <span className="track-artist">{track.artist}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;

