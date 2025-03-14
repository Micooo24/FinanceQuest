import React from 'react';
import { FaHeart, FaCoins, FaStar, FaLevelUpAlt } from 'react-icons/fa';

const Stats = ({  pts, money }) => {
  return (
    <div style={styles.statsContainer}>
      <div style={styles.statItem}>
        <FaCoins style={styles.statIcon} />
        <span style={styles.statLabel}>Money:</span>
        <span style={styles.statValue}>₱{money.toFixed(2)}</span>
      </div>
      <div style={styles.statItem}>
        <FaStar style={styles.statIcon} />
        <span style={styles.statLabel}>Points:</span>
        <span style={styles.statValue}>{pts}</span>
      </div>
    </div>
  );
};

const styles = {
  statsContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '25px',
    clipPath: 'polygon(0 0, 100% 0, 98% 100%, 2% 100%)',
    color: '#ecf0f1',
    fontFamily: 'Lora',
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
    fontSize: '10px',
    background: '#351742',
    padding: '8px',
  },
  statIcon: {
    marginRight: '8px',
    color: '#DAD2FF',
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
    color: '#DAD2FF',
    fontWeight: 'bold',
    textShadow: '2px 2px 0px rgba(0,0,0,0.2)',
  },
};

export default Stats;