import React from 'react';
import { FaHeart, FaCoins, FaStar, FaLevelUpAlt } from 'react-icons/fa';

const Stats = ({ health, exp, level, money }) => {
  return (
    <div style={styles.statsContainer}>
      <div style={styles.statItem}>
        <FaHeart style={styles.statIcon} />
        <span style={styles.statLabel}>Health:</span>
        <span style={styles.statValue}>{health}%</span>
      </div>
      <div style={styles.statItem}>
        <FaLevelUpAlt style={styles.statIcon} />
        <span style={styles.statLabel}>Level:</span>
        <span style={styles.statValue}>{level}</span>
      </div>
      <div style={styles.statItem}>
        <FaCoins style={styles.statIcon} />
        <span style={styles.statLabel}>Money:</span>
        <span style={styles.statValue}>₱{money.toFixed(2)}</span>
      </div>
      <div style={styles.statItem}>
        <FaStar style={styles.statIcon} />
        <span style={styles.statLabel}>EXP:</span>
        <div style={styles.progressBar}>
          <div style={{ ...styles.progress, width: `${exp}%` }}></div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  statsContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    clipPath: 'polygon(0 0, 100% 0, 98% 100%, 2% 100%)',
    color: '#ecf0f1',
    fontFamily: 'Industry, Arial, sans-serif',
    boxShadow: '-5px 5px 0px #1a2634',
    width: 'auto',
    position: 'absolute',
    left: 0,
    transform: 'perspective(500px) rotateX(2deg)',
    marginLeft: '30px',
  },
  statItem: {
    margin: '0 15px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    background: '#243342',
    padding: '8px',
    // clipPath: 'polygon(95% 0, 100% 25%, 100% 75%, 95% 100%, 5% 100%, 0 75%, 0 25%, 5% 0)',
    // transform: 'skew(-5deg)',
  },
  statIcon: {
    marginRight: '8px',
    color: '#2ecc71',
    transform: 'rotate(-10deg)',
    fontSize: '20px',
  },
  statLabel: {
    fontWeight: '800',
    marginRight: '8px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontSize: '12px',
  },
  statValue: {
    color: '#2ecc71',
    fontWeight: 'bold',
    textShadow: '2px 2px 0px rgba(0,0,0,0.2)',
  },
  progressBar: {
    flex: 1,
    background: '#243342',
    clipPath: 'polygon(2% 0, 98% 0, 100% 50%, 98% 100%, 2% 100%, 0 50%)',
    overflow: 'hidden',
    height: '12px',
    marginLeft: '8px',
  },
  progress: {
    background: 'linear-gradient(90deg, #27ae60 0%, #2ecc71 100%)',
    height: '100%',
    transition: 'width 0.3s',
    clipPath: 'polygon(0 0, 100% 0, 98% 100%, 2% 100%)',
  }
};

export default Stats;
