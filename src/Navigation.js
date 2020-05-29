import React, { useState, useEffect,  } from 'react';
import axios from 'axios';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavLink
} from 'reactstrap';
import LoginRegModal from './Register';
import { useHistory } from "react-router-dom";

const CreatePost = (props) => {
  let history = useHistory();
//const API_ENDPOINT = "https://cincyjungle.ue.r.appspot.com";
  const API_ENDPOINT = "http://localhost:8000";
  const [isOpen, setIsOpen] = useState(false);
  // const [user, setUser] = useState({});
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
        headers: { Authorization: "Bearer " + auth.token }

      }

      axios.get(API_ENDPOINT+'/api/logout/', logoutData)
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
      history.push("/");
    }
    
  
  useEffect(() => { authenticated() }, []) 
  return (
    <div>
      <Navbar className="navBackground mt-3" light expand="md">
      <a href="/"><img src="/cincyjungle.png" width="200" height="160" alt=""></img></a>
          <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
           {loggedIn ?<NavLink className="black" href="/createpost"><button className="btn-secondary custom-btn mr-2">Create a post</button></NavLink> : null}
              </Nav>
            <LoginRegModal
              modal={modal}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              toggleModal={toggleModal}
              closeBtn={closeBtn}
              setLoggedIn={setLoggedIn}
              setAuth={setAuth}
              loggedIn={loggedIn}
              toggle={toggle}
      
        
            />

            {loggedIn? <React.Fragment>
              <h5 className="mr-2" > Welcome, {auth.user.username}! </h5>
              <button className="btn-secondary custom-btn" onClick={userLogout}>{buttonLabel} Logout</button> </React.Fragment>
              :
             <React.Fragment>  
                <button className=" btn-secondary custom-btn mr-2" onClick= {()=> activeModal("login")} >{buttonLabel}Login</button> 
                <button className="btn-secondary custom-btn" onClick= {()=> activeModal("register")}>{buttonLabel}Register</button>
             </React.Fragment>
             }
        </Collapse>
      </Navbar>
    </div>
  );
}

export default CreatePost;