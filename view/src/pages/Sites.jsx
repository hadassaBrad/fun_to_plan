import React from "react";
import Site from '../components/SiteCard'

import { useState } from "react";
function Sites() {

   // const sites = [{ id: 5, name: "first", url: "https://www.google.com/imgres?q=SEA&imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fa%2Fa7%2FAtlantic_near_Faroe_Islands.jpg&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FSea&docid=PEBjMp743j0etM&tbnid=3tKGS1mhc5tzoM&vet=12ahUKEwjslJTR2qmGAxVsSEEAHSRgA5AQM3oECBoQAA..i&w=4385&h=2900&hcb=2&ved=2ahUKEwjslJTR2qmGAxVsSEEAHSRgA5AQM3oECBoQAA" },
   const [filters, setFilters] = useState({
    filter1: false,
    filter2: false,
    filter3: false,
    filter4: false,
    filter5: false
  });
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFilters({
      ...filters,
      [name]: checked
    });
  };
//   const filteredSites = sites.filter(site => {
//     // Apply your filtering logic based on filters state
//     return true; // Modify this to match your filtering criteria
//   });
    return (
        <div>
        <Header />
        <div className="filters">
          <label>
            <input
              type="checkbox"
              name="filter1"
              checked={filters.filter1}
              onChange={handleCheckboxChange}
            />
            Filter 1
          </label>
          <label>
            <input
              type="checkbox"
              name="filter2"
              checked={filters.filter2}
              onChange={handleCheckboxChange}
            />
            Filter 2
          </label>
          <label>
            <input
              type="checkbox"
              name="filter3"
              checked={filters.filter3}
              onChange={handleCheckboxChange}
            />
            Filter 3
          </label>
          <label>
            <input
              type="checkbox"
              name="filter4"
              checked={filters.filter4}
              onChange={handleCheckboxChange}
            />
            Filter 4
          </label>
          <label>
            <input
              type="checkbox"
              name="filter5"
              checked={filters.filter5}
              onChange={handleCheckboxChange}
            />
            Filter 5
          </label>
        </div>
        <div className="sites-list">
          {filteredSites.map(site => (
            <SiteCard key={site.id} site={site} />
          ))}
        </div>
        <button className="plan-route-button">
          קבל תכנון מסלול
        </button>
      </div>
    );
}
export default Sites;