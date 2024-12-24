import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './Nav.scss';
import Library from '../Library/Library';

const Nav = ({ libraryStatus, setLibraryStatus }) => {
    const navigate = useNavigate();  // Initialize navigate

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem("user");  // Clear user data from localStorage
        navigate("/login");  // Redirect to login page
    };

    return (
        <nav>
            <h1>AlgoRythm</h1>
            <button onClick={() => setLibraryStatus(!libraryStatus)}>
                Library &nbsp;
                <FontAwesomeIcon icon={faMusic} />
            </button>
            <Library />
            {/* Logout Button */}
            <button onClick={handleLogout} className="logout-button">
                Logout
            </button>
        </nav>
    );
}

Nav.propTypes = {
    libraryStatus: PropTypes.bool,
    setLibraryStatus: PropTypes.func
};

export default Nav;
