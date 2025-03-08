import React, { useState, useEffect } from 'react';
import Modal1 from './Modal1';
import Modal2 from './Modal2';
import Modal3 from './Modal3';
import Modal4 from './Modal4';
import Modal5 from './Modal5';
import Modal6 from './Modal6';
import Modal7 from './Modal7';
import Modal8 from './Modal8';
import Modal8A from './Modal8A';
import Modal8B from './Modal8B';
import Modal8C from './Modal8C';
import Modal8D from './Modal8D';
import Modal8E from './Modal8E';
import Modal8F from './Modal8F';
import Modal8G from './Modal8G';
import Modal8H from './Modal8H';
import Modal9 from './Modal9';
import Modal9A from './Modal9A';
import Modal9B from './Modal9B';
import Modal9C from './Modal9C';
import Modal9D from './Modal9D';
import Modal9E from './Modal9E';
import Modal9F from './Modal9F';
import Modal9G from './Modal9G';
import Modal10 from './Modal10';
import Modal11 from './Modal11';
import Modal12 from './Modal12';
import Modal13 from './Modal13';
import Modal14 from './Modal14';
import { checkProximityToNPC6, checkProximitytoFastFood, checkProximitytoCoffeeShop } from '../../Utils/proximity'; // Adjust the import path as needed
import { toast } from 'react-hot-toast';
import { Button } from '@mui/material';

