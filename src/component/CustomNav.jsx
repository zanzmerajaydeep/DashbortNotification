import React, { useState } from 'react';

import { NavLink as reactlink } from 'react-router-dom';
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
  NavbarText,
} from 'reactstrap';

function CustomNav(args) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar 
       style={{ backgroundColor: '#445064',fontStyle:'italic'}} 
       expand='md'
       fixed=''
      
      >
        <NavbarBrand tag={reactlink} to="/home"  style={{color:'white'}}>NotifyMe.com</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar >
            <NavItem >
              <NavLink tag={reactlink} to="/Email" style={{color:'white'}}>Email </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={reactlink} to="/SMS" style={{color:'white'}}>
                SMS 
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={reactlink} to="/Push Notification" style={{color:'white'}}>
              Notifications
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={reactlink} to="/about" style={{color:'white'}}>
              About US
              </NavLink>
            </NavItem>
           
          </Nav>
          <NavbarText><img width="50px" src="bell.png"></img></NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default CustomNav;