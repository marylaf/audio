import tracks from '../constants/constants';
import { useState } from 'react'

const TrackList = () => {

    const [currentTrack, setCurrentTrack] = useState(null);

    const handlePlayTrack = (track) => {
      if (currentTrack === track) { 
        setCurrentTrack(null); // если текущий трек, тогда останавливаем на паузу
      } else {
        setCurrentTrack(track); // в другом случае включаем на воспроизведение новый трек
      }
    };

    return (
        <div>
          <h1>Список треков</h1>
          <ul>
            {tracks.map((track) => (
              <li key={track.id}>
                <div>
                  <img src={track.cover} alt={`Обложка ${track.title}`} />
                </div>
                <div>
                  <h3>{track.title}</h3>
                  <p>{track.artist}</p>
                  <p>Продолжительность: {track.duration}</p>
                </div>
                <div>
                  <audio controls={currentTrack === track}>
                    <source src={track.audio} type="audio/mpeg" />
                  </audio>
                  <button onClick={() => handlePlayTrack(track)}>
                    {currentTrack === track ? 'Пауза' : 'Плей'}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
}

export default TrackList;