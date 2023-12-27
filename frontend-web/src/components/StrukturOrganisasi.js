// ** React Imports
import { useEffect, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";

// ** Store & Actions
import { connect, useDispatch } from "react-redux";

import { Row, Col, Button, Breadcrumb, BreadcrumbItem } from "reactstrap";

import { getPage } from "../actions/page";

function StrukturOrganisasi(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const code = "struktur-organisasi";

  useEffect(() => {
    props.getpages(code);
  }, []);

  return (
    <Fragment>
            <div className="breadcrumb">
        <div className="wrapper">
          <Breadcrumb>
            <BreadcrumbItem>
              <a href="/">Beranda</a>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <a href="#">Profil</a>
            </BreadcrumbItem>
            <BreadcrumbItem active>Struktur Organisasi</BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>
      <section className="alatLab">
        <div className="container">
          <div>
            <h2 className="titleLeft">Struktur Organisasi</h2>
          </div>
          <div className="wrapper">
            <div className="wrapper">
              {props.page.data && (
                <div key={props.page.data.id}>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: props.page.data.content,
                    }}
                  ></p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    page: state.page,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getpages: (code) => dispatch(getPage(code)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(StrukturOrganisasi);
