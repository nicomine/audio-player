import { useState, useRef, useEffect } from "react";
import Gabe from "../../assets/Gaben.png";

import "./styles/song-styles.css";

import { SONGS } from "../../constants/SONGS";

export const Song = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSong, setCurrentSong] = useState(SONGS[0]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const searchSong = useRef(0);
  const audioRef = useRef(currentSong);

  const handleChangeNextSong = () => {
    console.log(searchSong.current);
    if (searchSong.current === SONGS.length - 1) {
      searchSong.current = 0;
      return setCurrentSong(SONGS[0]);
    }

    searchSong.current = searchSong.current + 1;
    setCurrentSong(SONGS[searchSong.current]);
  };

  const handleUpdateTime = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleChangePrevSong = () => {
    console.log(searchSong.current);
    if (searchSong.current === 0) {
      searchSong.current = 1;
      return setCurrentSong(SONGS[SONGS.length - 1]);
    }

    searchSong.current = searchSong.current - 1;
    setCurrentSong(SONGS[searchSong.current]);
  };

  const handleSeek = (e) => {
    audioRef.current.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  };

  const handlePlay = () => {
    audioRef.current.play();
    return setIsPlaying(true);
  };

  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handleActionAudio = () => {
    if (isPlaying === true) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";

    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const paddedSecs = secs < 10 ? `0${secs}` : secs;

    return `${minutes}:${paddedSecs}`;
  };

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        handleUpdateTime();
      }, 1000);
    } else {
      clearInterval(interval);
    }
  }, [isPlaying, currentTime]);

  useEffect(() => {
    setDuration(currentSong.duration);
  }, [currentSong]);

  return (
    <div className="audio-container">
      <img src={Gabe} className="song-image" />
      <audio ref={audioRef} src={currentSong.src} autoPlay={true}></audio>
      <p className="song-name">{currentSong.name}</p>
      <p className="artist-name">{currentSong.autor}</p>
      <input
        type="range"
        min={0}
        max={duration}
        value={currentTime}
        onChange={handleSeek}
        className="progress-bar"
      />
      <div className="timer">
        <p>{formatTime(currentTime)}</p>
        <p>{formatTime(duration)}</p>
      </div>

      <div className="button-container">
        <button
          className="material-symbols-outlined"
          onClick={handleChangePrevSong}
        >
          skip_previous
        </button>
        <button
          className="material-symbols-outlined"
          onClick={handleActionAudio}
        >
          {isPlaying ? 'play_arrow' : 'pause'}
        </button>
        <button
          className="material-symbols-outlined"
          onClick={handleChangeNextSong}
        >
          skip_next
        </button>
      </div>
    </div>
  );
};
