import React, {Fragment, useContext,useState, useEffect, useCallback } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { Edit, Plus, Trash2, Tool,MapPin, Thermometer,  Eye,
  Cpu,
  Heart,
  Award,
  Truck,
  Server,
  Activity,
  ShoppingBag,
  AlertOctagon,
  MessageSquare } from "react-feather";

// ** Custom Components
import Avatar from "@components/avatar";

import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'
import {
  Badge,
  Label,
  Input,
  Button,
  Row,
  Col,
  Card, CardHeader, CardTitle,CardSubtitle, CardBody
} from "reactstrap";
import { AbilityContext } from "@src/utility/context/Can";

// ** Images
import decorationLeft from "@src/assets/images/elements/decore-left.png";
import decorationRight from "@src/assets/images/elements/decore-right.png";
import medal from "@src/assets/images/illustration/badge.svg";
import StatsVertical from '@components/widgets/stats/StatsVertical'
//import AlatStatistics from "./Card/CardAlat";
import { getDashboard,getStatAlat ,getStatAlatLokasi, getStatLabLokasi} from "../actions/dashboard";
import BarChart from "./Chart/BarChart";
import PieChart from "./Chart/PieChart";
import DonutChart from "./Chart/DonutChart";
const Dashboard = (props) => {
  const dispatch = useDispatch();
  //const user = JSON.parse(localStorage.getItem("user"));
  const user= useSelector((state) => state.auth.user);
  const ability = useContext(AbilityContext);
  const [totalLokasi, setTotalLokasi] = useState(0);
  const [totalLaboratorium, setTotalLaboratorium] = useState(0);




  useEffect(() => {
    dispatch(getDashboard());
    dispatch(getStatAlat());
    dispatch(getStatAlatLokasi());
    dispatch(getStatLabLokasi());

  }, []);

  const dataDashboard = useSelector((state) => state.dashboard.dashboarddata);
  const dataBarChart = useSelector((state) => state.dashboard.statalat);
  const dataAlatLok = useSelector((state) => state.dashboard.statlokalat);
  const dataLabLok = useSelector((state) => state.dashboard.statlablok);


  return (
    <Fragment>
{/* 
              <Row>
        <Col xl='2' md='4' sm='6'>
          <StatsVertical icon={<Thermometer size={28} />} color='info' stats= {dataDashboard && dataDashboard.total_labs} statTitle='Laboratorium' />
        </Col>
        <Col xl='2' md='4' sm='6'>
          <StatsVertical icon={<Tool size={28} />} color='success' stats= {dataDashboard && dataDashboard.total_peralatan} statTitle='Peralatan' />
        </Col>
        <Col xl='2' md='4' sm='6'>
          <StatsVertical icon={<MapPin size={28} />} color='primary' stats={dataDashboard && dataDashboard.total_lokasi} statTitle='Lokasi' />
        </Col>

      </Row> */}
      <Row>
        {/* Stats With Icons Horizontal */}
        <Col lg='3' sm='6'>
          <StatsHorizontal icon={<Thermometer size={21} />} color='info' stats={dataDashboard && dataDashboard.total_labs}  statTitle='Laboratorium' />
        </Col>
        <Col lg='3' sm='6'>
          <StatsHorizontal icon={<Tool size={21} />} color='success' stats={dataDashboard && dataDashboard.total_peralatan} statTitle='Peralatan' />
        </Col>
        <Col lg='3' sm='6'>
          <StatsHorizontal icon={<MapPin size={21} />} color='danger' stats={dataDashboard && dataDashboard.total_lokasi} statTitle='Lokasi' />
        </Col>

        {/* Stats With Icons Horizontal */}
      </Row>

      <Row className='match-height'>
        <Col lg="6" sm="12">
        <Card>
      <CardHeader className="d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column">
        <div>
          <CardTitle className="mb-75" tag="h4">
          Jumlah Laboratorium Per Lokasi
          </CardTitle>
          
        </div>
      </CardHeader>

      <CardBody>
        {dataLabLok && <DonutChart data={dataLabLok} />}
   
        </CardBody>
        </Card>

        </Col>
        <Col lg="6" sm="12">
        <Card>
      <CardHeader className="d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column">
        <div>
          <CardTitle className="mb-75" tag="h4">
          Jumlah Alat Per Lokasi
          </CardTitle>
        </div>
      </CardHeader>

      <CardBody>
        {dataAlatLok && <PieChart data={dataAlatLok} />}
    
        </CardBody>
        </Card>

        </Col>
      </Row>


      <Row className='match-height'>
        <Col lg="12" sm="12">
      
        <BarChart data={dataBarChart} />

        </Col>
      </Row>
    </Fragment>
  )

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
