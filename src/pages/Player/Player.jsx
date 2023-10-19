import { useState } from "react";
import useSound from "use-sound";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IconContext } from "react-icons";
import "./Player.css";
import PropTypes from "prop-types";

const Player = ({ track, isPopupOpen, handleClosePopup }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, { pause }] = useSound(track.audio);

  const playingButton = () => {
    if (isPlaying) {
      pause(); // приостанавливаем воспроизведение звука
      setIsPlaying(false);
    } else {
      play(); // воспроизводим аудиозапись
      setIsPlaying(true);
    }
  };

  return (
      <div className={`popup ${isPopupOpen ? "popup_opened" : ""}`}>
        <div className="music">
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
