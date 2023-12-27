import React from "react";
import { Link } from "react-router-dom";
import { Col, Row, NavLink } from "reactstrap";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="wrapper">
        <Row>
          <Col>
            <div className="title">
              Direktorat Pengelolaan Laboratorium, Fasilitas Riset dan Kawasan
              Sains Teknologi
            </div>
            <br/>
            <p className="subTitle">Deputi Bidang Infrastruktur Riset dan Inovasi, Badan Riset dan Inovasi Nasional</p>
           
            <p className="subTitle">Alamat: Gedung B.J. Habibie, Jl. M.H.
Thamrin No. 8,
<br/>
Jakarta Pusat 10340
<br/>
Whatsapp: +62811-1064-762
<br/>
Email: dit-plfrkst@brin.go.id</p>
          </Col>
          <Col>
            <div className="title">Link Terkait</div>
            <br/>
            <NavLink href="https://brin.go.id" target="_blank" rel="noopener noreferrer" className="subTitle">
              BRIN
            </NavLink>
            <NavLink href="https://elsa.brin.go.id" target="_blank" rel="noopener noreferrer" className="subTitle" >
            ELSA BRIN
            </NavLink>
          </Col>
        </Row>
      </div>
      <div className="bottom">
        <p className="smText">Copyright © 2023 BRIN</p>
      </div>
    </footer>
  );
};

export default Footer;
