import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./RetrievePage.css";
import { useTranslation } from 'react-i18next';

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
    <div style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      margin: 0,
      padding: 0,
      fontSize: '14px',
      fontWeight: 300,
      fontFamily: 'Poppins',
      lineHeight: '19.5px',
      color: 'rgb(33, 37, 41)',
      backgroundColor: '#fff',
    }}>
      <div>
        <div style={{ display: 'flex', flexWrap: 'wrap', marginRight: '-15px', marginLeft: '-15px' }}>

          {/* Centered Logos */}
          <div style={{ width: '100%', paddingRight: '15px', paddingLeft: '15px', textAlign: 'center' }}>
            <p>
              <img align="middle" width="100" height="100" src="/logodata.jpg" />
            </p>
            <p>
              <img align="middle" src="/logo_default_dark.png" />
            </p>
          </div>

          {/* Content */}
          <div style={{ width: '100%', padding: '0 15px' }}>
            <div style={{
              boxShadow: 'rgba(69, 65, 78, 0.08) 0px 1px 15px 1px',
              backgroundColor: '#fff',
              marginBottom: '28.6px',
            }}>
              <div style={{
                borderBottom: '1px solid rgb(235, 237, 242)',
                display: 'flex',
                justifyContent: 'space-between',
                paddingLeft: '10px',
                height: '66.2969px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <h3 style={{
                    color: 'rgb(87, 89, 98)',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '15px',
                    fontWeight: 500,
                    fontFamily: 'Roboto,sans-serif',
                    margin: 0
                  }}>
                    Kare Kod Validasyonu (QR Code Validation)
                  </h3>
                </div>
              </div>

              <div style={{ color: 'rgb(17, 6, 6)', padding: '10px', fontSize:"13px"}}>
                <h2 style={{
                  color: 'rgb(52, 191, 163)',
                  fontSize: '28px',
                  marginBottom: '6.5px',
                  fontFamily: 'Poppins',
                  fontWeight: 500
                }}>
                  Bilgiler
                </h2>

                <table style={{ borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr>
                      <td></td>
                      <td>
                        <img
                          width="90"
                          height="120"
                          style={{ imageOrientation: 'from-image' }}
                          src={data.image}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>

                Başvuru No: <b>{data.applicationNo}</b><br />
                Başvuru Tipi: <b>Ön İzin Başvurusu</b><br />
                Çalışan (İşçi) Ad Soyad: <b>{data.Name}</b><br />
                Çalışan (İşçi) Pasaport No: <b>{data.passportNo}</b><br />
                Çalışan (İşçi) TC Kimlik No: <b>{data.TRidentityNumber}</b><br />
                Çalışan(İşçi) Anne Adı: <b>{data.MothersName}</b><br />
                Çalışan(İşçi) Baba Adı: <b>{data.fathersName}</b><br /><br />
                Belge Geçerlilik Başlangıç Tarihi: <b>{data.documentValidityStartDate}</b><br />
                Belge Geçerlilik Bitiş Tarihi: <b>{data.documentValidityEndDate}</b><br />
                Onay Durumu: <b>{data.approvalStatus ? 'Evet' : 'Hayır'}</b><br />
                Onay Tarihi: <b>{data.approvalDate}</b><br />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RetrievePage;
