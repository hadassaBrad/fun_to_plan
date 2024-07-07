import React, { useState, useEffect, useContext } from "react";
import SiteCard from '../components/SiteCard';
import Header from "../components/Header.jsx";
import { UserContext } from '../App.jsx';
import Filter from "../components/Filter.jsx";
import config from '../config';
// import "../css/sites.css"
const Sites = () => {
  const [sites, setSites] = useState([]);
  const [areas, setAreas] = useState([]);
  const [difficulty, setDifficulty] = useState([]);
  const [ages, setAges] = useState([]);
  const [begin, setBegin] = useState(0);
  const limit = 10;

  const [filters, setFilters] = useState({
    area: '',
    difficulty: '',
    age: ''
  });

  // Fetch filter options
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const [areasData, difficultyData, agesData] = await Promise.all([
          config.getData('area'),
          config.getData('difficulty'),
          config.getData('age')
        ]);
        setAreas(areasData);
        setDifficulty(difficultyData);
        setAges(agesData);
        console.log("areasData:")
        console.log(areasData)
        console.log(" difficultyData: ");
        console.log(difficultyData)
        console.log(" agesData:");
        console.log(agesData)
      } catch (error) {
        console.error("Error fetching filter options:", error);
      }
    };

    fetchFilterOptions();
  }, []);

  const fetchSites = async () => {
    try {
      const { area, difficulty, age } = filters;
      const searchKey = ['area', 'difficulty', 'age'];
      const searchValue = [area, difficulty, age];
      const data = await config.getData('sites', searchKey, searchValue, begin, limit);
      if (begin === 0) {
        setSites(data);
      } else {
        setSites(sites => [...sites, ...data]);
      }
    } catch (error) {
      console.error("Error fetching sites:", error);
    }
  };

  useEffect(() => {
    fetchSites();
  }, [filters, begin]);

  const handleMoreSitesBtn = async () => {
    setBegin(begin + limit);
  };

  return (
    <div className="sites-page">
      <div className="sites">
        {sites.map((site) => (
          <SiteCard key={site.id} site={site} />
        ))}
        <button onClick={handleMoreSitesBtn}>Load More Sites</button>
      </div>
      <div className="filters">
        <Filter
          title="Area"
          options={areas.map(area => area.name_area)} // מפה לקבל רצף של שמות
          selected={filters.area}
          onChange={(value) => setFilters({ ...filters, area: value })}
        />
        <Filter
          title="Difficulty"
          options={difficulty.map(level=> level.level )}
          selected={filters.difficulty}
          onChange={(value) => setFilters({ ...filters, difficulty: value })}
        />
        <Filter
          title="Age"
          options={ages.map(age=>age.age_range)}
          selected={filters.age}
          onChange={(value) => setFilters({ ...filters, age: value })}
        />
      </div>

    </div>
  );
};

export default Sites;