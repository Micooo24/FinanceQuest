import React, { useState, useEffect } from 'react';
import  toast from 'react-hot-toast';
import Welcome from './Welcome';
import Modal1Introduction from './Modal1Introduction';
import Modal2InnerThoughts from './Modal2';
import Modal3BoardingHouse from './Modal3';
import Modal4MeetingLandlord from './Modal4';
import Modal5PlayerReaction from './Modal5';
import Modal6RentDecision from './Modal6';
import Modal7A_PayRent from './Modal7A';
import Modal8A_LandlordResponse from './Modal8A';
import Modal7B_DelayRent from './Modal7B';
import Modal8B_LandlordResponse from './Modal8B';
import ChecklistModal from '../Checklist/ChecklistModal';
import { Button } from '@mui/material';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { checkProximityToNPC4 } from '../../Game/Character';

const Quest1 = ({ onComplete, setPlayerStats, characterPosition }) => {
  const [currentModal, setCurrentModal] = useState(1);
  const [rentDecision, setRentDecision] = useState(null);
  const [isQuest1Completed, setIsQuest1Completed] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const [showMeetingLandlordModal, setShowMeetingLandlordModal] = useState(false);
  const [isModal3Completed, setIsModal3Completed] = useState(false);
  const [showTalkToLandlordButton, setShowTalkToLandlordButton] = useState(false);

  useEffect(() => {
    if (characterPosition) {
      const isCloseToNPC4 = checkProximityToNPC4(characterPosition);
      console.log('Character position:', characterPosition);
      console.log('Is close to NPC4:', isCloseToNPC4);
      setShowMeetingLandlordModal(isCloseToNPC4);
      setShowTalkToLandlordButton(!isCloseToNPC4);
      if (isCloseToNPC4 && currentModal === 4) {
        console.log('Automatically moving to Modal 5');
        setCurrentModal(5); // Automatically move to the next modal when close to NPC4
      }
    }
  }, [characterPosition, currentModal]);

  const handleNextModal = () => {
    console.log('Current modal:', currentModal);
    if ((rentDecision === 'pay' && currentModal === 9) || 
        (rentDecision === 'delay' && currentModal === 11)) {
      setIsQuest1Completed(true); 
      onComplete();
    } else {
      if (currentModal === 4) {
        setIsModal3Completed(true);
        setShowTalkToLandlordButton(true);
      }
      setCurrentModal((prev) => prev + 1);
    }
  };

  const handleRentDecision = (choice) => {
    console.log('Rent decision:', choice);
    setRentDecision(choice);
    setCurrentModal(choice === 'pay' ? 8 : 10);
  };

  const handleTalkToLandlord = () => {
    const isCloseToNPC4 = checkProximityToNPC4(characterPosition);
    console.log('Is close to NPC4:', isCloseToNPC4);
    if (isCloseToNPC4) {
      toast.success('You are now talking to the landlord.');
      setCurrentModal(5);
      setShowMeetingLandlordModal(true);
      setShowTalkToLandlordButton(false);
    } else {
      toast.error('You are far from the landlord.');
    }
  };

  return (
    <>
      {currentModal === 1 && <Welcome onContinue={handleNextModal} />}
      {currentModal === 2 && <Modal1Introduction onContinue={handleNextModal} />}
      {currentModal === 3 && <Modal2InnerThoughts onContinue={handleNextModal} />}
      {currentModal === 4 && <Modal3BoardingHouse onContinue={handleNextModal} />}
      {currentModal === 5 && showMeetingLandlordModal && <Modal4MeetingLandlord onContinue={handleNextModal} />}
      {currentModal === 6 && <Modal5PlayerReaction onContinue={handleNextModal} />}
      {currentModal === 7 && <Modal6RentDecision onSelectChoice={handleRentDecision} setPlayerStats={setPlayerStats} />}
      
      {rentDecision === 'pay' && currentModal === 8 && <Modal7A_PayRent onContinue={() => setCurrentModal(9)} />}
      {rentDecision === 'pay' && currentModal === 9 && <Modal8A_LandlordResponse onContinue={handleNextModal} />}
      
      {rentDecision === 'delay' && currentModal === 10 && <Modal7B_DelayRent onContinue={() => setCurrentModal(11)} />}
      {rentDecision === 'delay' && currentModal === 11 && <Modal8B_LandlordResponse onContinue={handleNextModal} />}

      {isModal3Completed && showTalkToLandlordButton && (
        <Button 
          onClick={handleTalkToLandlord}
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
          TALK TO LANDLORD
        </Button>
      )}

      {currentModal > 1 && (
        <Button 
          onClick={() => setShowChecklist(true)}
          sx={{ 
            position: 'fixed', 
            top: 100, 
            right: 20, 
            zIndex: 9999,
            minWidth: 'auto', 
            padding: '8px',
            color: '#fff',
          }}
        >
          <AssignmentTurnedInIcon sx={{ fontSize: 50 }} />
        </Button>
      )}

      {/* Checklist Modal */}     
      <ChecklistModal 
        open={showChecklist} 
        onClose={() => setShowChecklist(false)} 
        isQuest1Completed={isQuest1Completed} 
      />
    </>
  );
};

export default Quest1;