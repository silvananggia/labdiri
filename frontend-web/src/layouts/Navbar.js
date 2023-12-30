import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import logo from '../assets/images/logo/logo.png';

function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">
          <img
            src={logo}
            alt="Lab Logo"
            width="103"
            height="40"
            className="d-inline-block align-top"
          />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            <NavItem>
              <NavLink href="/">Beranda</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Profil
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <NavLink href="/tentang-kami">Tentang Kami</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href="/visi-misi">Visi & Misi</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href="/struktur-organisasi">Struktur Organisasi</NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <NavLink href="/laboratorium">Laboratorium</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/alat-lab">Alat Laboratorium</NavLink>
            </NavItem>
{/*             <NavItem>
              <NavLink href="/layanan">Layanan</NavLink>
            </NavItem> */}
            <NavItem>
              <NavLink href="/hubungi-kami">Hubungi Kami</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Menu;
