import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { FaHome, FaTrophy, FaCoins, FaChevronLeft, FaChevronRight, FaLightbulb, FaMedal, FaDownload } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PDFDownloadLink, pdf } from '@react-pdf/renderer';
import GameplayAnalysisReport from './GameplayAnalysisReport';
import './GameplayAnalysis.css';

// Register Chart.js components
Chart.register(...registerables);

const GameAnalysis = () => {
  const navigate = useNavigate();
  const [gameData, setGameData] = useState(null);
  const [playerData, setPlayerData] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0); 
  const [analysis, setAnalysis] = useState('');
  const hasFetched = useRef(false);

  const userId = localStorage.getItem('userId');
  const authToken = localStorage.getItem('authToken');

  const fetchPlayerStats = async () => {
    const authToken = localStorage.getItem('authToken'); 
    console.log('Fetching player stats with authToken:', authToken); // Debugging log
    try {
      const response = await axios.get('http://localhost:8000/stats/get/player', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log('Player stats response:', response.data); // Debugging log
      setPlayerData(response.data);
    } catch (error) {
      console.error('Error fetching player stats:', error);
    }
  };

  useEffect(() => {
    if (!userId || hasFetched.current) {
      return;
    }

    const fetchData = async () => {
      try {
        await axios.post(`http://localhost:8000/stats_ai/analyze-stats/${userId}`);
        const { data } = await axios.get(`http://localhost:8000/stats_ai/get-stats-analysis/${userId}`);
        setAnalysis(data.analysis);
      } catch (error) {
        console.error('Error fetching analysis:', error);
        setAnalysis('Failed to load analysis. Please try again later.');
      }
    };

    fetchData();
    fetchPlayerStats();
    hasFetched.current = true;
  }, [userId]);

  useEffect(() => {
    console.log('Player data:', playerData); // Debugging log
  }, [playerData]);

  const navigateHome = () => {
    navigate('/dashboard');
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === 2 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? 2 : prev - 1));
  };

  const formatAnalysisText = (text) => {
    return text.split('\n').map((line) => {
      if (line.startsWith("**")) return `<h3>${line.replace(/\*\*/g, '')}</h3>`;
      if (line.startsWith("*") || line.startsWith("-")) return `<li>${line.substring(1).trim()}</li>`;
      return `<p>${line.trim()}</p>`;
    }).join("\n");
  };

  const downloadPDF = async () => {
    const doc = (
      <GameplayAnalysisReport playerData={playerData} analysis={analysis} />
    );
    const asPdf = pdf([]); // Empty array means no additional options
    asPdf.updateContainer(doc);
    const blob = await asPdf.toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'FinanceQuest_Analysis.pdf';
    link.click();
  };

  const chartData = {
    labels: ['Q1', 'SQ1', 'Q2', 'SQ2', 'Q3'],
    datasets: [
      {
        label: 'Money Spent',
        data: [
          playerData?.q1_outcome?.money_spent || 0,
          playerData?.sq1_outcome?.money_spent || 0,
          playerData?.q2_outcome?.money_spent || 0,
          playerData?.sq2_outcome?.money_spent || 0,
          playerData?.q3_outcome?.money_spent || 0,
        ],
        borderColor: '#8a2be2', // Purple
        backgroundColor: 'rgba(138, 43, 226, 0.2)',
        borderWidth: 3,
        tension: 0.4,
        pointBackgroundColor: '#8a2be2',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: true,
        // This creates the shadow gradient effect below the line
        fill: {
          target: 'origin',
          above: 'rgba(138, 43, 226, 0.1)',
        }
      },
      {
        label: 'Money Earned',
        data: [
          playerData?.q1_outcome?.money_earned || 0,
          playerData?.sq1_outcome?.money_earned || 0,
          playerData?.q2_outcome?.money_earned || 0,
          playerData?.sq2_outcome?.money_earned || 0,
          playerData?.q3_outcome?.money_earned || 0,
        ],
        borderColor: '#00cac9', // Green
        backgroundColor: 'rgba(0, 202, 201, 0.2)',
        borderWidth: 3,
        tension: 0.4,
        pointBackgroundColor: '#00cac9',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: true,
        // This creates the shadow gradient effect below the line
        fill: {
          target: 'origin',
          above: 'rgba(0, 202, 201, 0.1)',
        }
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#e0c1f5',
          font: {
            family: 'Press Start 2P, cursive',
            size: 12
          },
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      title: {
        display: true,
        color: '#00cac9',
        font: {
          family: 'Press Start 2P, cursive',
          size: 16
        }
      },
      tooltip: {
        backgroundColor: 'rgba(58, 18, 102, 0.9)',
        titleFont: {
          family: 'Press Start 2P, cursive',
          size: 12
        },
        bodyFont: {
          family: 'Segoe UI',
          size: 14
        },
        borderColor: '#8a2be2',
        borderWidth: 1,
        titleColor: '#00cac9',
        boxPadding: 6
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(224, 193, 245, 0.1)'
        },
        ticks: {
          color: '#e0c1f5'
        }
      },
      x: {
        grid: {
          color: 'rgba(224, 193, 245, 0.1)'
        },
        ticks: {
          color: '#e0c1f5'
        }
      }
    },
    elements: {
      line: {
        borderWidth: 3,
      },
      point: {
        // This adds a subtle glow to each data point
        hoverBackgroundColor: function(context) {
          return context.dataset.label === 'Money Spent' ? '#8a2be2' : '#00cac9';
        },
        hoverBorderColor: '#fff',
        hoverBorderWidth: 3,
        hoverRadius: 8,
      }
    },
    // This enables smooth animations
    animation: {
      duration: 1500,
      easing: 'easeOutQuart'
    }
  };

  return (
    <div className="game-analysis-container">
      <div className="game-analysis-header">
        <button className="home-button" onClick={navigateHome}>
          <FaHome size={24} />
        </button>
        <h1 className="game-analysis-title">FinanceQuest Analysis</h1>
        {/* Added download button */}
        <button className="download-button" onClick={downloadPDF} title="Download as PDF">
          <FaDownload size={24} />
        </button>
      </div>
      
      <div className="stats-overview">
        <div className="stat-card">
          <FaCoins className="stat-icon" />
          <div className="stat-details">
            <h3>Money</h3>
            <p>{playerData?.money || '0'}</p>
          </div>
        </div>
      
        <div className="stat-card">
          <FaTrophy className="stat-icon" />
          <div className="stat-details">
            <h3>Points</h3>
            <p>
              {new Intl.NumberFormat().format(
              (playerData?.q1_outcome?.points_earned || 0) +
              (playerData?.sq1_outcome?.points_earned || 0) +
              (playerData?.q2_outcome?.points_earned || 0) +
              (playerData?.sq2_outcome?.points_earned || 0) +
              (playerData?.q3_outcome?.points_earned || 0) 
              )}
            </p>
          </div>
        </div>
        <div className="stat-card">
          <FaMedal className="stat-icon" />
          <div className="stat-details">
            <h3>Medals</h3>
            <p>{playerData?.medals ? playerData.medals.length : '0'}</p>
          </div>
        </div>
      </div>
      
      <div className="main-carousel-container">
        <button 
          className="carousel-arrow prev"
          onClick={prevSlide}
        >
          <FaChevronLeft />
        </button>
      
        <div className="main-carousel">
          {activeSlide === 0 ? (
            <div className="chart-container">
              <Line data={chartData} options={chartOptions} />
            </div>
          ) : activeSlide === 1 ? (
            <div className="game-analysis-text">
              <h2>Quest Log</h2>
              <div className="decision-summary">
                <div className="quest-slider-container">
                  <div className="quest-slider">
                    <div className="quest-slide">
                      <li>
                        <strong>Quest 1:</strong> Financial Management Challenge
                        <br />
                        <span>Decision: {playerData?.q1_decision || 'None'}</span>
                        <br />
                        <span className="reward">+{playerData?.q1_outcome?.points_earned || '0'} points earned</span>
                        <br />
                        <span className="money_earned">+₱{playerData?.q1_outcome?.money_earned || '0'}</span>
                        <br />
                        <span className="money_spent">-₱{playerData?.q1_outcome?.money_spent || '0'}</span>
                      </li>
                    </div>
                
                    <div className="quest-slide">
                      <li>
                        <strong>Side Quest 1:</strong> Financial Knowledge Test
                        <br />
                        <span>Status: {playerData?.sq1_done ? 'Completed!' : 'Not attempted'}</span>
                        <br />
                        <span className="reward">+{playerData?.sq1_outcome?.points_earned || '0'} points earned</span>
                        <br />
                        <span className="money_earned">+₱{playerData?.sq1_outcome?.money_earned || '0'}</span>
                        <br />
                        <span className="money_spent">-₱{playerData?.sq1_outcome?.money_spent || '0'}</span>
                      </li>
                    </div>
                
                    <div className="quest-slide">
                      <li>
                        <strong>Quest 2:</strong> Banking Technology
                        <br />
                        <span>Decision: {playerData?.q2_decision || 'None'}</span>
                        <br/>
                        <span className="reward">+{playerData?.q2_outcome?.points_earned || '0'} points earned</span>
                        <br />
                        <span className="money_earned">+₱{playerData?.q2_outcome?.money_earned || '0'}</span>
                        <br />
                        <span className="money_spent">-₱{playerData?.q2_outcome?.money_spent || '0'}</span>
                      </li>
                    </div>
                
                    <div className="quest-slide">
                      <li>
                        <strong>Side Quest 2:</strong> Wealth Building
                        <br />
                        <span>Decision: {playerData?.sq2_decision || 'None'}</span>
                        <br />
                        <span className="reward">+{playerData?.sq2_outcome?.points_earned || '0'} points earned</span>
                        <br />
                        <span className="money_earned">+₱{playerData?.sq2_outcome?.money_earned || '0'}</span>
                        <br />
                        <span className="money_spent">-₱{playerData?.sq2_outcome?.money_spent || '0'}</span>
                      </li>
                    </div>
                
                    <div className="quest-slide">
                      <li>
                        <strong>Quest 3:</strong> Investment Strategies
                        <br />
                        <span>Decision: {playerData?.q3_decision || 'None'}</span>
                        <br />
                        <span className="reward">+{playerData?.q3_outcome?.points_earned || '0'} points earned</span>
                        <br />
                        <span className="money_earned">+₱{playerData?.q3_outcome?.money_earned || '0'}</span>
                        <br />
                        <span className="money_spent">-₱{playerData?.q3_outcome?.money_spent || '0'}</span>
                      </li>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="game-analysis-text">
              <h2><FaLightbulb /> Your Financial Journey Analysis</h2>
              <div
                className="analysis-description"
                dangerouslySetInnerHTML={{ __html: analysis ? formatAnalysisText(analysis) : "Here's your personalized analysis of your financial decisions in Finance Quest!..." }}
              />
            </div>
          )}
        </div>
        
        <button 
          className="carousel-arrow next"
          onClick={nextSlide}
        >
          <FaChevronRight />
        </button>
        
        <div className="carousel-indicators">
          <span 
            className={`carousel-indicator ${activeSlide === 0 ? 'active' : ''}`}
            onClick={() => setActiveSlide(0)}
          />
          <span 
            className={`carousel-indicator ${activeSlide === 1 ? 'active' : ''}`}
            onClick={() => setActiveSlide(1)}
          />
          <span 
            className={`carousel-indicator ${activeSlide === 2 ? 'active' : ''}`}
            onClick={() => setActiveSlide(2)}
          />
        </div>
      </div>
    </div>
  );
};

export default GameAnalysis;