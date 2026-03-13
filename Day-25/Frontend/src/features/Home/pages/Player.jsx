import React, { useState, useRef, useContext, useEffect } from 'react'
import './Player.scss'
import { useSong } from '../Hooks/useSong'

const Player = () => {
  const { song, loading } = useSong()
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [previousSongUrl, setPreviousSongUrl] = useState(null);

  // Handle song changes and auto-play
  useEffect(() => {
    if (audioRef.current && song.url) {
      setIsAudioLoading(true);
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
      
      // Small delay to prevent race conditions
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.load();
        }
      }, 100);
    }
  }, [song.url]);

  // Track song changes for auto-play logic
  useEffect(() => {
    if (song.url && song.url !== previousSongUrl) {
      setPreviousSongUrl(song.url);
    }
  }, [song.url, previousSongUrl]);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current && !isAudioLoading) {
      audioRef.current.volume = volume;
    }
  }, [volume, isAudioLoading]);

  const togglePlay = async () => {
    if (!audioRef.current || loading || isAudioLoading) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (err) {
      // Handle specific error types
      if (err.name === 'AbortError') {
        // This is expected when audio is interrupted (e.g., song change)
        console.log('Play was interrupted (likely due to song change)');
        setIsPlaying(false);
      } else if (err.name === 'NotAllowedError') {
        console.error('Playback not allowed - user interaction required');
        setIsPlaying(false);
      } else {
        console.error('Error playing audio:', err);
        setIsPlaying(false);
      }
    }
  };

  const skip = (seconds) => {
    if (audioRef.current && !isAudioLoading) {
      const newTime = Math.max(0, Math.min(duration, audioRef.current.currentTime + seconds));
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const changeSpeed = (newSpeed) => {
    if (audioRef.current && !isAudioLoading) {
      audioRef.current.playbackRate = newSpeed;
      setSpeed(newSpeed);
    }
  };

  const changeVolume = (newVolume) => {
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(1);
      setIsMuted(false);
    } else {
      setVolume(0);
      setIsMuted(true);
    }
  };

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return '🔇';
    if (volume < 0.3) return '🔈';
    if (volume < 0.7) return '🔉';
    return '🔊';
  };

  // Audio event handlers
  const handleTimeUpdate = () => {
    if (audioRef.current && !isAudioLoading) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setIsAudioLoading(false);
    }
  };

 const handleCanPlay = () => {
  setIsAudioLoading(false);

  if (audioRef.current) {
    audioRef.current.play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(err => {
        console.error("Autoplay error:", err);
      });
  }
};
  const handleLoadStart = () => {
    setIsAudioLoading(true);
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleAudioError = (e) => {
    console.error('Audio error:', e);
    setIsPlaying(false);
    setIsAudioLoading(false);
  };

  const handleProgressChange = (e) => {
    if (!isAudioLoading) {
      const newTime = parseFloat(e.target.value);
      if (audioRef.current) {
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
      }
    }
  };

  // Format time helper
  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="player">
      <div className="poster">
        {loading ? (
          <div className="loading-placeholder">
            <div className="spinner"></div>
          </div>
        ) : (
          <img src={song?.[0]?.posterUrl} alt={song?.[0]?.title} />
        )}
        <h2>{loading ? 'Loading...' : song.title}</h2>
      </div>
      <audio
  ref={audioRef}
  src={song?.[0]?.url}
  onTimeUpdate={handleTimeUpdate}
  onLoadedMetadata={handleLoadedMetadata}
  onCanPlay={handleCanPlay}
  onLoadStart={handleLoadStart}
  onEnded={handleAudioEnd}
  onError={handleAudioError}
  preload="metadata"
/>
      <div className="audio-tracker">
        <span className="time-display">{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleProgressChange}
          className="progress-bar"
          disabled={loading || isAudioLoading || duration === 0}
        />
        <span className="time-display">{formatTime(duration)}</span>
      </div>
      <div className="controls">
        <button onClick={() => skip(-5)} title="Backward 5s" disabled={loading || isAudioLoading}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/>
          </svg>
        </button>
        <button onClick={togglePlay} className="play-button" disabled={loading || isAudioLoading}>
          {loading || isAudioLoading ? (
            <div className="loading-spinner"></div>
          ) : isPlaying ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>
        <button onClick={() => skip(5)} title="Forward 5s" disabled={loading || isAudioLoading}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/>
          </svg>
        </button>
        <div className="volume-control">
          <button onClick={toggleMute} className="volume-button" disabled={loading || isAudioLoading}>
            {getVolumeIcon()}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => changeVolume(parseFloat(e.target.value))}
            className="volume-slider"
            disabled={loading || isAudioLoading}
          />
        </div>
        <select
          value={speed}
          onChange={(e) => changeSpeed(parseFloat(e.target.value))}
          className="speed-select"
          disabled={loading || isAudioLoading}
        >
          <option value={0.5}>0.5x</option>
          <option value={1}>1x</option>
          <option value={1.5}>1.5x</option>
          <option value={2}>2x</option>
        </select>
      </div>
    </div>
  )
}

export default Player