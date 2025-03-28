import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const SosEmergency = () => {
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setPosition({ lat, lng });

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
            );
            const data = await response.json();
            setAddress(data.display_name);
          } catch (error) {
            console.error("Error fetching address:", error);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to retrieve location.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const sendLocation = () => {
    if (!position || !address || !phoneNumber) {
      alert("Please enter your mobile number and get your location first.");
      return;
    }

    const message = `SOS Emergency! 📍 My location: ${address} (Lat: ${position.lat}, Lng: ${position.lng})`;
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappURL, "_blank");
  };

  return (
    <div style={{ padding: "20px", textAlign: "center", maxWidth: "400px", margin: "auto", border: "1px solid #ccc", paddingBottom: "20px" }}>
      <h1>SOS Emergency</h1>
      <input
        type="text"
        placeholder="Enter Mobile Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        style={{ padding: "10px", marginBottom: "10px", width: "90%", textAlign: "center" }}
      />
      <br />
      <button
        onClick={getLocation}
        style={{ padding: "10px 20px", margin: "10px", backgroundColor: "#007bff", color: "#fff", border: "none", cursor: "pointer" }}
      >
        Get Current Location
      </button>
      {position && (
        <>
          <div style={{ height: "300px", width: "100%", margin: "10px auto" }}>
            <MapContainer center={[position.lat, position.lng]} zoom={13} style={{ height: "100%", width: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[position.lat, position.lng]}>
                <Popup>You are here</Popup>
              </Marker>
            </MapContainer>
          </div>
          <p>{address || "Fetching address..."}</p>
          <button
            onClick={sendLocation}
            style={{ padding: "10px 20px", margin: "10px", backgroundColor: "#28a745", color: "#fff", border: "none", cursor: "pointer" }}
          >
            SEND MY LIVE LOCATION 📩
          </button>
        </>
      )}
    </div>
  );
};

export default SosEmergency;
