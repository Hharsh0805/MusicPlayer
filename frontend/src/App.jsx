import React, { useState, useEffect } from 'react';
import AudioPlayer from './components/AudioPlayer';
import Playlist from './components/Playlist';
import TrackInfo from './components/TrackInfo';
import Controls from './components/Controls';
import ProgressBar from './components/ProgressBar';
import Search from './components/Search';
import Logo from './components/Logo';
import { tracks } from './data/tracks';
import './App.css';

const App = () => {
  const [currentTrack, setCurrentTrack] = useState(tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTracks, setFilteredTracks] = useState(tracks);

  useEffect(() => {
    // Load dark mode preference from localStorage
    const storedTheme = localStorage.getItem("darkMode") === "true";
    setDarkMode(storedTheme);
  }, []);

  useEffect(() => {
    // Apply dark mode to the body element
    document.body.classList.toggle('dark-mode', darkMode);
    // Persist dark mode preference in localStorage
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    // Filter tracks based on search term
    const filtered = tracks.filter(track => 
      track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTracks(filtered);
  }, [searchTerm]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSkip = (direction) => {
    const currentIndex = tracks.findIndex(track => track.id === currentTrack.id);
    let nextIndex;

    if (shuffle) {
      nextIndex = Math.floor(Math.random() * tracks.length);
    } else {
      nextIndex = (currentIndex + direction + tracks.length) % tracks.length;
    }

    setCurrentTrack(tracks[nextIndex]);
    setIsPlaying(true);
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
  };

  const handleProgressChange = (newProgress) => {
    setProgress(newProgress);
  };

  const handleTimeUpdate = (currentTime) => {
    setProgress(currentTime);
  };

  const handleTrackSelect = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const toggleShuffle = () => {
    setShuffle(!shuffle);
  };

  const toggleRepeat = () => {
    setRepeat(!repeat);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="app">
      <Logo />
      <button className="theme-toggle" onClick={toggleDarkMode}>
        {darkMode ? '☀️' : '🌙'}
      </button>
      <div className="music-player">
        <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <TrackInfo track={currentTrack} />
        {/* Only render AudioPlayer if the track and URL are valid */}
        {currentTrack?.url ? (
          <AudioPlayer
            track={currentTrack}
            isPlaying={isPlaying}
            volume={volume}
            onEnded={() => handleSkip(1)}
            onDurationChange={setDuration}
            onProgressChange={handleProgressChange}
            onTimeUpdate={handleTimeUpdate}
            repeat={repeat}
          />
        ) : (
          <div>No track loaded</div>
        )}
        <ProgressBar
          progress={progress}
          duration={duration}
          onProgressChange={handleProgressChange}
        />
        <Controls
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onSkipPrevious={() => handleSkip(-1)}
          onSkipNext={() => handleSkip(1)}
          volume={volume}
          onVolumeChange={handleVolumeChange}
          shuffle={shuffle}
          onShuffleToggle={toggleShuffle}
          repeat={repeat}
          onRepeatToggle={toggleRepeat}
        />
        <Playlist
          tracks={filteredTracks}
          currentTrack={currentTrack}
          onTrackSelect={handleTrackSelect}
        />
      </div>
    </div>
  );
};

export default App;
