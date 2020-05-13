import React, { useState, useEffect} from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import LoginRegModal from './Register';

// import Posts from './Landing';
 


const Navigation= (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const [auth, setAuth] = useState({});
  const [modal, setModal] = useState(false);
  const [activeTab, setActiveTab] = useState('Register');
  const toggleModal = () => setModal(!modal);
  const [loggedIn, setLoggedIn] = useState(false);
  const closeBtn = <button className="close" onClick={toggleModal}>&times;</button>;
  const {
    buttonLabel
  } = props;

  const activeModal =(props) => {
    setActiveTab(props)
    toggleModal()
  }

  const authenticated =(props) =>{
    console.log("Hello world");
    if(localStorage.getItem('Auth') !== null){
      setLoggedIn(true);
      setAuth(JSON.parse(localStorage.getItem('auth')));
    }


  }
useEffect(() =>{authenticated()}, []) 
  return (
    <div>
      <Navbar className="navBackground mt-3" light expand="md">
      <img src="/cincyjungle.png" width="200" height="160" alt=""></img>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
         
          <NavItem>
              <NavLink className="black" href="/"><h3>Home</h3></NavLink>
            </NavItem>
           
            
          </Nav>
          <LoginRegModal 
            modal = {modal}
            activeTab = {activeTab}
            setActiveTab ={setActiveTab}
            toggleModal = {toggleModal}
            closeBtn ={closeBtn}
            setLoggedIn={setLoggedIn}
            setAuth={setAuth}
          />
            {loggedIn 

            ? <React.Fragment> <h4>Welcome, Admin!  </h4><br></br>
           
            <button className="btn-secondary custom-btn" >{buttonLabel}Logout</button></React.Fragment>:
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


