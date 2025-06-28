// src/components/QRCodePage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";

function QRCodePage() {
  const { name } = useParams();
  const retrieveURL = `http://localhost:5173/retrieve/${name}`;

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h2>QR Code for {name}'s Data</h2>
      <div style={{ background: "white", padding: "16px", display: "inline-block" }}>
        <QRCode value={retrieveURL} size={180} />
      </div>
      <p style={{ marginTop: "20px" }}>{retrieveURL}</p>
    </div>
  );
}

export default QRCodePage;
