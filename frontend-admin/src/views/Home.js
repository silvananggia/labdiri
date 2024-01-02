import React, { useContext,useState, useEffect, useCallback } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { Edit, Plus, Trash2, Award, MapPin, Thermometer } from "react-feather";

// ** Custom Components
import Avatar from "@components/avatar";

import {
  Badge,
  Label,
  Input,
  Button,
  Row,
  Col,
  Card,
  CardBody,
  CardText,
} from "reactstrap";
import { AbilityContext } from "@src/utility/context/Can";

// ** Images
import decorationLeft from "@src/assets/images/elements/decore-left.png";
import decorationRight from "@src/assets/images/elements/decore-right.png";
import medal from "@src/assets/images/illustration/badge.svg";

//import AlatStatistics from "./Card/CardAlat";
import { getAllAlat } from "../actions/alat";
import { getAllLaboratorium } from "../actions/laboratorium";
import { getAllLokasi } from "../actions/lokasi";

const Dashboard = (props) => {
  //const user = JSON.parse(localStorage.getItem("user"));
  const user= useSelector((state) => state.auth.user);
  const ability = useContext(AbilityContext);
  const [totalLokasi, setTotalLokasi] = useState(0);
  const [totalLaboratorium, setTotalLaboratorium] = useState(0);




  useEffect(() => {
    //dispatch(getAllLaboratorium());
   // dispatch(getAllLokasi());
   // setTotalLaboratorium(listLaboratorium.length);
   // setTotalLokasi(listLokasi.length);

  }, []);
  
  

  useEffect(() => {
   // props.loadAlat();
  
  }, []);

  return (
    <div id="dashboard-ecommerce">
      <Row className="match-height">
       {/*  <Col lg="6" sm="12">
          <Card className="card-congratulations">
            <CardBody className="text-center">
              <img
                className="congratulations-img-left"
                src={decorationLeft}
                alt="decor-left"
              />
              <img
                className="congratulations-img-right"
                src={decorationRight}
                alt="decor-right"
              />
              <Avatar
                icon={<Award size={28} />}
                className="shadow"
                color="primary"
                size="xl"
              />
              <div className="text-center">
                <h1 className="mb-1 text-white">Halo {user.name},</h1>
                <CardText className="m-auto w-75">
                  Selamat bekerja sebagai :{" "}
                  <strong>
                    {user.role} -{" "}
                    {matchingLaboratorium && matchingLaboratorium.nama}
                  </strong>
                </CardText>
              </div>
            </CardBody>
          </Card> 
        </Col> */}
        {ability.can("view", "laboratorium") ? (
        
        <Col lg="3" sm="6">
        <Card className="card-congratulations-medal">
          <CardBody>
            <Row>
              <Col>
                <h5>Lab</h5>
                <CardText className="font-small-3">
                 Total
                </CardText>
                <h1 className="mb-75 mt-2 pt-50">
                {totalLaboratorium}
                </h1>
                
              </Col>
              <Col className="mb-2">
                <div className="d-flex align-items-center">
                  <Avatar
                    icon={<Thermometer size={28} />}
                    className="shadow"
                    color="primary"
                    size="xl"
                  />
                </div>
              </Col>
            </Row>
            <Row>
            <div className="my-auto">
            <Button color="primary" href="/laboratorium" tag="laboratorium">Lihat Selengkapnya</Button>
            </div>
            </Row>
          </CardBody>
        </Card>
      </Col>
      ):null}
        {ability.can("view", "lokasi") ? (
        <Col lg="3" sm="6">
          <Card className="card-congratulations-medal">
            <CardBody>
              <Row>
                <Col>
                  <h5>Lokasi</h5>
                  <CardText className="font-small-3">
                   Total
                  </CardText>
                  <h1 className="mb-75 mt-2 pt-50">
                    {totalLokasi}
                  </h1>
                  
                </Col>
                <Col className="mb-2">
                  <div className="d-flex align-items-center">
                    <Avatar
                      icon={<MapPin size={28} />}
                      className="shadow"
                      color="primary"
                      size="xl"
                    />
                  </div>
                </Col>
              </Row>
              <Row>
              <div className="my-auto">
              <Button color="primary" href="/lokasi" tag="laboratorium">Lihat Selengkapnya</Button>
              </div>
              </Row>
            </CardBody>
          </Card>
        </Col>)
        : null }
      </Row>
      <Row className="match-height">
        <Col lg="12" sm="6">
         {/*  <AlatStatistics alat={props.alat} /> */}
        </Col>
      </Row>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    alat: state.alat,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadAlat: () => dispatch(getAllAlat()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
