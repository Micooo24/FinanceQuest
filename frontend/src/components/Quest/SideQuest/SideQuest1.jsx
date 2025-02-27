import React, { useState, useEffect } from 'react';
import Modal1 from './Modal1';
import Modal2 from './Modal2';
import Modal3 from './Modal3';
import Modal4 from './Modal4';
import Modal5 from './Modal5';
import Modal6 from './Modal6';
import Modal7 from './Modal7';
import Modal8 from './Modal8';
import Modal9 from './Modal9';
import Modal10 from './Modal10';
import Modal11 from './Modal11';
import LessonUnlockedModal from './LessonUnlockedModal';
import { checkProximityToNPC7 } from '../../Utils/proximity';
import { Button } from '@mui/material';

const SideQuest1 = ({ setPlayerStats, characterPosition }) => {
  const [currentModal, setCurrentModal] = useState(1);
  const [budgetOutcome, setBudgetOutcome] = useState(null);
  const [showLessonUnlocked, setShowLessonUnlocked] = useState(false);
  const [showSupermarketButton, setShowSupermarketButton] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  useEffect(() => {
    if (characterPosition) {
      console.log('Character position updated:', characterPosition); // Debug log
      const isCloseToNPC7 = checkProximityToNPC7(characterPosition);
      console.log('Is close to NPC7:', isCloseToNPC7); // Debug log
      setShowSupermarketButton(isCloseToNPC7);
    }
  }, [characterPosition]);

  const handleNextModal = () => {
    setCurrentModal((prev) => prev + 1);
  };

  const handleBudgetDecision = (totalSpent) => {
    if (totalSpent > 2000) {
      setBudgetOutcome('overspent');
      setCurrentModal(9); // Go to overspending outcome
    } else {
      setBudgetOutcome('smart');
      setCurrentModal(11); // Go to smart budgeting outcome
    }
  };

  const handleShowLesson = () => {
    setShowLessonUnlocked(true);
  };

  const handleCloseLesson = () => {
    setShowLessonUnlocked(false);
    // No reset to start - continue the flow
  };

  const handleGoToSupermarket = () => {
    setShowModal2(true);
    setCurrentModal(2); // Move to Modal 2 when button is clicked
  };

  return (
    <>
      {currentModal === 1 && <Modal1 onContinue={handleNextModal} />}
      {showModal2 && currentModal === 2 && <Modal2 onContinue={handleNextModal} />}
      {currentModal === 3 && <Modal3 onContinue={handleNextModal} />}
      {currentModal === 4 && <Modal4 onContinue={handleNextModal} />}
      {currentModal === 5 && <Modal5 onContinue={handleNextModal} />}
      {currentModal === 6 && <Modal6 onContinue={handleNextModal} />}
      {currentModal === 7 && <Modal7 onContinue={handleNextModal} />}
      {currentModal === 8 && <Modal8 onCheckout={handleBudgetDecision} setPlayerStats={setPlayerStats} />}

      {/* Overspent Path */}
      {budgetOutcome === 'overspent' && currentModal === 9 && (
        <Modal9 onContinue={() => setCurrentModal(10)} />
      )}
      {budgetOutcome === 'overspent' && currentModal === 10 && (
        <Modal10 onContinue={handleShowLesson} />
      )}

      {/* Smart Budgeting Path */}
      {budgetOutcome === 'smart' && currentModal === 11 && (
        <Modal11 onContinue={handleShowLesson} />
      )}

      {/* Final Lesson Unlocked Modal */}
      {showLessonUnlocked && (
        <LessonUnlockedModal open={showLessonUnlocked} onClose={handleCloseLesson} />
      )}

      {/* Go to Supermarket Button */}
      {showSupermarketButton && (
        <Button 
          onClick={handleGoToSupermarket}
          sx={{ 
            position: 'fixed', 
            bottom: 100, 
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
            minWidth: 'auto', 
            padding: '8px',
            color: '#fff',
            backgroundColor: '#1976d2',
          }}
        >
          Go to Supermarket
        </Button>
      )}
    </>
  );
};

export default SideQuest1;