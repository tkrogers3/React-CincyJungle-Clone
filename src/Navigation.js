import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import LoginRegModal from './Register';

const Navigation = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [auth, setAuth] = useState({});
  const [modal, setModal] = useState(false);
  const [activeTab, setActiveTab] = useState('Register');
  const toggleModal = () => setModal(!modal);
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const closeBtn = <button className="close" onClick={toggleModal}>&times;</button>;
  const {
    buttonLabel
  } = props;

  const activeModal = (props) => {
    setActiveTab(props)
    toggleModal()
  }

  const authenticated = (props) => {
    if (localStorage.getItem('auth') !== null) {
      setLoggedIn(true);
      setAuth(JSON.parse(localStorage.getItem('auth')));
    }
  }
    const userLogout = () => {

      const logoutData = {
        headers: { Authorization: "Bearer " + token }

      }

      axios.get('http://localhost:8000/api/logout/', logoutData)
        .then(function (response) {
      console.log(response)
      
          return response.data;// handle success
          

        })
        .catch(function (error) {
          // handle error
          console.log(error);
         
        });
      setLoggedIn(false);
      localStorage.clear();

    }

  useEffect(() => { authenticated() }, []) 
  return (
    <div>
      <Navbar className="navBackground mt-3" light expand="md">
      <img src="/cincyjungle.png" width="200" height="160" alt=""></img>
          <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar><NavItem>
                <NavLink className="black" href="/"><h3>Home</h3></NavLink>
            </NavItem>
            <NavItem>
                <NavLink className="black" href="/posts"><h3>Posts</h3></NavLink>
              </NavItem>
            
          </Nav>
            <LoginRegModal
              modal={modal}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              toggleModal={toggleModal}
              closeBtn={closeBtn}
              setLoggedIn={setLoggedIn}
              setAuth={setAuth}
              setToken={setToken}
            />

            {loggedIn
            ? <React.Fragment>
              <h5> Hello, user!</h5>
              <button className="btn-secondary custom-btn" onClick={userLogout}>{buttonLabel}Logout</button>  </React.Fragment>
              :
             <React.Fragment>  
                <button className=" btn-secondary custom-btn" onClick= {()=> activeModal("login")} >{buttonLabel}Login</button> 
                <button className="btn-secondary custom-btn" onClick= {()=> activeModal("register")}>{buttonLabel}Register</button>
             </React.Fragment>
             }
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Navigation;