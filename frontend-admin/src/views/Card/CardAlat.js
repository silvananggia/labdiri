import React, { useContext, useEffect, Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import Avatar from "@components/avatar";
import {AlertTriangle,TrendingUp, ThumbsUp,ThumbsDown, Box } from "react-feather";
import {
    Badge,
    Label,
    Input,
    UncontrolledTooltip,
    Row,
    Col,
    Card,
    CardTitle,
    CardText,
    CardHeader,
    CardBody,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    UncontrolledDropdown,
  } from "reactstrap";


const AlatStatistics = (props) => {
    // Calculate the total number of Alat items
    const totalAlat = props.alat.alatlist.length;

    // Filter Alat items with "kondisi = baik"
    const baikAlat = props.alat.alatlist.filter((item) => item.kondisi === "0");
    const totalBaikAlat = baikAlat.length;

    // Filter Alat items with "kondisi = rusak ringan"
    const rusakRinganAlat = props.alat.alatlist.filter((item) => item.kondisi === "1");
    const totalRusakRinganAlat = rusakRinganAlat.length;


    // Filter Alat items with "kondisi = rusak berat"
    const rusakAlat = props.alat.alatlist.filter((item) => item.kondisi === "2");
    const totalRusakAlat = rusakAlat.length;

    // Filter Alat items with "kondisi = terkalibrasi"
    const terkalibrasiAlat = props.alat.alatlist.filter(
      (item) => item.status_kalibrasi === "2"
    );
    const totalTerkalibrasiAlat = terkalibrasiAlat.length;

    return (
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Alat Laboratorium</CardTitle>
        </CardHeader>
        <CardBody className="statistics-body">
          <Row>
            <Col className="mb-2">
              <div className="d-flex align-items-center">
                <Avatar
                  color="light-dark"
                  icon={<Box size={24} />}
                  className="me-2"
                />
                <div className="my-auto">
                  <h4 className="fw-bolder mb-0">{totalAlat}</h4>
                  <CardText className="font-small-3 mb-0">Total Alat</CardText>
                </div>
              </div>
            </Col>
            <Col>
              <div className="d-flex align-items-center">
                <Avatar
                  color="light-success"
                  icon={<ThumbsUp size={24} />}
                  className="me-2"
                />
                <div className="my-auto">
                  <h4 className="fw-bolder mb-0">{totalBaikAlat}</h4>
                  <CardText className="font-small-3 mb-0">
                    Kondisi Baik
                  </CardText>
                </div>
              </div>
            </Col>
            <Col>
              <div className="d-flex align-items-center">
                <Avatar
                  color="light-warning"
                  icon={<AlertTriangle size={24} />}
                  className="me-2"
                />
                <div className="my-auto">
                  <h4 className="fw-bolder mb-0">{totalRusakRinganAlat}</h4>
                  <CardText className="font-small-3 mb-0">
                    Kondisi Rusak Ringan
                  </CardText>
                </div>
              </div>
            </Col>
            <Col>
              <div className="d-flex align-items-center">
                <Avatar
                  color="light-danger"
                  icon={<ThumbsDown size={24} />}
                  className="me-2"
                />
                <div className="my-auto">
                  <h4 className="fw-bolder mb-0">{totalRusakAlat}</h4>
                  <CardText className="font-small-3 mb-0">
                    Kondisi Rusak Berat
                  </CardText>
                </div>
              </div>
            </Col>
            <Col>
              <div className="d-flex align-items-center">
                <Avatar
                  color="light-info"
                  icon={<TrendingUp size={24} />}
                  className="me-2"
                />
                <div className="my-auto">
                  <h4 className="fw-bolder mb-0">{totalTerkalibrasiAlat}</h4>
                  <CardText className="font-small-3 mb-0">
                    Kondisi Terkalibrasi
                  </CardText>
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  };



export default AlatStatistics;
