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
    <body style={{
  cursor: 'auto',
  display: 'flex',
  WebkitBoxOrient: 'vertical',
  WebkitBoxDirection: 'normal',
  flexDirection: 'column',
  height: '569px',
  margin: '0px',
  padding: '0px',
  fontSize: '13px',
  fontWeight: 300,
  fontFamily: 'Poppins',
  WebkitFontSmoothing: 'antialiased',
  lineHeight: '19.5px',
  color: 'rgb(33, 37, 41)',
  textAlign: 'left',
  backgroundColor: 'rgb(255, 255, 255)',
  boxSizing: 'border-box'
}}>

  <div style={{ boxSizing: 'border-box' }}>
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      marginRight: '-15px',
      marginLeft: '-15px',
      boxSizing: 'border-box'
    }}>

      <div style={{
        WebkitBoxFlex: 0,
        flex: '0 0 100%',
        maxWidth: '100%',
        position: 'relative',
        width: '100%',
        minHeight: '1px',
        paddingRight: '15px',
        paddingLeft: '15px',
        boxSizing: 'border-box'
      }}>

        <p align="center" style={{
          marginTop: '0px',
          marginBottom: '13px',
          boxSizing: 'border-box'
        }}>
          <img align="middle" width="100" height="100" src="/logodata.jpg" style={{
            verticalAlign: 'middle',
            borderStyle: 'none',
            boxSizing: 'border-box'
          }} />
        </p>
        <p align="center" style={{
          marginTop: '0px',
          marginBottom: '13px',
          boxSizing: 'border-box'
        }}>
          <img align="middle" src="/logo_default_dark.png" style={{
            verticalAlign: 'middle',
            borderStyle: 'none',
            boxSizing: 'border-box'
          }} />
        </p>
      </div>

      <div style={{
        WebkitBoxFlex: 0,
        flex: '0 0 100%',
        maxWidth: '100%',
        position: 'relative',
        width: '100%',
        minHeight: '1px',
        paddingRight: '15px',
        paddingLeft: '15px',
        boxSizing: 'border-box',
        textAlign: 'left'
      }}>
        <div style={{
          boxShadow: 'rgba(69, 65, 78, 0.08) 0px 1px 15px 1px',
          backgroundColor: 'rgb(255, 255, 255)',
          marginBottom: '28.6px',
          boxSizing: 'border-box'
        }}>
          <div style={{
            borderBottom: '1px solid rgb(235, 237, 242)',
            display: 'flex',
            WebkitBoxOrient: 'horizontal',
            WebkitBoxDirection: 'normal',
            flexDirection: 'row',
            WebkitBoxAlign: 'stretch',
            alignItems: 'stretch',
            WebkitBoxPack: 'justify',
            justifyContent: 'space-between',
            padding: '0px 28.6px',
            height: '66.2969px',
            position: 'relative',
            boxSizing: 'border-box'
          }}>
            <div style={{
              display: 'flex',
              WebkitBoxAlign: 'center',
              alignItems: 'center',
              alignContent: 'flex-start',
              boxSizing: 'border-box'
            }}>
              <div style={{
                display: 'flex',
                WebkitBoxAlign: 'center',
                alignItems: 'center',
                boxSizing: 'border-box'
              }}>
                <h3 style={{
                  color: 'rgb(87, 89, 98)',
                  display: 'flex',
                  WebkitBoxAlign: 'center',
                  alignItems: 'center',
                  fontSize: '16.9px',
                  fontWeight: 500,
                  fontFamily: 'Roboto,sans-serif',
                  margin: '0px',
                  padding: '0px',
                  marginBottom: '0px',
                  lineHeight: '20.28px',
                  marginTop: '0px',
                  boxSizing: 'border-box'
                }}>
                  Kare Kod Validasyonu (QR Code Validation)
                </h3>
              </div>
            </div>
          </div>
          <div style={{
            color: 'rgb(17, 6, 6)',
            padding: '28.6px',
            boxSizing: 'border-box',
            textAlign: 'left'
          }}>

            <h2 style={{
              color: 'rgb(52, 191, 163)',
              fontSize: '26px',
              marginBottom: '6.5px',
              fontFamily: 'Poppins',
              fontWeight: 500,
              lineHeight: '31.2px',
              marginTop: '0px',
              boxSizing: 'border-box'
            }}>Bilgiler</h2>

            <table style={{
              borderCollapse: 'collapse',
              boxSizing: 'border-box'
            }}>
              <tbody style={{ boxSizing: 'border-box' }}>
                <tr style={{ boxSizing: 'border-box' }}>
                  <td style={{ boxSizing: 'border-box' }}></td>
                  <td style={{ boxSizing: 'border-box' }}>
                    <img width="90" height="120" style={{
                      imageOrientation: 'from-image',
                      verticalAlign: 'middle',
                      borderStyle: 'none',
                      boxSizing: 'border-box'
                    }} src={data.image} />
                  </td>
                </tr>
              </tbody>
            </table>

            Başvuru No:<b style={{ fontWeight: 700, boxSizing: 'border-box' }}>{data.applicationNo}</b><br />
            Başvuru Tipi:<b style={{ fontWeight: 700, boxSizing: 'border-box' }}>Ön İzin Başvurusu</b><br />
            Çalışan (İşçi) Ad Soyad:<b style={{ fontWeight: 700, boxSizing: 'border-box' }}>{data.Name}</b><br />
            Çalışan (İşçi) Pasaport No:<b style={{ fontWeight: 700, boxSizing: 'border-box' }}>{data.passportNo}</b><br />
            Çalışan (İşçi) TC Kimlik No:<b style={{ fontWeight: 700, boxSizing: 'border-box' }}></b><br />
            Çalışan(İşçi) Anne Adı:<b style={{ fontWeight: 700, boxSizing: 'border-box' }}> {data.MothersName}</b><br />
            Çalışan(İşçi) Baba Adı:<b style={{ fontWeight: 700, boxSizing: 'border-box' }}> {data.fathersName}</b><br /><br /><br />
            Belge Geçerlilik Başlangıç Tarihi:<b style={{ fontWeight: 700, boxSizing: 'border-box' }}>{data.documentValidityStartDate}</b><br />
            Belge Geçerlilik Bitiş Tarihi:<b style={{ fontWeight: 700, boxSizing: 'border-box' }}>{data.documentValidityEndDate}</b><br />
            Onay Durumu:<b style={{ fontWeight: 700, boxSizing: 'border-box' }}>Evet</b><br />
            Onay Tarihi:<b style={{ fontWeight: 700, boxSizing: 'border-box' }}>{data.approvalDate}</b><br />
          </div>
        </div>
      </div>

    </div>
  </div>
</body>

  );
}

export default RetrievePage;
