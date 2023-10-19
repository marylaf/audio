import hello from "../vendor/images/hello.jpg";
import second_pic from "../vendor/images/2.jpg";
import third_pic from "../vendor/images/3.jpg";
import forth_pic from "../vendor/images/4.jpg";
import fifth_pic from "../vendor/images/5.jpg";
import sixth_pic from "../vendor/images/6.jpg";

import first_audio from "../vendor/audio/1.mp3";
import second_audio from "../vendor/audio/2.mp3";
import third_audio from "../vendor/audio/3.mp3";
import forth_audio from "../vendor/audio/4.mp3";
import fifth_audio from "../vendor/audio/5.mp3";
import sixth_audio from "..//vendor/audio/6.mp3";

const tracks = [
    {
      id: 1,
      title: 'Hello',
      artist: 'Adele',
      duration: '4:55',
      cover: hello,
      audio: first_audio,
    },
    {
      id: 2,
      title: 'Someone Like You',
      artist: 'Adele',
      duration: '4:45',
      cover: second_pic,
      audio: second_audio,
    },
    {
      id: 3,
      title: 'Rolling in the Deep',
      artist: 'Adele',
      duration: '3:48',
      cover:  third_pic,
      audio: third_audio,
    },
    {
      id: 4,
      title: 'Set Fire to the Rain',
      artist: 'Adele',
      duration: '4:01',
      cover: forth_pic,
      audio: forth_audio,
    },
    {
      id: 5,
      title: 'Skyfall',
      artist: 'Adele',
      duration: '4:46',
      cover: fifth_pic,
      audio: fifth_audio,
    },
    {
      id: 6,
      title: 'When We Were Young',
      artist: 'Adele',
      duration: '4:51',
      cover: sixth_pic,
      audio: sixth_audio,
    },
  ];
  
  export default tracks;
  