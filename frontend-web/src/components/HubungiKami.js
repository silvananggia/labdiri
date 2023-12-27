// ** React Imports
import React, { useRef, useEffect, useState, Fragment } from "react";
import { Row, Col, Button , Breadcrumb, BreadcrumbItem} from "reactstrap";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2lsdmFuYW5nZ2lhIiwiYSI6ImNqeHRwMDR3bjBmYXozY3Fsd2g5cnJydzAifQ.YMEsC2qLti_Ibbo7fPsryQ";

function Hubungikami() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null); // Add a marker reference
  const [lng, setLng] = useState(106.8219);
  const [lat, setLat] = useState(-6.1845);
  const [zoom, setZoom] = useState(17);

  useEffect(() => {
    if (map.current) return; // Initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    // Create a new marker
    marker.current = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map.current);
  }, [lng, lat, zoom]);

  return (
    <Fragment>
            <div className="breadcrumb">
        <div className="wrapper">
          <Breadcrumb>
            <BreadcrumbItem>
              <a href="/">Beranda</a>
            </BreadcrumbItem>
            <BreadcrumbItem active>Hubungi Kami</BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>
      <section className="hubungikami">
        <div className="container">
          <div>
            <h2 className="titleLeft">Hubungi Kami</h2>
          </div>
          <div className="wrapper">
            <Row>
              <Col sm="6">
                <h3>
                  Direktorat Pengelolaan Laboratorium, Fasilitas Riset dan
                  Kawasan Sains Teknologi
                </h3>
                <p>
                  Deputi Bidang Infrastruktur Riset dan Inovasi, Badan Riset dan
                  Inovasi Nasional
                </p>
                <p>
                  Alamat: Gedung B.J. Habibie, Jl. M.H. Thamrin No. 8, Jakarta
                  Pusat 10340
                </p>
                <p>Whatsapp: +62811-1064-762</p>
                <p>Email: dit-plfrkst@brin.go.id</p>
                <br />
                <h3>Lokasi Kami</h3>

                <div ref={mapContainer} className="map-container" />
              </Col>
              <Col sm="6">
                <div className="hubungikamiForm">
                 
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default Hubungikami;
