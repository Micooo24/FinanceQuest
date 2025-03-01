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
import Modal12 from './Modal12';
import Modal13 from './Modal13';
import Modal14 from './Modal14';
import Modal15 from './Modal15';
import Modal16 from './Modal16';
import Modal17 from './Modal17';
import Modal18 from './Modal18';
import Modal19 from './Modal19';
import Modal20 from './Modal20';
import Modal21 from './Modal21';
import Modal22 from './Modal22';
import Modal23 from './Modal23';
import Modal23A from './Modal23A';
import Modal23B from './Modal23B';
import Modal24A from './Modal24A';
import Modal24B from './Modal24B';
import Modal25 from './Modal25';
import Modal26A from './Modal26A';
import Modal26B from './Modal26B';
import Modal27 from './Modal27';
import Modal28 from './Modal28';
import Modal29 from './Modal29';
import Modal30 from './Modal30';
import Modal31 from './Modal31';

const Quest2 = ({ onComplete }) => {
  const [currentModal, setCurrentModal] = useState('1');

  const handleNextModal = () => {
    setCurrentModal((prev) => (parseInt(prev) + 1).toString());
  };

  // Handles choice in Modal23 (Choose Activation Method)
  const handleActivationChoice = (choice) => {
    if (choice === 'onlineBanking') setCurrentModal('23A'); // Online
    else setCurrentModal('23B'); // ATM
  };

  // Handles choice in Modal25 (Choose Financial Decision)
  const handleFinancialDecision = (choice) => {
    if (choice === 'deposit') setCurrentModal('26A'); // Deposit
    else setCurrentModal('26B'); // Withdraw
  };

  // Handles choice in Modal28 (Choose Banking Insight)
  const handleBankingInsightChoice = (choice) => {
    if (choice === 'option1') setCurrentModal('29'); // Shows Modal29
    else if (choice === 'option2') setCurrentModal('30'); // Shows Modal30
    else setCurrentModal('31'); // Shows Modal31
  };

  return (
    <>
      {currentModal === '1' && <Modal1 onContinue={handleNextModal} />}
      {currentModal === '2' && <Modal2 onContinue={handleNextModal} />}
      {currentModal === '3' && <Modal3 onContinue={handleNextModal} />}
      {currentModal === '4' && <Modal4 onContinue={handleNextModal} />}
      {currentModal === '5' && <Modal5 onContinue={handleNextModal} />}
      {currentModal === '6' && <Modal6 onContinue={handleNextModal} />}
      {currentModal === '7' && <Modal7 onContinue={handleNextModal} />}
      {currentModal === '8' && <Modal8 onContinue={handleNextModal} />}
      {currentModal === '9' && <Modal9 onContinue={handleNextModal} />}
      {currentModal === '10' && <Modal10 onContinue={handleNextModal} />}
      {currentModal === '11' && <Modal11 onContinue={handleNextModal} />}
      {currentModal === '12' && <Modal12 onContinue={handleNextModal} />}
      {currentModal === '13' && <Modal13 onContinue={handleNextModal} />}
      {currentModal === '14' && <Modal14 onContinue={handleNextModal} />}
      {currentModal === '15' && <Modal15 onContinue={handleNextModal} />}
      {currentModal === '16' && <Modal16 onContinue={handleNextModal} />}
      {currentModal === '17' && <Modal17 onContinue={handleNextModal} />}
      {currentModal === '18' && <Modal18 onContinue={handleNextModal} />}
      {currentModal === '19' && <Modal19 onContinue={handleNextModal} />}
      {currentModal === '20' && <Modal20 onContinue={handleNextModal} />}
      {currentModal === '21' && <Modal21 onContinue={handleNextModal} />}
      {currentModal === '22' && <Modal22 onContinue={handleNextModal} />}
      
      {/* Modal23: Choose Activation Method */}
      {currentModal === '23' && <Modal23 onChoose={handleActivationChoice} />}
      
      {/* Activation Path */}
      {currentModal === '23A' && <Modal23A onContinue={() => setCurrentModal('24A')} />}
      {currentModal === '23B' && <Modal23B onContinue={() => setCurrentModal('24B')} />}
      {currentModal === '24A' && <Modal24A onContinue={() => setCurrentModal('25')} />}
      {currentModal === '24B' && <Modal24B onContinue={() => setCurrentModal('25')} />}
      
      {/* Modal25: Choose Financial Decision */}
      {currentModal === '25' && <Modal25 onChoose={handleFinancialDecision} />}
      
      {/* Deposit Path */}
      {currentModal === '26A' && <Modal26A onContinue={() => setCurrentModal('27')} />}
      
      {/* Withdraw Path */}
      {currentModal === '26B' && <Modal26B onContinue={() => setCurrentModal('27')} />}
      
      {/* Banking Insight Path */}
      {currentModal === '27' && <Modal27 onContinue={() => setCurrentModal('28')} />}
      {currentModal === '28' && <Modal28 onChoose={handleBankingInsightChoice} />}
      
      {/* Banking Insights */}
      {currentModal === '29' && <Modal29 onBack={() => setCurrentModal('28')} />}
      {currentModal === '30' && <Modal30 onBack={() => setCurrentModal('28')} />}
      {currentModal === '31' && <Modal31 onBack={() => setCurrentModal('28')} />}
    </>
  );
};

export default Quest2;
