import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.scss";
import Login from "./components/Login.jsx"; // Import Login component
import Register from "./components/Signup.jsx"; // Import Register component
import Player from "./components/Player.jsx";

const App = () => {
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
                  <Player />
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
