// src/App.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataForm from "./components/DataForm.jsx";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [queryName, setQueryName] = useState("");
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  const fetchData = async () => {
    const res = await fetch(`${BACKEND_URL}/api/data`);
    const json = await res.json();
    setData(json);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRedirect = (e) => {
    e.preventDefault();
    if (queryName.trim()) {
      navigate(`/CIP/BasvuruAnaQRKODValidation/Validate?Ne=onizinbelgepdf&Pkey=927653&BruteForceKey=${queryName.trim()}`);
    }
  };

  const handleGenerateQR = async (e) => {
    e.preventDefault();
    const name = queryName.trim();
    if (!name) return;

    try {
      const res = await fetch(`${BACKEND_URL}/api/data/${name}`);
      const json = await res.json();

      if (json?.data?.length > 0) {
        navigate(`/generate/${name}`);
      } else {
        alert(`No data found for "${name}". QR code will not be generated.`);
      }
    } catch (err) {
      console.error("Error checking data before QR:", err);
      alert("An error occurred while checking for data.");
    }
  };

  return (
    <div className="App">
      <h1>Data Entry System</h1>

      {/* Data Entry Form */}
      <DataForm 
  onAdd={fetchData} 
  onSuccess={() => alert("✅ Data added successfully!")} 
/>


      {/* Search and QR Code */}
      <form style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Enter Application to retrieve"
          value={queryName}
          onChange={(e) => setQueryName(e.target.value)}
          required
        />
        <div style={{ marginTop: "10px" }}>
          <button onClick={handleRedirect} style={{ marginRight: "10px" }}>
            Search
          </button>
          <button onClick={handleGenerateQR}>Generate QR</button>
        </div>
      </form>
    </div>
  );
}

export default App;
