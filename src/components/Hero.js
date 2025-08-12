import { useState } from "react";
import skyBg from "../assets/sky-bg-2.jpeg";
import "../styles/Hero.css";

function Hero({ weather, news }) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(news.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const currentNews = news.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="container-fluid bg-secondary" id="hanging-icons">
      <div className="hero-heading-container">
        <h2 className="hero-heading">See Live Weather & News</h2>
      </div>

      <div
        className="row g-4 py-5 row-cols-1 row-cols-lg-3 mb-4 justify-content-center"
        style={{
          backgroundImage: `url(${skyBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="col d-flex justify-content-center align-items-start w-100">
          <div
            className="card shadow-lg p-4 weather-card"
            style={{
              width: "90%",
              maxWidth: "900px",
              borderRadius: "20px",
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              color: "#1d2832",
              boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
              border: "2px solid rgba(133, 131, 130, 1)",
            }}
          >
            {weather && weather.main ? (
              <>
                <h3
                  className="text-center mb-3"
                  style={{
                    fontWeight: "bold",
                    letterSpacing: "1px",
                    fontSize: "1.8rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  📍 {weather.name}, {weather.sys.country}
                </h3>
                <p
                  className="text-center mb-4"
                  style={{ fontSize: "0.9rem", opacity: 0.85 }}
                >
                  {/* {weather.coord.lat}°, {weather.coord.lon}° */}
                </p>

                <div
                  className="d-flex flex-column flex-md-row align-items-center justify-content-around"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    background: "rgba(50, 50, 50, 0.2)",
                    backdropFilter: "blur(8px)",

                    padding: "20px",
                    borderRadius: "15px",
                    marginBottom: "20px",
                    border: "2px solid rgba(133, 131, 130, 1)",
                  }}
                >
                  <div className="text-center text-md-start">
                    <h2
                      style={{
                        fontSize: "3.5rem",
                        fontWeight: "bold",
                        margin: 0,
                      }}
                    >
                      {weather.main.temp}°C
                    </h2>
                    <p style={{ fontSize: "1.2rem", margin: 0 }}>
                      {weather.weather[0].main}
                    </p>
                    <small style={{ opacity: 1.0 }}>
                      Feels like {weather.main.feels_like}°C
                    </small>
                  </div>
                  <img
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                    alt={weather.weather[0].description}
                    style={{
                      width: "120px",
                      filter: "brightness(1.2) saturate(1.2)",
                    }}
                    className="mt-3 mt-md-0"
                  />
                </div>

                {/* Weather Info Grid */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                    gap: "12px",
                  }}
                >
                  {[
                    {
                      label: "Humidity",
                      value: `${weather.main.humidity}%`,
                      icon: "💧",
                    },
                    {
                      label: "Min Temp",
                      value: `${weather.main.temp_min}°C`,
                      icon: "📉",
                    },
                    {
                      label: "Max Temp",
                      value: `${weather.main.temp_max}°C`,
                      icon: "📈",
                    },
                    {
                      label: "Pressure",
                      value: `${weather.main.pressure} hPa`,
                      icon: "🌡️",
                    },
                    {
                      label: "Clouds",
                      value: `${weather.clouds.all}%`,
                      icon: "☁️",
                    },
                    {
                      label: "Wind",
                      value: `${weather.wind.speed} m/s`,
                      icon: "💨",
                    },
                    weather.wind.deg && {
                      label: "Direction",
                      value: `${weather.wind.deg}°`,
                      icon: "🧭",
                    },
                    {
                      label: "Visibility",
                      value: `${weather.visibility / 1000} km`,
                      icon: "👁️",
                    },
                    {
                      label: "Sunrise",
                      value: new Date(
                        weather.sys.sunrise * 1000
                      ).toLocaleTimeString(),
                      icon: "🌅",
                    },
                    {
                      label: "Sunset",
                      value: new Date(
                        weather.sys.sunset * 1000
                      ).toLocaleTimeString(),
                      icon: "🌇",
                    },
                  ]
                    .filter(Boolean)
                    .map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          background: "rgba(255,255,255,0.1)",
                          padding: "10px",
                          borderRadius: "10px",
                          border: "2px solid rgba(133, 131, 130, 1)",
                          textAlign: "center",
                          transition: "transform 0.2s ease",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.transform = "scale(1.05)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.transform = "scale(1)")
                        }
                      >
                        <div style={{ fontSize: "1.5rem" }}>{item.icon}</div>
                        <strong
                          style={{
                            fontSize: "0.95rem",
                            color: "rgba( 90, 88, 87, 1)",
                          }}
                        >
                          {item.label}
                        </strong>
                        <div
                          style={{
                            fontSize: "1rem",
                            fontWeight: "500",
                            color: "rgba( 90, 88, 87, 1)",
                          }}
                        >
                          {item.value}
                        </div>
                      </div>
                    ))}
                </div>
              </>
            ) : (
              <p className="text-center">Loading weather...</p>
            )}
          </div>
        </div>
      </div>
      <div
        className="row g-4 py-5 row-cols-1 row-cols-lg-3 mb-4 justify-content-center"
        style={{
          backgroundImage: `url(${skyBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="col d-flex align-items-start w-100">
          <div className="w-100 ">
            <h3 className="fs-2 text-body-emphasis">Weather News</h3>

            {/* Grid Layout */}
            <div className="mt-3 row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4 justify-content-center ">
              {currentNews.length > 0 ? (
                currentNews.map((item, idx) => (
                  <div key={idx} className="col">
                    <div className="card h-100 shadow-sm">
                      {/* Image */}
                      {item.image_url && (
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="card-img-top"
                          style={{
                            height: "150px",
                            objectFit: "cover",
                          }}
                        />
                      )}

                      {/* Card Body */}
                      <div className="card-body d-flex flex-column">
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="card-title h6 mb-2 text-decoration-none"
                          style={{ fontWeight: "bold" }}
                        >
                          {item.title.length > 60
                            ? item.title.slice(0, 57) + "..."
                            : item.title}
                        </a>

                        {item.description && (
                          <p
                            className="card-text text-muted flex-grow-1"
                            style={{
                              fontSize: "0.9rem",
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {item.description}
                          </p>
                        )}

                        {/* Date & Source */}
                        <small className="text-secondary mt-auto">
                          {item.pubDate
                            ? `Published: ${new Date(
                                item.pubDate
                              ).toLocaleDateString()}`
                            : ""}
                          {item.source_id ? ` | ${item.source_id}` : ""}
                        </small>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No news found for this location.</p>
              )}
            </div>

            {/* Pagination Buttons */}
            {news.length > itemsPerPage && (
              <div className="d-flex justify-content-between mt-3 mx-5">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 0}
                  className="btn btn-secondary btn-lg"
                >
                  Prev
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages - 1}
                  className="btn btn-secondary btn-lg"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
