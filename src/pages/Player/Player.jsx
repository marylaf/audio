import { useState, useEffect } from "react";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IconContext } from "react-icons";
import useSound from 'use-sound'; 
import "./Player.css";
import PropTypes from "prop-types";

const Player = ({ track, isPopupOpen, handleClosePopup }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const [play, { sound, pause, duration, }] = useSound(track.audio, track.duration);

  console.log(useSound);

  const [currTime, setCurrTime] = useState({
    min: "00",
    sec: "00",
  }); // текущее положение звука в минутах и секундах

  const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
        if (sound) {
            setSeconds(sound.seek([])); // устанавливаем состояние с текущим значением в секундах
            const min = Math.floor(sound.seek([]) / 60);
            const sec = Math.floor(sound.seek([]) % 60);
            setCurrTime({
                min: min < 10 ? `0${min}` : min,
                sec: sec < 10 ? `0${sec}` : sec,
            });
        }
        }, 1000);
        return () => clearInterval(interval);
    }, [sound]);

  const playingButton = () => {
    if (isPlaying) {
      pause(); // приостанавливаем воспроизведение звука
      setIsPlaying(false);
    } else {
      play(); // воспроизводим аудиозапись
      setIsPlaying(true);
    }
  };

  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  return (
      <div className={`popup ${isPopupOpen ? "popup_opened" : ""}`}  onClick={handleClosePopup}>
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
          <button className="button">
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
          <button className="button">
            <IconContext.Provider value={{ size: "3em", color: "#5151b5" }}>
              <BiSkipNext />
            </IconContext.Provider>
          </button>
        </div>

        <div>
        <div className="time">
          <p>
            {currTime.min}:{currTime.sec}
          </p>
        </div>
        <input
          type="range"
          min="0"
          max={duration / 1000}
          default="0"
          value={seconds}
          className="timeline"
          onChange={(e) => {
            sound.seek([e.target.value]);
          }}
        />
      </div>
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
    duration: PropTypes.string.isRequired,
  }).isRequired,
  isPopupOpen: PropTypes.bool.isRequired,
  handleClosePopup: PropTypes.func.isRequired,
};

export default Player;
