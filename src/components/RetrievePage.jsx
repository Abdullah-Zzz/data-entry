import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./RetrievePage.css";
import { useTranslation } from 'react-i18next';


// Helper to get URL query parameters
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function RetrievePage() {
  const { t } = useTranslation();
  const query = useQuery();
  const name = query.get("BruteForceKey");
  const [data, setData] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; 

  useEffect(() => {
    if (!name) return setNotFound(true);

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
  if (notFound) return <h2 style={{ textAlign: "center" }}>{t(`❌ No data found for ${name}`)}</h2>;
  if (!data) return <p style={{ textAlign: "center" }}>{t("Loading...")}</p>;

  return (
    <div className="retrieve-page">
      <nav className="nav-bar">
        <img src="/logodata.jpg" width={"90px"} />
        <img src="/logo_default_dark.png" style={{ margin: "10px 0px 0px 8px" }} />
      </nav>
      <p className="qr-para">{t("QR Code Validation")} (QR Code Validation)</p>

      <div className="profile-layout">
        <h2 className="info-title">{t("Information")}</h2>

        <div className="image-container">
          <img src={data.image} alt="Uploaded" className="profile-img" />
        </div>

        <div className="info-grid">
          <div><span>{t("Application")} No:</span><strong>{data.applicationNo}</strong></div>
          <div><span>{t("Application Type")}:</span> <strong>{data.applicationType}</strong></div>
          <div><span>{t("Employee (worker) Name Surname")}:</span> <strong>{data.Name}</strong></div>
          <div><span>{t("Employee (worker) Passport")} No:</span> <strong>{data.passportNo}</strong></div>
          <div><span>{t("Employee (worker)")} TC Kimlik No:</span> <strong>{data.TRidentityNumber}</strong></div>
          <div><span>{t("Employee (worker) Mother's Name")}:</span> <strong>{data.MothersName}</strong></div>
          <div style={{ marginBottom: "40px" }}><span>{t("Employee (worker) Father's Name")}:</span> <strong>{data.fathersName}</strong></div>
          <div><span>{t("Document Validity Start Date")}:</span> <strong>{data.documentValidityStartDate}</strong></div>
          <div><span>{t("Document Validity End Date")}:</span> <strong>{data.documentValidityEndDate}</strong></div>
          <div><span>{t("Approval Status")}:</span> <strong>{data.approvalStatus ? "Yes" : "No"}</strong></div>
          <div><span>{t("Approval Date")}:</span> <strong>{data.approvalDate}</strong></div>
        </div>
      </div>
    </div>
  );
}

export default RetrievePage;
