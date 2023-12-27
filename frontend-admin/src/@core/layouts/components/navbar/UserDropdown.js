import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// ** Custom Components
import Avatar from "@components/avatar";

// ** Third Party Components
import {
  User,
  Mail,
  CheckSquare,
  MessageSquare,
  Settings,
  CreditCard,
  HelpCircle,
  Power,
} from "react-feather";

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";

// ** Default Avatar Image
import defaultAvatar from "@src/assets/images/portrait/small/avatar-s-0.jpg";

import { checkAuth } from "../../../../actions/auth";
import EventBus from "../../../../common/EventBus";

const UserDropdown = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const xuserString = localStorage.getItem("user");

    const xuser = JSON.parse(xuserString);
    dispatch(checkAuth(xuser.ssoToken));
  }, [dispatch]);

  const user = useSelector((state) => state.auth.user);
  console.log(user);
  const logOut = useCallback(() => {}, [dispatch]);

  useEffect(() => {
    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [logOut]);

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        {user ? (
          <>
            <div className="user-nav d-sm-flex d-none">
              <span className="user-name fw-bold">{user.pegawaiData.name}</span>
              <span className="user-status">
                {user.pegawaiData.email_address}{" "}
              </span>
            </div>

            <Avatar color="light-danger" img={user.pegawaiData.foto} />

            {/*  <Avatar color="light-danger" content={user.pegawaiData.email_address} initials />  */}
          </>
        ) : null}
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
          <User size={14} className="me-75" />
          <span className="align-middle">Profile</span>
        </DropdownItem>

        <DropdownItem divider />
        <DropdownItem
          tag={Link}
          to="/pages/"
          onClick={(e) => e.preventDefault()}
        >
          <Settings size={14} className="me-75" />
          <span className="align-middle">Settings</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="/login" onClick={logOut}>
          <Power size={14} className="me-75" />
          <span className="align-middle">Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
