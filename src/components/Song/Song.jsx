import { useState, useRef, useEffect } from "react";
import Gabe from "../../assets/Gaben.png";

import "./styles/song-styles.css";

import { SONGS } from "../../constants/SONGS";

export const Song = () => {
  const time = useRef(0);

  const [play, setPlay] = useState(false);

  const selectSong = useRef(0);
  const [songData, setSongData] = useState(SONGS[0]);
  const currentSong = useRef();

  const handlePlayAudio = () => {
    console.log(currentSong.current);
    if (currentSong.current.paused) {
      currentSong.current.play();
      setPlay(true);
    } else {
      currentSong.current.pause();
      setPlay(false);
    }
  };

  const handleChangeSongForward = () => {
    selectSong.current++;

    setSongData(SONGS.find((song) => song.id === selectSong.current));
  };

  const handleChangeSongBackward = () => {
    if (selectSong.current === 0) {
      return;
    }
    selectSong.current--;
    setSongData(SONGS.find((song) => song.id === selectSong.current));
  };

  useEffect(() => {
    const selectedSong = SONGS.filter((song) => song.id === selectSong.current);

    console.log("puto", selectedSong);
  }, [selectSong]);

  // const [time, setTime] = useState(0);

  // useEffect(() => {
  //   if (time >= 100) return;

  //   const interval = setInterval(() => {
  //     setTime((prevTime) => prevTime + 1);
  //   }, 1000);
  //   console.log(time);
  //   return () => clearInterval(interval);
  // }, [time]);

  return (
    <div className="audio-container">
      <img src={Gabe} className="song-image" />
      <audio src={songData.src} ref={currentSong}></audio>
      <p className="song-name">Current song is bullshit aaaaaaaaaaaaaaaaaaaa</p>
      <progress className="progress-bar" max="100" min="0" value={time} />
      <div className="button-container">
        <button
          className="material-symbols-outlined"
          onClick={handleChangeSongBackward}
        >
          skip_previous
        </button>
        <button className="material-symbols-outlined" onClick={handlePlayAudio}>
          {play ? "play_arrow" : "stop"}
        </button>
        <button
          className="material-symbols-outlined"
          onClick={handleChangeSongForward}
        >
          skip_next
        </button>
        <button onClick={() => console.log(songData)}>puto</button>
      </div>
    </div>
  );
};
