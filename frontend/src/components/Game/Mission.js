import React, { useState } from 'react';
import './Mission.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

const Mission = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMissions = () => {
    setIsOpen(!isOpen);
  };

  const missions = [
    { id: 1, name: 'Task 1', completed: true },
    { id: 2, name: 'Task 2', completed: false },
    { id: 3, name: 'Task 3', completed: true },
  ];

  return (
    <div className={`mission-container ${isOpen ? 'open' : ''}`} onClick={toggleMissions}>
      <div className="mission-header">
        <h3>Missions</h3>
      </div>
      {isOpen && (
        <div className="mission-list">
          {missions.map(mission => (
            <div key={mission.id} className="mission-item">
              <span>{mission.name}</span>
              <FontAwesomeIcon
                icon={mission.completed ? faCheck : faTimes}
                className={`mission-status ${mission.completed ? 'completed' : 'not-completed'}`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Mission;