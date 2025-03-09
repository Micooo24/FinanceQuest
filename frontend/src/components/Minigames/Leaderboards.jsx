import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Leaderboards.css';
import { IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import axios from 'axios';

<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Fredoka+One&display=swap" rel="stylesheet"></link>

const Leaderboards = () => {
  const [activeTab, setActiveTab] = useState('savings');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  const [leaderboards, setLeaderboards] = useState({
    savings: [],
    investing: [],
    budgeting: [],
  });

  useEffect(() => {
    const fetchSavingsLeaderboards = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/leaderboards/get-savings');
        setLeaderboards((prev) => ({
          ...prev,
          savings: response.data.map((player, index) => ({
            username: player.username,
            score: player.balance,
            rank: index + 1,
          })),
        }));
      } catch (error) {
        console.error('Error fetching savings leaderboards:', error);
        console.error('Error details:', error.response ? error.response.data : 'No response data');
      } finally {
        setLoading(false);
      }
    };

    const fetchBudgetingLeaderboards = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/leaderboards/get-budgets');
        setLeaderboards((prev) => ({
          ...prev,
          budgeting: response.data.map((player, index) => ({
            username: player.username,
            score: player.money,
            rank: index + 1,
          })),
        }));
      } catch (error) {
        console.error('Error fetching budgeting leaderboards:', error);
        console.error('Error details:', error.response ? error.response.data : 'No response data');
      } finally {
        setLoading(false);
      }
    };
    
    const fetchInvestingLeaderboards = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/leaderboards/get-investments');
        setLeaderboards((prev) => ({
          ...prev,
          investing: response.data.map((player, index) => ({
            username: player.username,
            score: player.score,
            rank: index + 1,
          })),
        }));
      } catch (error) {
        console.error('Error fetching budgeting leaderboards:', error);
        console.error('Error details:', error.response ? error.response.data : 'No response data');
      } finally {
        setLoading(false);
      }
    };

    fetchSavingsLeaderboards();
    fetchBudgetingLeaderboards();
    fetchInvestingLeaderboards();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  const getBadge = (rank) => {
    switch (rank) {
      case 1:
        return '🏆';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return '🎮';
    }
  };

  const navigateHome = () => {
    navigate('/dashboard');
  };

  const currentLeaderboard = leaderboards[activeTab] || [];

  const getTabIcon = (tab) => {
    switch (tab) {
      case 'savings':
        return '💰';
      case 'investing':
        return '📈';
      case 'budgeting':
        return '📊';
      default:
        return '🎮';
    }
  };

  return (
    <div className="leaderboards-container game-theme">
      <IconButton 
        className="home-button" 
        onClick={navigateHome}
        aria-label="home"
        sx={{ 
          position: 'absolute', 
          top: '20px', 
          left: '20px',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          color: '#009797',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            transform: 'scale(1.1)',
          }
        }}
      >
        <HomeIcon fontSize="large" />
      </IconButton>
      
      <h1 className="leaderboards-title">
        <EmojiEventsIcon className="title-icon" />
        QUEST CHAMPIONS
        <EmojiEventsIcon className="title-icon" />
      </h1>
      
      <div className="leaderboards-tabs">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`tab ${activeTab === 'savings' ? 'active' : ''}`}
          onClick={() => handleTabChange('savings')}
        >
          {getTabIcon('savings')} Savings Battle
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`tab ${activeTab === 'investing' ? 'active' : ''}`}
          onClick={() => handleTabChange('investing')}
        >
          {getTabIcon('investing')} Investing Assessment
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`tab ${activeTab === 'budgeting' ? 'active' : ''}`}
          onClick={() => handleTabChange('budgeting')}
        >
          {getTabIcon('budgeting')} Budget Quest
        </motion.button>
      </div>
      
      <div className="leaderboard-content">
        {loading ? (
          <div className="loading">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="loading-icon"
            >
              <SportsEsportsIcon fontSize="large" />
            </motion.div>
            Loading quest data...
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="leaderboard-table"
          >
              <div className="leaderboard-header">
                <span className="rank-header">Rank</span>
                <span className="name-header">Player</span>
                <span className="score-header">{activeTab === 'investing' ? 'Score' : 'Money'}</span>
              </div>

              {currentLeaderboard.map((player, index) => (
                <motion.div 
                  key={index}
                  className="leaderboard-row"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ 
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 100
                  }}
                >
                  <span className={`rank rank-${player.rank}`}>
                    {getBadge(player.rank)} {player.rank}
                  </span>
                  <span className="name">{player.username}</span>
                  <span className="score">{player.score} {activeTab === 'investing' ? 'PTS' : 'PHP'}</span>
                </motion.div>
              ))}
            {currentLeaderboard.length === 0 && (
              <div className="no-data">No players have joined this quest yet!</div>
            )}
          </motion.div>
        )}
      </div>
      
      <motion.footer 
        className="leaderboard-footer"
        whileHover={{ scale: 1.02 }}
      >
        <span className="pixel-icon">⚔️</span> Complete financial quests to level up and climb the rankings! <span className="pixel-icon">🎮</span>
      </motion.footer>
    </div>
  );
};

export default Leaderboards;