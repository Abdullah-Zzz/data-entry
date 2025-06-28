// src/components/RetrievePage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./RetrievePage.css";

function RetrievePage() {
  const { name } = useParams();
  const [data, setData] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/data/${name}`);
        const json = await res.json();

        if (json?.data?.length > 0) {
          setData(json.data[0]); // display first match
        } else {
          setNotFound(true);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setNotFound(true);
      }
    };

    fetchData();
  }, [name]);

  if (notFound) return <h2 style={{ textAlign: "center" }}>❌ No data found for "{name}"</h2>;

  if (!data) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div className="retrieve-page">
      <h2>Data for: {data.Name || name}</h2>
      <div className="data-card">
        {Object.entries(data).map(([key, value]) => {return key === "image" ? (
  <div className="data-row" key={key}>
    <strong>Image</strong><br />
    <img src={value} alt="Uploaded" style={{ maxWidth: "200px", borderRadius: "8px" }} />
  </div>
) : (
  <div className="data-row" key={key}>
    <strong>{key.replace(/([A-Z])/g, " $1")}</strong> {String(value)}
  </div>
)}
)}
      </div>
    </div>
  );
}

export default RetrievePage;
