import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Menu.css';

const Menu = ({ menuOpen, toggleMenu }) => {
  const navigate = useNavigate();
  
  // Pastel Purple Dream Color Scheme
  const colors = {
    primary: '#B399D4',    // soft lavender purple
    light: '#D9C6E9',      // very light lavender
    secondary: '#9F84BD',  // medium-light purple
    accent: '#E8D3F0',     // pale lilac
    dark: '#7A6992',       // deeper purple for contrast
    text: '#4A3B63',       // dark purple for text
    white: '#FFFFFF'       // for contrast elements
  };

  const handleQuit = () => {
    navigate('/start');
  };

  const handleUserProfile = () => {
    navigate('/user-profile');
  };
  
  const handleShop = () => {
    navigate('/shop');
  };

  // Custom styles to override CSS
  const styles = {
    burgerMenu: {
      width: '50px',
      height: '50px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: `rgba(255, 255, 255, 0.15)`,
      backdropFilter: 'blur(8px)',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: `0 4px 15px rgba(179, 153, 212, 0.3)`,
      border: 'none',
      position: 'relative',
      zIndex: 1000
    },
    burgerBar: {
      width: '26px',
      height: '2px',
      margin: '3px 0',
      borderRadius: '2px',
      background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
      transition: 'all 0.3s ease',
      transformOrigin: 'center'
    },
    menuOverlay: {
      background: `linear-gradient(135deg, ${colors.light}E6, ${colors.accent}E6)`,
      backdropFilter: 'blur(15px)',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)'
    },
    closeButton: {
      background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
      color: colors.white,
      border: 'none',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '24px',
      boxShadow: `0 4px 15px rgba(122, 105, 146, 0.5)`,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      position: 'absolute',
      top: '20px',
      right: '20px',
    },
    menuContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      padding: '20px'
    },
    menuButton: {
      background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
      color: colors.white,
      border: 'none',
      padding: '14px 28px',
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: `0 4px 15px rgba(122, 105, 146, 0.4)`,
      letterSpacing: '1px',
      textTransform: 'uppercase'
    }
  };

  const hoverStyles = {
    menuButton: {
      transform: 'translateY(-3px)',
      boxShadow: `0 8px 20px rgba(122, 105, 146, 0.6)`
    }
  };

  return (
    <>
      <div 
        className="burger-menu" 
        onClick={toggleMenu} 
        style={styles.burgerMenu}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = `0 6px 20px rgba(179, 153, 212, 0.5)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = `0 4px 15px rgba(179, 153, 212, 0.3)`;
        }}
      >
        <div className="burger-bar" style={styles.burgerBar}></div>
        <div className="burger-bar" style={{...styles.burgerBar, width: '20px', marginLeft: '-3px'}}></div>
        <div className="burger-bar" style={styles.burgerBar}></div>
      </div>
      
      <div className={`menu-overlay ${menuOpen ? 'active' : ''}`} style={menuOpen ? styles.menuOverlay : {}}>
        <button 
          className="close-button" 
          onClick={toggleMenu} 
          style={styles.closeButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = `0 6px 20px rgba(122, 105, 146, 0.7)`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = `0 4px 15px rgba(122, 105, 146, 0.5)`;
          }}
        >×</button>
        <div className="menu-content" style={styles.menuContent}>
          <div className="menu-item">
            <button 
              className="menu-button" 
              onClick={handleUserProfile} 
              style={styles.menuButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = `0 8px 20px rgba(122, 105, 146, 0.6)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 4px 15px rgba(122, 105, 146, 0.4)`;
              }}
            >USER PROFILE</button>
          </div>
          <div className="menu-item">
            <button 
              className="menu-button" 
              onClick={handleShop} 
              style={styles.menuButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = `0 8px 20px rgba(122, 105, 146, 0.6)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 4px 15px rgba(122, 105, 146, 0.4)`;
              }}
            >SHOP</button>
          </div>
          <div className="menu-item">
            <button 
              className="menu-button" 
              style={styles.menuButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = `0 8px 20px rgba(122, 105, 146, 0.6)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 4px 15px rgba(122, 105, 146, 0.4)`;
              }}
            >MUSIC</button>
          </div>
          <div className="menu-item">
            <button 
              className="menu-button" 
              onClick={handleQuit} 
              style={styles.menuButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = `0 8px 20px rgba(122, 105, 146, 0.6)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 4px 15px rgba(122, 105, 146, 0.4)`;
              }}
            >QUIT</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;