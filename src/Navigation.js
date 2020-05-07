import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

const Example = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className="navBackground " light expand="md">
      <img src="/cincyjungle.png" width="200" height="160" alt=""></img>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
         
          <NavItem>
              <NavLink className="black" href="/"><h3>Home</h3></NavLink>
            </NavItem>
           
            
          </Nav>
          <NavLink href="#" className="black" ><h3>Login/Register</h3></NavLink>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Example;


