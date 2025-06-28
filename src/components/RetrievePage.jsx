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
          setData(json.data[0]);
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
    <nav className="nav-bar">
      <img src="/logodata.jpg" width={"90px"}/>
      <h2 className="CBP">CBP</h2>
    </nav>
    <p className="qr-para">QR Code Validation</p>
  <div className="profile-layout">
    <h2 className="info-title">Information</h2>
    <div className="image-container">
      <img src={data.image} alt="Uploaded" className="profile-img" />
    </div>

    <div className="info-grid">
      <div><span>Application No:</span> <strong>{data.applicationNo}</strong></div>
      <div><span>Application Type:</span> <strong>{data.applicationType}</strong></div>
      <div><span>Employee (worker) Name Surname:</span> <strong>{data.Name}</strong></div>
      <div><span>Employee (worker) Passport No:</span> <strong>{data.passportNo}</strong></div>
      <div><span>Employee (worker) TR Identity Number:</span> <strong>{data.TRidentityNumber}</strong></div>
      <div><span>Employee (worker) Mother's Name:</span> <strong>{data.MothersName}</strong></div>
      <div style={{marginBottom:"40px"}}><span>Employee (worker) Father's Name:</span> <strong>{data.fathersName}</strong></div>
      
      <div><span>Document Validity Start Date:</span> <strong>{data.documentValidityStartDate}</strong></div>
      <div><span>Document Validity End Date:</span> <strong>{data.documentValidityEndDate}</strong></div>
      <div><span>Approval Status:</span> <strong>{data.approvalStatus ? "Yes" : "No"}</strong></div>
      <div><span>Approval Date:</span> <strong>{data.approvalDate}</strong></div>
    </div>
  </div>
</div>
  );
}

export default RetrievePage;
