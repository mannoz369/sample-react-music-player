import Player from "./components/Player/Player.jsx";
import Nav from "./components/Nav/Nav.jsx";
import "./App.scss";
import { song_dll, songsdata } from "./components/Player/AudioData.js";
import { useRef, useState, useEffect } from "react";
import Library from "./components/Library/Library.jsx";
import Login from "./components/Login.jsx"; // Import Login component
import Register from "./components/Signup.jsx"; // Import Register component

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
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated() ? (
                <>
                  <Nav
                    libraryStatus={libraryStatus}
                    setLibraryStatus={setLibraryStatus}
                  />
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
              ) : (
                <Navigate to="/login" /> // Redirect to login if not authenticated
              )
            }
          />
          <Route path="/login" element={<Login />} /> {/* Login Page Route */}
          <Route path="/register" element={<Register />} />{" "}
          {/* Register Page Route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
