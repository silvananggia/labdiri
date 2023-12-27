// ** React Imports
import { Fragment } from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";

function Layanan(){
    return (
        <Fragment>
                <div className="breadcrumb">
        <div className="wrapper">
          <Breadcrumb>
            <BreadcrumbItem>
              <a href="/">Beranda</a>
            </BreadcrumbItem>
            <BreadcrumbItem active>Layanan</BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>
          <section className="alatLab">
            <div className="container">
              <div>
                <h2 className="titleLeft">Layanan</h2>
              </div>
              <div className="wrapper"></div>
            </div>
          </section>
        </Fragment>
    )
    }
    
    export default Layanan;