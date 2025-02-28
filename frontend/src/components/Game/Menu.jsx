import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Menu.css';

const Menu = ({ menuOpen, toggleMenu }) => {
  const navigate = useNavigate();

  const handleQuit = () => {
    navigate('/start');
  };

  const handleUserProfile = () => {
    navigate('/user-profile');
  };

  return (
    <>
      <div className="burger-menu" onClick={toggleMenu}>
        <div className="burger-bar"></div>
        <div className="burger-bar"></div>
        <div className="burger-bar"></div>
      </div>
      
      <div className={`menu-overlay ${menuOpen ? 'active' : ''}`}>
        <button className="close-button" onClick={toggleMenu}>×</button>
        <div className="menu-content">
          <div className="menu-item">
            <button className="menu-button" onClick={handleUserProfile}>USER PROFILE</button>
          </div>
          <div className="menu-item">
            <button className="menu-button">MINI GAME</button>
          </div>
          <div className="menu-item">
            <button className="menu-button">MUSIC</button>
          </div>
          <div className="menu-item">
            <button className="menu-button" onClick={handleQuit}>QUIT</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;