import tracks from '../../constants/constants';
import { useState } from 'react'
import './TrackList.css';
import MoreTracks from '../MoreTracks/MoreTracks';

const TrackList = () => {

    const [currentTrack, setCurrentTrack] = useState(null);
    const [visibleTracks, setVisibleTracks] = useState(3);

    const handleLoadMore = () => {
      setVisibleTracks((prevVisibleTracks) => prevVisibleTracks + 1);
    }

    const handlePlayTrack = (track) => {
      if (currentTrack === track) { 
        setCurrentTrack(null); // если текущий трек, тогда останавливаем на паузу
      } else {
        setCurrentTrack(track); // в другом случае включаем на воспроизведение новый трек
      }
    };

    return (
        <div className='list'>
          <h1 className='list__title'>Список треков</h1>
          <ul className='list__container'>
            {tracks.slice(0, visibleTracks).map((track) => (
              <li className='track' key={track.id}>
                  <img className='track__image' src={track.cover} alt={`Обложка ${track.title}`} />
                <div>
                  <h3 className='track__title'>{track.title}</h3>
                  <p className='track__name'>{track.artist}</p>
                  <p className='track__duration'>Продолжительность: {track.duration}</p>
                </div>
                <button className={currentTrack === track ? 'track__button track__button_type_pause' : 'track__button'} onClick={() => handlePlayTrack(track)}>
                    {currentTrack === track ? 'Пауза' : 'Play'}
                  </button>
              </li>
            ))}
          </ul>
          {visibleTracks < tracks.length && (
        <MoreTracks handleLoadMore={handleLoadMore} />
      )}
        </div>
      );
}

export default TrackList;