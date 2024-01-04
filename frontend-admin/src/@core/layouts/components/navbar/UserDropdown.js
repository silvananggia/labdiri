import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import Avatar from "@components/avatar";
import { User, Settings, Power } from "react-feather";
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from "reactstrap";
import { checkAuth, logout } from "../../../../actions/auth";

const UserDropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const xuserString = localStorage.getItem("user");
    if (xuserString) {
      const xuser = JSON.parse(xuserString);
      dispatch(checkAuth(xuser.ssoToken));
    }
  }, [dispatch]);

  // Function to show logout confirmation modal
  const showLogoutConfirmation = () => {
    Swal.fire({
      title: 'Logout',
      text: 'Apakah anda yakin akan keluar dari aplikasi ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya',
      cancelButtonText: 'Tidak',
      customClass: {
        confirmButton: 'btn btn-primary me-2', // Add spacing to the right
        cancelButton: 'btn btn-secondary',     // You can customize this class as well
      },
    }).then((result) => {
      if (result.isConfirmed) {
        logOut();
      }
    });
  };

  const logOut = async () => {
    try {
      await dispatch(logout());
      // Redirect to "/login" after successful logout
      navigate('/admin/login');
    } catch (error) {
      // Show sweet alert for unsuccessful logout
      Swal.fire({
        icon: 'error',
        title: 'Logout Failed',
        text: error.message || 'An error occurred during logout.',
      });
    }
  };

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        {user && user.pegawaiData ? (
          <>
            <div className="user-nav d-sm-flex d-none">
              <span className="user-name fw-bold">{user.pegawaiData.name}</span>
              <span className="user-status">
                {user.pegawaiData.email_address}{" "}
              </span>
            </div>

            <Avatar color="light-danger" content={user.pegawaiData.name} initials />
          </>
        ) : null}
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
          <User size={14} className="me-75" />
          <span className="align-middle">Profile</span>
        </DropdownItem>

        <DropdownItem divider />
        <DropdownItem tag={Link} to="/pages/" onClick={(e) => e.preventDefault()}>
          <Settings size={14} className="me-75" />
          <span className="align-middle">Settings</span>
        </DropdownItem>
        <DropdownItem onClick={showLogoutConfirmation}>
          <Power size={14} className="me-75" />
          <span className="align-middle">Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
