import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the app element to avoid screen reader issues

function CompleteDetailesModal ({ isOpen, onClose })  {
  const [startPoint, setStartPoint] = useState('');
  const [cost, setCost] = useState('');
  const [numOfHours, setNumOfHours] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!startPoint || !cost || !numOfHours) {
      alert('All fields are required!');
      return;
    }
    // Handle form submission logic here
    alert(`Start Point: ${startPoint}, Cost: ${cost}, Number of Hours: ${numOfHours}`);
    onClose(); // Close the modal after submission
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: {
          backgroundColor: '#333', // Dark background
          color: 'white',
          padding: '20px',
          maxWidth: '500px',
          margin: 'auto',
        },
      }}
    >
      <h2>Fill in the details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Start Point:</label>
          <input
            type="text"
            value={startPoint}
            onChange={(e) => setStartPoint(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Cost:</label>
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Number of Hours:</label>
          <input
            type="number"
            value={numOfHours}
            onChange={(e) => setNumOfHours(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <button onClick={onClose}>Close</button>
    </Modal>
  );
};

export default CompleteDetailesModal;
