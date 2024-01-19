import React, { useEffect, useState } from "react";
import winterImage from "../Images/winter.jpg";
import summerImage from "../Images/summer.jpg";
function Weather() {
  const [coords, setCoords] = useState({ latitude: 0, longitude: 0 });
  const [hemisphere, setHemisphere] = useState("");
  //lazy initialization
  const [month, setMonth] = useState(() => new Date().getMonth() + 1);
  // const [month, setMonth] = useState(7)
  //
  useEffect(() => {
    getLocation();
  }, []);
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords);
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        getHemisphere(position.coords.latitude, position.coords.longitude);
      });
    } else {
      alert("Browser navigator isnt working");
    }
  }
  //
  function getHemisphere(lat, long) {
    // if value of latitude is > 0 ==> northern hemisphere
    // else if latitude is 0 it is equator
    // else latitude <0 it is southern hemisphere
    if (lat > 0) {
      setHemisphere("Northern Hemisphere");
    } else if (lat < 0) {
      setHemisphere("Southern Hemisphere");
    } else {
      setHemisphere("Equator");
    }
  }

  function formatMonth(month) {
    switch (month) {
      case 1:
        return "January";
      case 2:
        return "February";
      case 3:
        return "March";
      case 4:
        return "April";
      case 5:
        return "May";
      case 6:
        return "June";
      case 7:
        return "July";
      case 8:
        return "August";
      case 9:
        return "September";
      case 10:
        return "October";
      case 11:
        return "November";
      case 12:
        return "December";
      default:
        return "Invalid Month";
    }
  }
  return (
    <div className="weather_details">
      <p>Weather app</p>
      <button onClick={getLocation}>Get Location</button>
      <p>Latitude: {coords.latitude}</p>
      <p>Longitude: {coords.longitude}</p>
      <p>Hemisphere: {hemisphere}</p>
      <p>Month: {formatMonth(month)}</p>

      {/* conditions for winter */}
      {hemisphere &&
        ((hemisphere === "Northern Hemisphere" &&
          (month >= 11 || month <= 3)) ||
          (hemisphere === "Southern Hemisphere" &&
            month >= 4 &&
            month <= 9)) && (
          <div className="winter">
            <h1>
              <center>Winter</center>
            </h1>
            <img src={winterImage} alt="winter" />
          </div>
        )}
      {/* consition for summer */}
      {hemisphere &&
        hemisphere === "Northern Hemisphere" &&
        month >= 4 &&
        month <= 9 && (
          <div className="summer">
            <h1>
              <center>Summer</center>
            </h1>
            <img src={summerImage} alt="summer" />
          </div>
        )}
    </div>
  );
}

export default Weather;
