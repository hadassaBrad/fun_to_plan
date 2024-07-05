import React, { useState, useContext, useEffect } from 'react';
import Modal from 'react-modal';
import { useNavigate } from "react-router-dom";
import '../css/completeDetails.css';
import config from '../config'
import { UserContext } from '../App';

Modal.setAppElement('#root'); // Set the app element to avoid screen reader issues

function CompleteDetailesModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  const [startPoint, setStartPoint] = useState('');
  const [cost, setCost] = useState('');
  const [numOfHours, setNumOfHours] = useState('');
  const [wantsGuide, setWantsGuide] = useState(false);
  const [dateForTrip, setDateForTrip] = useState(null);
  const [completeDetailesError, setCompleteDetailesError] = useState('');

  const { user, setUser, showLogin, setShowLogin } = useContext(UserContext);
  const [minDate, setMinDate] = useState('');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setMinDate(today);
  }, []);

  const handleSubmit = async (e) => {


    e.preventDefault();
    setCompleteDetailesError('');
    if (!user) {// need to show login!!
      setShowLogin(true);
    }
    if (!startPoint || !cost || !numOfHours) {
      // alert('All fields are required!');
      // alert('All fields are required!');
      setCompleteDetailesError('All fields are required!')
      return;
    }
    if (wantsGuide && dateForTrip == null) {
      setCompleteDetailesError('If you want a guide, you must enter date of trip');
      // alert('If you want a guide, you must enter date of trip');
      return;
    }
    // Handle form submission logic here
    alert(`Start Point: ${startPoint}, Cost: ${cost}, Number of Hours: ${numOfHours}, wants guide: ${wantsGuide}`);

    const body = {
      userId: user.id,
      wantsGuide: wantsGuide,
      startPoint: startPoint,
      cost: cost,
      numOfHours: numOfHours,
      dateForTrip: dateForTrip
    }
    try {
      const response = await config.postData("trips", body);
      localStorage.removeItem("basket");
      console.log("response");
      console.log(response);
      onClose(); // Close the modal after submission
      navigate('/home/tripRoute', { state: { route: response.data } });
    }
    catch (err) {
      console.log(err.message);
      setCompleteDetailesError(err.message)
    }

  };
  const handleSclose = (e) => {
    onClose();
  }
  const changeHandler = (event) => {
    const { name, checked } = event.target;
    setWantsGuide(checked);
  };

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
        <label>Do you want a guide to guide on you trip?</label>
        <input
          id="guide"
          type="checkbox"
          name="confirmguide"
          checked={wantsGuide}
          onChange={changeHandler}
          className="input confirm-guide-sign"
        />
        <br />
        {wantsGuide &&
          <div>
            <label for="date">Select date for trip:</label>
            <input type="date" min={minDate} id="birthday" name="date" value={dateForTrip}></input>
            <input type="date" min={minDate} id="birthday" name="date" value={dateForTrip}
              onChange={(e) => setDateForTrip(e.target.value)}
            ></input>
          </div>
        }


        <button type="submit" className="button">Submit</button>
        {completeDetailesError && <p className='error' style={{color:'red'}} >{completeDetailesError}</p>}



      </form>
    </Modal>
  );
};

export default CompleteDetailesModal;