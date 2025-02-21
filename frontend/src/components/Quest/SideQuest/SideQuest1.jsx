import React, { useState } from 'react';
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

const SideQuest1 = () => {
  const [currentModal, setCurrentModal] = useState(1);
  const [budgetOutcome, setBudgetOutcome] = useState(null);
  const [showLessonUnlocked, setShowLessonUnlocked] = useState(false);

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
  

  return (
    <>
      {currentModal === 1 && <Modal1 onContinue={handleNextModal} />}
      {currentModal === 2 && <Modal2 onContinue={handleNextModal} />}
      {currentModal === 3 && <Modal3 onContinue={handleNextModal} />}
      {currentModal === 4 && <Modal4 onContinue={handleNextModal} />}
      {currentModal === 5 && <Modal5 onContinue={handleNextModal} />}
      {currentModal === 6 && <Modal6 onContinue={handleNextModal} />}
      {currentModal === 7 && <Modal7 onContinue={handleNextModal} />}
      {currentModal === 8 && <Modal8 onCheckout={handleBudgetDecision} />}

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
    </>
  );
};

export default SideQuest1;
