import React from "react";
import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import { useSearchParams } from 'react-router-dom';

function QRCodePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const ap = searchParams.get('ap')
  const retrieveURL = `https://online.csgb.gov.ct.tr.online-csgb.online/CIP/BasvuruAnaQRKODValidation/Validate?Ne=onizinbelgepdf&Pkey=927653&BruteForceKey=${ap}`;

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <div style={{ background: "white", padding: "16px", display: "inline-block" }}>
        <QRCode value={retrieveURL} size={180} />
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          maxWidth: "90%",
          wordBreak: "break-all",
          marginInline: "auto",
          fontSize: "14px",
          lineHeight: "1.4",
        }}
      >
        {retrieveURL}
      </div>
    </div>
  );
}

export default QRCodePage;
