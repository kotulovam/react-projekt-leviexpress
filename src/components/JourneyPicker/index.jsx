import React, { useEffect, useState } from 'react';
import './style.css';

const CityOptions = ({ cities }) => {
  return cities.map((city) => (
    <option value={city.code} key={city.code}>
      {city.name}
    </option>
  ));
};

const DatesOptions = ({ dates }) => {
  return dates.map((date) => (
    <option value={date.dateBasic} key={date.dateBasic}>
      {date.dateCs}
    </option>
  ));
};

export const JourneyPicker = ({ onJourneyChange }) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    const fetchSelectedOptions = async () => {
      const resp = await fetch(
        `https://apps.kodim.cz/daweb/leviexpress/api/journey?fromCity=${fromCity}&toCity=${toCity}&date=${date}`,
      );
      const respData = await resp.json();

      onJourneyChange(respData.results);
    };
    fetchSelectedOptions();
  };

  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState('');

  const [cities, setCities] = useState([]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      const cityResponse = await fetch(
        'https://apps.kodim.cz/daweb/leviexpress/api/cities',
      );
      const cityResponseData = await cityResponse.json();
      setCities(cityResponseData.results);
    };

    const fetchDates = async () => {
      const dateResponse = await fetch(
        'https://apps.kodim.cz/daweb/leviexpress/api/dates',
      );
      const dateResponseData = await dateResponse.json();
      setDates(dateResponseData.results);
    };
    fetchCities();
    fetchDates();
  }, []);

  return (
    <div className="journey-picker container">
      <h2 className="journey-picker__head">Kam chcete jet?</h2>
      <div className="journey-picker__body">
        <form onSubmit={handleSubmit} className="journey-picker__form">
          <label>
            <div className="journey-picker__label">Odkud:</div>
            <select
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
            >
              <option value="">Vyberte</option>
              <CityOptions cities={cities} />
            </select>
          </label>
          <label>
            <div className="journey-picker__label">Kam:</div>
            <select value={toCity} onChange={(e) => setToCity(e.target.value)}>
              <option value="">Vyberte</option>

              <CityOptions cities={cities} />
            </select>
          </label>
          <label>
            <div className="journey-picker__label">Datum:</div>
            <select value={date} onChange={(e) => setDate(e.target.value)}>
              <option value="">Vyberte</option>
              <DatesOptions dates={dates} />
            </select>
          </label>
          <div className="journey-picker__controls">
            <button
              disabled={!(fromCity && toCity && date)}
              className="btn"
              type="submit"
            >
              Vyhledat spoj
            </button>
          </div>
        </form>
        <img className="journey-picker__map" src="/map.svg" />
      </div>
    </div>
  );
};
