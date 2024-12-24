import Player from "./Player/Player.jsx";
import Nav from "./Nav/Nav.jsx";
import "./Player.scss";
import { song_dll, songsdata } from "./Player/AudioData.js";
import { useRef, useState, useEffect } from "react";
import Library from "./Library/Library.jsx";

const App = () => {
  const [songs_dll, setSongs_dll] = useState(song_dll);
  const [songs, setSongs] = useState(songsdata);
  const [currentSong_dll, setCurrentSong_dll] = useState(
    window.current_song_ptr
  );
  const [currentSong, setCurrentSong] = useState(songsdata[0]);
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [isplaying, setisplaying] = useState(false);

  const audioElem = useRef();

  useEffect(() => {
    if (isplaying) {
      audioElem.current.play();
    } else {
      audioElem.current.pause();
    }
  }, [isplaying, currentSong, currentSong_dll]);

  const onPlaying = () => {
    const duration = audioElem.current.duration;
    const ct = audioElem.current.currentTime;

    setCurrentSong_dll({
      ...currentSong_dll,
      progress: (ct / duration) * 100,
      length: duration,
    });
  };

  // Check if user is authenticated (by checking localStorage)
  const isAuthenticated = () => {
    console.log(localStorage.getItem("user"));
    return localStorage.getItem("user") !== null;
  };

  return (
    <>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Library
        songs={songs}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        currentSong_dll={currentSong_dll}
        setCurrentSong_dll={setCurrentSong_dll}
      />
      <audio
        src={currentSong_dll.data.url}
        ref={audioElem}
        onTimeUpdate={onPlaying}
      />
      <Player
        songs={songs_dll}
        setSongs={setSongs_dll}
        isPlaying={isplaying}
        setIsPlaying={setisplaying}
        audioElem={audioElem}
        currentSong={currentSong_dll}
        setCurrentSong={setCurrentSong_dll}
      />
    </>
  );
};

export default App;