const Quest3 = ({ onComplete, setPlayerStats, characterPosition, fetchPlayerStats }) => {
  const [currentModal, setCurrentModal] = useState('1');
  const [isCloseToMark, setIsCloseToMark] = useState(false);
  const [showGoToMarkButton, setShowGoToMarkButton] = useState(false);
  const [modal2Completed, setModal2Completed] = useState(false);
  const [jobSelected, setJobSelected] = useState(false); // New state variable
  const [selectedJob, setSelectedJob] = useState(''); // New state variable
  const [isCloseToFastFood, setIsCloseToFastFood] = useState(false); // New state variable
  const [isCloseToCoffeeShop, setIsCloseToCoffeeShop] = useState(false); // New state variable
  const [showGoToJobButton, setShowGoToJobButton] = useState(true); // New state variable

  const handleNextModal = () => {
    setCurrentModal((prev) => (parseInt(prev) + 1).toString());
  };

  const handleJobSelection = (choice) => {
    setJobSelected(true); // Set jobSelected to true when a job is selected
    setSelectedJob(choice); // Set the selected job
  };

  const handleInvestmentChoice = (choice) => {
    if (choice === 'option1') setCurrentModal('12');
    else if (choice === 'option2') setCurrentModal('13');
    else setCurrentModal('14');
  };

  const handleGoToMark = () => {
    if (checkProximityToNPC6(characterPosition)) {
      setIsCloseToMark(true);
      setCurrentModal('3');
      setShowGoToMarkButton(false); // Hide the button permanently
    } else {
      toast.error('You are not close enough to the mark.');
    }
  };

  const handleGoToJobLocation = () => {
    if (selectedJob === 'cafe') {
      if (checkProximitytoCoffeeShop(characterPosition)) {
        setIsCloseToCoffeeShop(true);
        toast.success('You are close enough to the coffee shop.');
        setCurrentModal('8');
        setShowGoToJobButton(false); // Hide the button
      } else {
        toast.error('You are not close enough to the coffee shop.');
      }
    } else if (selectedJob === 'fastFood') {
      if (checkProximitytoFastFood(characterPosition)) {
        setIsCloseToFastFood(true);
        toast.success('You are close enough to the fast food.');
        setCurrentModal('9');
        setShowGoToJobButton(false); // Hide the button
      } else {
        toast.error('You are not close enough to the fast food.');
      }
    }
  };

  useEffect(() => {
    if (currentModal === '2') {
      setModal2Completed(false);
    } else if (currentModal === '3') {
      setShowGoToMarkButton(false); // Hide the button permanently
    } else {
      setShowGoToMarkButton(false);
    }
  }, [currentModal]);

  useEffect(() => {
    if (currentModal === '3' && !isCloseToMark) {
      if (checkProximityToNPC6(characterPosition)) {
        setIsCloseToMark(true);
        setShowGoToMarkButton(false); // Hide the button
        setCurrentModal('3'); // Show Modal 3
      } else {
        setShowGoToMarkButton(true); // Show the button if not close
      }
    }
  }, [currentModal, characterPosition, isCloseToMark]);

  useEffect(() => {
    if (selectedJob === 'cafe' && isCloseToCoffeeShop) {
      setCurrentModal('8');
    } else if (selectedJob === 'fastFood' && isCloseToFastFood) {
      setCurrentModal('9');
    }
  }, [selectedJob, isCloseToCoffeeShop, isCloseToFastFood]);

  useEffect(() => {
    if (selectedJob === 'cafe') {
      if (checkProximitytoCoffeeShop(characterPosition)) {
        setIsCloseToCoffeeShop(true);
      } else {
        setIsCloseToCoffeeShop(false);
      }
    } else if (selectedJob === 'fastFood') {
      if (checkProximitytoFastFood(characterPosition)) {
        setIsCloseToFastFood(true);
      } else {
        setIsCloseToFastFood(false);
      }
    }
  }, [characterPosition, selectedJob]);

  const handleModal2Continue = () => {
    setModal2Completed(true);
    setShowGoToMarkButton(true); // Show the button after Modal 2 is completed
    handleNextModal();
  };

  return (
    <>
      {currentModal === '1' && <Modal1 onContinue={handleNextModal} />}
      {currentModal === '2' && <Modal2 onContinue={handleModal2Continue} />}
      {modal2Completed && showGoToMarkButton && (
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleGoToMark}
          sx={{ 
            position: 'fixed', 
            bottom: 150, 
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
            minWidth: 'auto', 
            padding: '8px',
            color: '#fff',
            backgroundColor: '#1976d2',
          }}
        >
          Go to Mark
        </Button>
      )}
      {isCloseToMark && currentModal === '3' && <Modal3 onContinue={handleNextModal} />}
      {currentModal === '4' && <Modal4 onContinue={handleNextModal} />}
      {currentModal === '5' && <Modal5 onContinue={handleNextModal} />}
      {currentModal === '6' && <Modal6 onContinue={handleNextModal} />}
      {currentModal === '7' && <Modal7 onChoose={handleJobSelection} />}
      {jobSelected && showGoToJobButton && (
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleGoToJobLocation}
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
          {selectedJob === 'cafe' ? 'Go to Cafe' : 'Go to Fast Food'}
        </Button>
      )}
      {currentModal === '8' && <Modal8 onContinue={() => setCurrentModal('8A')} />}
      {currentModal === '8A' && <Modal8A onContinue={() => setCurrentModal('8B')} />}
      {currentModal === '8B' && <Modal8B onContinue={() => setCurrentModal('8C')} />}
      {currentModal === '8C' && <Modal8C onContinue={() => setCurrentModal('8D')} />}
      {currentModal === '8D' && <Modal8D onContinue={() => setCurrentModal('8E')} />}
      {currentModal === '8E' && <Modal8E onContinue={() => setCurrentModal('8F')} />}
      {currentModal === '8F' && <Modal8F onContinue={() => setCurrentModal('8G')} />}
      {currentModal === '8G' && <Modal8G onChoose={() => setCurrentModal('8H')} />}
      {currentModal === '8H' && <Modal8H onContinue={() => setCurrentModal('10')} />}
      {currentModal === '9' && <Modal9 onContinue={() => setCurrentModal('9A')} />}
      {currentModal === '9A' && <Modal9A onContinue={() => setCurrentModal('9B')} />}
      {currentModal === '9B' && <Modal9B onContinue={() => setCurrentModal('9C')} />}
      {currentModal === '9C' && <Modal9C onContinue={() => setCurrentModal('9D')} />}
      {currentModal === '9D' && <Modal9D onContinue={() => setCurrentModal('9E')} />}
      {currentModal === '9E' && <Modal9E onContinue={() => setCurrentModal('9F')} />}
      {currentModal === '9F' && <Modal9F onChoose={() => setCurrentModal('9G')} />}
      {currentModal === '9G' && <Modal9G onContinue={() => setCurrentModal('10')} />}
      {currentModal === '10' && <Modal10 onContinue={handleNextModal} />}
      {currentModal === '11' && <Modal11 onChoose={handleInvestmentChoice} />}
      {currentModal === '12' && <Modal12 onBack={() => setCurrentModal('11')} onContinue={handleNextModal} />}
      {currentModal === '13' && <Modal13 onBack={() => setCurrentModal('11')} onContinue={handleNextModal} />}
      {currentModal === '14' && <Modal14 onBack={() => setCurrentModal('11')} onContinue={handleNextModal} />}
    </>
  );
};

export default Quest3;