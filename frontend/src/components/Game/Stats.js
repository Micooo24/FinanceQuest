import React from 'react';
import './Stats.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCoins, faStar, faLevelUpAlt } from '@fortawesome/free-solid-svg-icons';

const Stats = ({ health, exp, level, money }) => {
  return (
    <div className="stats-container">
      <div className="stat-item">
        <FontAwesomeIcon icon={faHeart} className="stat-icon" />
        <span className="stat-label">Health:</span>
        <span className="stat-value">{health}%</span>
      </div>
      <div className="stat-item">
        <FontAwesomeIcon icon={faLevelUpAlt} className="stat-icon" />
        <span className="stat-label">Level:</span>
        <span className="stat-value">{level}</span>
      </div>
      <div className="stat-item">
        <FontAwesomeIcon icon={faCoins} className="stat-icon" />
        <span className="stat-label">Money:</span>
        <span className="stat-value">₱{money.toFixed(2)}</span>
      </div>
      <div className="stat-item">
        <FontAwesomeIcon icon={faStar} className="stat-icon" />
        <span className="stat-label">EXP:</span>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${exp}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default Stats;