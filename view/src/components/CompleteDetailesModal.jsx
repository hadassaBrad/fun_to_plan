import React, { useState, useContext, useEffect } from 'react';
import Modal from 'react-modal';
import '../css/completeDetails.css';
import config from '../config'
import { UserContext } from '../App';

Modal.setAppElement('#root'); // Set the app element to avoid screen reader issues

function CompleteDetailesModal({ isOpen, onClose }) {
  const [startPoint, setStartPoint] = useState('');
  const [cost, setCost] = useState('');
  const [numOfHours, setNumOfHours] = useState('');
  const { user, setUser, showLogin, setShowLogin } = useContext(UserContext);


  // useEffect(() => {
  //   async function fetchData() {
  //     if (!user) {// need to show login!!
  //       setShowLogin(true);
  //     }
  //   }
  //   fetchData();
  // }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {// need to show login!!
      setShowLogin(true);
    }
    if (!startPoint || !cost || !numOfHours) {
      alert('All fields are required!');
      return;
    }
    // Handle form submission logic here
    alert(`Start Point: ${startPoint}, Cost: ${cost}, Number of Hours: ${numOfHours}`);

    const sites = localStorage.getItem("basket");
    const body = {
      sites: sites,
      startPoint: startPoint,
      cost: cost,
      numOfHours: numOfHours
    }
    const response = await config.postData("trips", body);
    onClose(); // Close the modal after submission
  };
  const handleSclose = (e) => {
    onClose();
  }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal"
      overlayClassName="overlay"
    >
      <button onClick={handleSclose} className="close-button">X</button>
      <h2 className="title">Fill in the details</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-field">
          <label>Start Point:</label>
          <input
            type="text"
            value={startPoint}
            onChange={(e) => setStartPoint(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className="form-field">
          <label>Cost:</label>
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className="form-field">
          <label>Number of Hours:</label>
          <input
            type="number"
            value={numOfHours}
            onChange={(e) => setNumOfHours(e.target.value)}
            required
            className="input"
          />
        </div>
        <button type="submit" className="button">Submit</button>
      </form>
    </Modal>
  );
};

export default CompleteDetailesModal;
