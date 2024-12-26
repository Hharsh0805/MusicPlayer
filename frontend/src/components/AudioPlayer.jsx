import React, { useRef, useEffect } from 'react';

const AudioPlayer = ({ 
  track, 
  isPlaying, 
  volume, 
  onEnded, 
  onDurationChange, 
  onProgressChange, 
  repeat, 
  onTimeUpdate 
}) => {
  const playerRef = useRef(null);
  const youtubePlayerRef = useRef(null);
  const progressInterval = useRef(null);

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      initializeYouTubePlayer();
    };

    return () => {
      cleanupPlayer();
    };
  }, []);

  const initializeYouTubePlayer = () => {
    youtubePlayerRef.current = new window.YT.Player(playerRef.current, {
      height: '0',
      width: '0',
      videoId: getYoutubeId(track.url),
      playerVars: {
        autoplay: isPlaying ? 1 : 0,
        controls: 0,
      },
      events: {
        onStateChange: handlePlayerStateChange,
        onReady: handlePlayerReady,
      },
    });
  };

  const cleanupPlayer = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
    if (youtubePlayerRef.current) {
      youtubePlayerRef.current.destroy();
    }
  };

  useEffect(() => {
    if (youtubePlayerRef.current) {
      if (isPlaying) {
        youtubePlayerRef.current.playVideo();
        startProgressTracking();
      } else {
        youtubePlayerRef.current.pauseVideo();
        stopProgressTracking();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (youtubePlayerRef.current) {
      youtubePlayerRef.current.setVolume(volume * 100);
    }
  }, [volume]);

  useEffect(() => {
    if (youtubePlayerRef.current) {
      const videoId = getYoutubeId(track.url);
      youtubePlayerRef.current.loadVideoById(videoId);

      // Update duration when track changes
      if (youtubePlayerRef.current && youtubePlayerRef.current.getDuration) {
        const duration = youtubePlayerRef.current.getDuration();
        if (duration) {
          onDurationChange(duration);
        }
      }
    }
  }, [track]);

  const startProgressTracking = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
    progressInterval.current = setInterval(() => {
      if (youtubePlayerRef.current && youtubePlayerRef.current.getCurrentTime) {
        const currentTime = youtubePlayerRef.current.getCurrentTime();
        onTimeUpdate(currentTime);
      }
    }, 100);
  };

  const stopProgressTracking = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
  };

  const handlePlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.ENDED) {
      stopProgressTracking();
      if (repeat) {
        youtubePlayerRef.current.seekTo(0);
        youtubePlayerRef.current.playVideo();
        startProgressTracking();
      } else {
        onEnded();
      }
    } else if (event.data === window.YT.PlayerState.PLAYING) {
      const duration = youtubePlayerRef.current.getDuration();
      onDurationChange(duration);
    }
  };

  const handlePlayerReady = (event) => {
    const duration = event.target.getDuration();
    onDurationChange(duration);
    if (isPlaying) {
      event.target.playVideo();
      startProgressTracking();
    }
  };

  const getYoutubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  return (
    <div>
      <div ref={playerRef}></div>
    </div>
  );
};

export default AudioPlayer;
