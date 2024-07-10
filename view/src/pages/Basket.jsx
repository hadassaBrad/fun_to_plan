import React, { useContext, useState, useEffect } from 'react';
import config from '../config.js';
import { UserContext } from '../App.jsx';
import BasketCard from '../components/BasketCard.jsx';
import CompleteDetailesModal from '../components/CompleteDetailesModal.jsx';
import '../css/basket.css'; // ייבוא קובץ ה-CSS

function Basket() {
  const { user, setShowLogin, showLogin } = useContext(UserContext);
  const [sites, setSites] = useState([]);
  const [renderPage, setRenderPage] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (user) {
        try {
          const data = await config.getData('basket', null, null, null, null, null, user.id); // Example fetch function, adjust as needed
          setSites(data);
          if (data.length > 0) localStorage.setItem('basket', JSON.stringify(data));
        } catch (error) {
          console.error('Error fetching data from DB:', error);
        }
      } else {
        const currentSites = JSON.parse(localStorage.getItem('basket'));
        setSites(currentSites || []);
      }
    }

    fetchData();
  }, [user, renderPage]);

  const openModal = () => {
    if (!user) {
      setShowLogin(true);
      console.log(user);
    }
    if (showLogin == false && user) {
      setIsModalOpen(true);

    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  function renderSites() {
    setRenderPage(!renderPage);
  }

  return (
    <div className="basket-container">
      {sites.length > 0 ? (
        <>
          {sites.map((site) => (
            <BasketCard key={site.id} site={site} renderSites={renderSites} className="basket-card" />
          ))}
          <button className="plan-route-button" onClick={openModal}>
            קבל תכנון מסלול
          </button>
          <CompleteDetailesModal isOpen={isModalOpen} onClose={closeModal} />
        </>
      ) : (
        <>
          <p>No items in the basket</p>
          <br />
          <p>When you will add sites to the basket, we'll be able to build you a trip route...</p>
        </>
      )}
    </div>
  );
}

export default Basket;
