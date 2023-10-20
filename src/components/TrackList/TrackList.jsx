import tracks from "../../constants/constants";
import { useState } from "react";
import "./TrackList.css";
import MoreTracks from "../../pages/MoreTracks/MoreTracks";
import Player from "../../pages/Player/Player";

const TrackList = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [visibleTracks, setVisibleTracks] = useState(3);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleLoadMore = () => {
    setVisibleTracks((prevVisibleTracks) => prevVisibleTracks + 1);
  };

  const handlePlayTrack = (track) => {
    if (currentTrack === track) {
      setIsPlaying(false);
      setCurrentTrack(null); // если текущий трек, тогда останавливаем на паузу
    } else {
      setCurrentTrack(track); // в другом случае включаем на воспроизведение новый трек
      setIsPlaying(true);
      setIsPopupOpen(true);
    }
  };

  const currentTrackIndex = currentTrack ? tracks.findIndex(track => track.id === currentTrack.id) : -1;


  const handleNextTrack = () => {
    console.log(tracks);
    const nextIndex = (currentTrackIndex + 1) % tracks.length; 
    setCurrentTrack(tracks[nextIndex]);
  };
  
  const handlePreviousTrack = () => {
    const prevIndex = currentTrackIndex > 0 ? currentTrackIndex - 1 : tracks.length - 1;
    setCurrentTrack(tracks[prevIndex]);
  };

  return (
    <div className="list">
      <h1 className="list__title">Список треков</h1>
      <ul className="list__container">
        {tracks.slice(0, visibleTracks).map((track) => (
          <li className="track" key={track.id}>
            <img
              className="track__image"
              src={track.cover}
              alt={`Обложка ${track.title}`}
            />
            <div>
              <h3 className="track__title">{track.title}</h3>
              <p className="track__name">{track.artist}</p>
              <p className="track__duration">
                Продолжительность: {track.duration}
              </p>
            </div>
            <button
              className={
                currentTrack === track
                  ? "track__button track__button_type_pause"
                  : "track__button"
              }
              onClick={() => handlePlayTrack(track)}
            >
              Play
            </button>
          </li>
        ))}
      </ul>
      {visibleTracks < tracks.length && (
        <MoreTracks handleLoadMore={handleLoadMore} />
      )}
      {isPopupOpen && (
        <Player
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          isPopupOpen={isPopupOpen}
          track={currentTrack}
          setIsPopupOpen={setIsPopupOpen}
          handleNextTrack={handleNextTrack}
          handlePreviousTrack={handlePreviousTrack}
        />
      )}
    </div>
  );
};

export default TrackList;
