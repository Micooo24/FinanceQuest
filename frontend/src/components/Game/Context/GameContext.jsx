import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import * as THREE from 'three';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [playerStats, setPlayerStats] = useState(null);
  const [characterPosition, setCharacterPosition] = useState(new THREE.Vector3());

  const fetchPlayerStats = async () => {
    const authToken = localStorage.getItem('authToken');
    try {
      const response = await axios.get('http://127.0.0.1:8000/stats/get/player', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setPlayerStats(response.data);
    } catch (error) {
      console.error('Error fetching player stats:', error);
    }
  };
  fetchPlayerStats();


  // useEffect(() => {
  //   fetchPlayerStats();
  //   const intervalId = setInterval(fetchPlayerStats, 60000); // Refresh every 1 minute
  //   return () => clearInterval(intervalId); // Cleanup interval on unmount
  // }, []);

  return (
    <GameContext.Provider value={{ playerStats, setPlayerStats, characterPosition, setCharacterPosition }}>
      {children}
    </GameContext.Provider>
  );
};