import React, { useState, useEffect } from 'react';
import { FaMedal, FaStar, FaArrowLeft, FaTrophy, FaGem } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Shop = ({ onPurchase }) => {
  const [userPoints, setUserPoints] = useState(0);
  const [purchasedMedals, setPurchasedMedals] = useState([]);
  const navigate = useNavigate();

  // Color scheme
  const colors = {
    primary: '#B399D4',
    light: '#F5E1FD',
    secondary: '#CE9DD9',
    dark: '#7A6992',
    text: '#4A3B63',
    white: '#FFFFFF'
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        console.error('No auth token found');
        return;
      }

      try {
        const response = await axios.get('http://127.0.0.1:8000/stats/get/player', {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });
        setUserPoints(response.data.points);
        setPurchasedMedals(response.data.medals || []);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const medals = {
    "bronze_planner": 20,
    "silver_analyst": 25,
    "gold_strategist": 30,
    "platinum_investor": 40,
    "diamond_visionary": 50
  };

  const formatMedalName = (name) => {
    return name
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getMedalColor = (medalName) => {
    if (medalName.includes('bronze')) return '#CD7F32';
    if (medalName.includes('silver')) return '#C0C0C0';
    if (medalName.includes('gold')) return '#FFD700';
    if (medalName.includes('platinum')) return '#E5E4E2';
    if (medalName.includes('diamond')) return '#B9F2FF';
    return '#000000';
  };

  const handlePurchase = async (medalName, cost) => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      console.error('No auth token found');
      return;
    }

    if (userPoints >= cost) {
      try {
        const response = await axios.put('http://127.0.0.1:8000/stats/purchase/medal', 
          { medal: medalName },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`
            }
          }
        );

        if (response.status === 200) {
          setUserPoints(response.data.points);
          setPurchasedMedals(response.data.medals);
          toast.success(`Successfully purchased ${formatMedalName(medalName)}!`);
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        } else {
          toast.error('Error purchasing medal!');
        }
      } catch (error) {
        console.error('Error purchasing medal:', error);
        toast.error('Error purchasing medal!');
      }
    } else {
      toast.error('Not enough points to purchase this medal!');
    }
  };

  return (
    <div style={{
      backgroundImage: `url('/assets/bg.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      position: 'relative',
      padding: '40px',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      {/* Dark overlay with purple tint */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(69, 43, 99, 0.75)',
        zIndex: 1
      }}></div>
      
      <div style={{
        position: 'relative',
        zIndex: 2,
        background: `rgba(245, 225, 253, 0.9)`, // Using light color with transparency
        backdropFilter: 'blur(10px)',
        borderRadius: '15px',
        padding: '30px',
        boxShadow: `0 15px 35px rgba(179, 153, 212, 0.6)`, // Primary color shadow
        color: colors.text,
        maxWidth: '1000px',
        width: '100%',
        border: `1px solid ${colors.primary}`
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '15px'
        }}>
          <button 
            onClick={() => navigate('/gameplay')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              backgroundColor: colors.primary,
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: `0 2px 5px rgba(179, 153, 212, 0.5)`
            }}
          >
            <FaArrowLeft /> Back to Game
          </button>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '10px 20px',
            background: colors.secondary,
            borderRadius: '10px',
            boxShadow: `0 2px 8px rgba(206, 157, 217, 0.4)`,
            border: `1px solid ${colors.primary}`
          }}>
            <FaStar style={{ color: '#FFD700', marginRight: '10px', fontSize: '1.5rem' }} />
            <span style={{ fontSize: '1.3rem', fontWeight: 'bold', color: colors.white }}>{userPoints} points</span>
          </div>
        </div>
        
        <div style={{
          textAlign: 'center',
          marginBottom: '30px',
          padding: '25px',
          borderRadius: '12px',
          background: `linear-gradient(135deg, ${colors.primary}20, ${colors.light})`,
          boxShadow: `inset 0 0 20px rgba(179, 153, 212, 0.3)`,
          border: `1px solid ${colors.primary}`
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '15px'
          }}>
            <FaTrophy style={{ 
              fontSize: '2.5rem', 
              color: '#FFD700',
              marginRight: '15px',
              filter: `drop-shadow(0 0 8px rgba(255, 215, 0, 0.6))`
            }} />
            <h1 style={{
              fontSize: '2.5rem',
              margin: '0',
              background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
              Welcome to the Achievement Shop
            </h1>
            <FaTrophy style={{ 
              fontSize: '2.5rem', 
              color: '#FFD700',
              marginLeft: '15px',
              filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.6))'
            }} />
          </div>
          
          <p style={{ 
            fontSize: '1.2rem', 
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6',
            color: colors.text
          }}>
            Showcase your financial expertise with prestigious medals! Each medal represents your mastery of different aspects of financial planning and investment strategy. Collect them all to demonstrate your comprehensive financial knowledge.
          </p>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '25px',
          justifyContent: 'center'
        }}>
          {Object.entries(medals).map(([medalName, points]) => (
            <div key={medalName} style={{
              background: `linear-gradient(145deg, ${colors.light}, ${colors.primary}15)`,
              borderRadius: '12px',
              padding: '25px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transition: 'transform 0.3s, box-shadow 0.3s',
              boxShadow: purchasedMedals.includes(medalName) ? 
                `0 8px 25px ${colors.secondary}80` : 
                `0 8px 20px rgba(0,0,0,0.1)`,
              border: `1px solid ${purchasedMedals.includes(medalName) ? colors.secondary : colors.primary}40`,
              position: 'relative',
              overflow: 'hidden',
              backdropFilter: 'blur(5px)',
              transform: purchasedMedals.includes(medalName) ? 'scale(1.02)' : 'scale(1)',
              ':hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 12px 25px rgba(0,0,0,0.3)'
              }
            }}>
              {purchasedMedals.includes(medalName) && (
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: colors.secondary,
                  color: colors.white,
                  padding: '5px 10px',
                  borderRadius: '15px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  boxShadow: `0 2px 5px ${colors.primary}50`
                }}>
                  <FaGem /> Owned
                </div>
              )}
              
              <div style={{ 
                marginBottom: '20px',
                background: `radial-gradient(circle, ${colors.light} 0%, transparent 70%)`,
                borderRadius: '50%',
                padding: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: purchasedMedals.includes(medalName) ? `0 0 20px ${getMedalColor(medalName)}50` : 'none'
              }}>
                <FaMedal size={65} color={getMedalColor(medalName)} style={{ 
                  filter: 'drop-shadow(0 3px 5px rgba(0,0,0,0.4))',
                  animation: purchasedMedals.includes(medalName) ? 'pulse 2s infinite' : 'none'
                }} />
              </div>
              
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h3 style={{ 
                  margin: '0 0 10px 0', 
                  fontSize: '1.4rem', 
                  color: purchasedMedals.includes(medalName) ? getMedalColor(medalName) : colors.text,
                  textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                }}>
                  {formatMedalName(medalName)}
                </h3>
                <p style={{ 
                  margin: '0',
                  fontSize: '1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '5px',
                  color: colors.text
                }}>
                  <FaStar style={{ color: '#FFD700' }} /> {points} points
                </p>
              </div>
              
              <button 
                style={{
                  marginTop: 'auto',
                  width: '100%',
                  padding: '12px 15px',
                  borderRadius: '8px',
                  border: 'none',
                  background: userPoints >= points && !purchasedMedals.includes(medalName) ? 
                    `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` : 
                    purchasedMedals.includes(medalName) ?
                    `linear-gradient(135deg, ${colors.secondary}, ${colors.secondary})` :
                    'linear-gradient(135deg, #585858, #3d3d3d)',
                  color: '#fff',
                  fontWeight: 'bold',
                  cursor: userPoints >= points && !purchasedMedals.includes(medalName) ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s',
                  opacity: userPoints >= points || purchasedMedals.includes(medalName) ? 1 : 0.7,
                  boxShadow: userPoints >= points && !purchasedMedals.includes(medalName) ? `0 4px 10px ${colors.primary}80` : 'none',
                  fontSize: '1.05rem'
                }}
                onClick={() => handlePurchase(medalName, points)}
                disabled={userPoints < points || purchasedMedals.includes(medalName)}
              >
                {purchasedMedals.includes(medalName) ? 'Already Purchased' : (userPoints >= points ? 'Purchase' : 'Not enough points')}
              </button>
            </div>
          ))}
        </div>

        {/* Add this style tag for animations */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
        `}} />
      </div>
    </div>
  );
};

export default Shop;