import { useState, useRef } from "react";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IconContext } from "react-icons";
import ReactPlayer from 'react-player';
import "./Player.css";
import PropTypes from "prop-types";

const Player = ({ track, isPopupOpen, setIsPopupOpen, handleNextTrack, handlePreviousTrack, isPlaying, setIsPlaying, setCurrentTrack }) => {
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setCurrentTrack(null);
  };

  const handleProgress = progress => {
    setPlayedSeconds(progress.playedSeconds);
  };

  const handleDuration = (dur) => {
    setDuration(dur);
  };

  const handleSeekChange = e => {
    const value = parseFloat(e.target.value);
    setPlayedSeconds(value);
    playerRef.current.seekTo(value);
  };

  const playingButton = () => {
    setIsPlaying(!isPlaying);
  };

  const formattedTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return {
      min: min < 10 ? `0${min}` : min,
      sec: sec < 10 ? `0${sec}` : sec,
    };
  };

  const currTime = formattedTime(playedSeconds);

  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  const playerRef = useRef(null);

  return (
      <div className={`popup ${isPopupOpen ? "popup_opened" : ""}`} onClick={handleClosePopup}>
        <div className="music" onClick={stopPropagation}>
        <button
          className="music__button-drop"
          aria-label="Закрытие попапа"
          type="button"
          onClick={handleClosePopup}
        ></button>
        <h2 className="music__title">Playing Now</h2>
        <img className="music__cover" alt={`Обложка ${track.title}`} src={track.cover} />
        <div>
          <h3 className="music__name">{track.title}</h3>
          <p className="music__subtitle">{track.artist}</p>
        </div>
        <div>
          <button className="button" onClick={handlePreviousTrack}>
            <IconContext.Provider value={{ size: "3em", color: "#5151b5" }}>
              <BiSkipPrevious />
            </IconContext.Provider>
          </button>
          {!isPlaying ? (
            <button className="button" onClick={playingButton}>
              <IconContext.Provider value={{ size: "3em", color: "#5151b5" }}>
                <AiFillPlayCircle />
              </IconContext.Provider>
            </button>
          ) : (
            <button className="button" onClick={playingButton}>
              <IconContext.Provider value={{ size: "3em", color: "#5151b5" }}>
                <AiFillPauseCircle />
              </IconContext.Provider>
            </button>
          )}
          <button className="button"  onClick={handleNextTrack}>
            <IconContext.Provider value={{ size: "3em", color: "#5151b5" }}>
              <BiSkipNext />
            </IconContext.Provider>
          </button>
        </div>
        <ReactPlayer
          ref={playerRef}
          url={track.audio}
          playing={isPlaying}
          onDuration={handleDuration}
          onProgress={handleProgress}
          width="0"
          height="0"
        />
        <div className="time">
          <p>
            {currTime.min}:{currTime.sec}
          </p>
        </div>
        <input
          type="range"
          min="0"
          max={duration}
          value={playedSeconds}
          className="timeline"
          onChange={handleSeekChange}
        />
        </div>
      </div>
  );
};

Player.propTypes = {
  track: PropTypes.shape({
    cover: PropTypes.string.isRequired,
    audio: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
  }).isRequired,
  isPopupOpen: PropTypes.bool.isRequired,
  setIsPopupOpen: PropTypes.func.isRequired, 
  handleNextTrack: PropTypes.func.isRequired, 
  handlePreviousTrack: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  setIsPlaying: PropTypes.func.isRequired,
  setCurrentTrack: PropTypes.func.isRequired,
};

export default Player;
