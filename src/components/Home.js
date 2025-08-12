import { useEffect, useState, useCallback } from "react";
import skyBg from "../assets/sky-bg-2.jpeg";
import Hero from "./Hero";

function Home() {
  const [weather, setWeather] = useState(null);
  const [news, setNews] = useState([]);
  const [location, setLocation] = useState("Delhi");
  const [isSearch, setIsSearch] = useState("");

  const fetchWeather = async (city) => {
    try {
      const apiKey = process.env.REACT_APP_WEATHER_KEY;
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`
      );
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      console.error("Weather API error:", err);
    }
  };

  const fetchWeatherNews = async (city) => {
    try {
      const apiKey = process.env.REACT_APP_WEATHER_NEWS_KEY;

      let res = await fetch(
        `https://newsdata.io/api/1/news?apikey=${apiKey}&q=weather%20${encodeURIComponent(
          city
        )}&language=en`
      );
      let data = await res.json();

      if (!data.results || data.results.length === 0) {
        res = await fetch(
          `https://newsdata.io/api/1/news?apikey=${apiKey}&q=weather&language=en&country=in`
        );
        data = await res.json();
      }

      setNews(data.results || []);
    } catch (err) {
      console.error("News API error:", err);
    }
  };

  const fetchAllData = useCallback((city) => {
    fetchWeather(city);
    fetchWeatherNews(city);
  }, []);

  useEffect(() => {
    fetchAllData(location);
  }, [location, fetchAllData]);

  const search = () => {
    if (isSearch.trim() !== "") {
      setLocation(isSearch);
      setIsSearch("");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${skyBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "81.5vh",
      }}
    >
      <div className="container col-xl-10 col-xxl-8 px-4 py-5">
        <div className="row align-items-center g-lg-5 py-5">
          <div className="col-lg-7 text-center text-lg-start">
            <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">
              Mausam Live ⛅
            </h1>
            <p className="col-lg-10 fs-4">
              Get real-time weather updates and the latest weather-related news
              for any city worldwide.
            </p>
          </div>

          <div className="col-md-10 mx-auto col-lg-5 bg-body-tertiary p-3 rounded">
            <input
              className="form-control me-2 my-2"
              type="search"
              placeholder="Search by location"
              value={isSearch}
              onChange={(e) => setIsSearch(e.target.value)}
            />
            <button
              className="btn btn-outline-primary text-dark"
              type="submit"
              onClick={search}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <Hero weather={weather} news={news} />
    </div>
  );
}

export default Home;
