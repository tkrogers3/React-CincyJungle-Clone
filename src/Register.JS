

import React, { useState } from 'react';
import { Alert } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { Nav, NavItem, NavLink, } from 'reactstrap';
import axios from 'axios';


const LoginRegModal = (props) => {

 const API_ENDPOINT = "https://cincyjungle.ue.r.appspot.com";
  // const API_ENDPOINT = "http://localhost:8000";
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const [visible, setVisible] = useState(true);
  // const onDismiss = () => setVisible(false);
  // const [loginAlert, setLoginAlert]=useState(false);

  const login = (e) => {

    const loginInfo = {

      email: email,
      password: password,

    }

    axios.post(API_ENDPOINT+'/api/login/', loginInfo)
      .then(function (response) {
        console.log(response);
        // response.data.data - token, user
        let x = JSON.stringify(response.data);
        localStorage.setItem('auth', x);
        props.setAuth(response.data);
        props.setLoggedIn(true);
        console.log("I am logged in!!");
        //  setLoginAlert(false);
        props.toggleModal()
        window.location.reload(false);

      })


      .catch(function (error) {
        console.log(error);
        //  setLoginAlert(true);

      });


  }


  const register = (e) => {

    const registerInfo = {
      name: name,
      username: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    }
    console.log("this is register line 58");
    axios.post(API_ENDPOINT+'/api/register', registerInfo)
      .then(function (response) {
        console.log(response);
        return response.data.data// handle success
      })
      .catch(function (error) {


        console.log(error);
      })
      .finally(function () {
        // always executed
      });
     login();
      props.toggleModal()
      window.location.reload(false);
  
  }

  return (



    <Modal isOpen={props.modal} toggle={props.toggleModal} centered>
      <ModalHeader toggle={props.toggleModal} className=" mx-auto text-center" close={props.closeBtn}> {props.activeTab === 'register' ?
        <img src="/register.png" className="img-fluid radius" width="250" alt=""></img> : <img src="/whodey.jpg" className="img-fluid radius" width="250" alt=""></img>}
      </ModalHeader>
      <Nav tabs>
        <NavItem>
          <NavLink

            onClick={() => props.setActiveTab('register')} href="#"
            className={props.activeTab === "register" ? "active" : ""}
            id="orange">

            <h5>Register</h5>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            onClick={() => props.setActiveTab('login')} href="#"
            className={props.activeTab === "login" ? "active" : ""}
            id="black">
            Login
           </NavLink>
        </NavItem>

  
      </Nav>
      <ModalBody>
        <Form >
          {props.activeTab === 'register' ?
            <FormGroup>
              <Label for="exampleName">Name</Label>
              <Input onChange={(e) => setName(e.target.value)} type="name" name="name" value={name} id="exampleName" placeholder="Please enter your name." />
            </FormGroup> : null}


          <FormGroup>
            <Label for="exampleEmail">Email</Label>

            <Input onChange={(e) => setEmail(e.target.value)} type="email" name="email" value={email} id="exampleEmail" placeholder="Please enter your Email address" />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
           {/* {setLoginAlert ?<small id="emailHelp" className="form-text text-danger">The Username/Password did not match our system. Please try again.</small> : <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> } */}
          </FormGroup>

          {props.activeTab === 'register' ?
            <FormGroup>
              <Label for="exampleUsername">Username</Label>
              <Input onChange={(e) => setUsername(e.target.value)} type="username" name="username" value={username} id="exampleUsername" placeholder="Please select a Username." />
            </FormGroup> : null}

          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input onChange={(e) => setPassword(e.target.value)} type="password" name="password" value={password} id="examplePassword" placeholder="Please select a password." />
          </FormGroup>

          {props.activeTab === 'register' ?
            <FormGroup>
              <Label for="confirmPassword">Confirm Password</Label>
              <Input onChange={(e) => setConfirmPassword(e.target.value)} type="password" name="confirmPassword" value={confirmPassword} id="confirmPassword" placeholder="Please confirm your password." />
            </FormGroup> : null}

        </Form>
      </ModalBody>
      <ModalFooter>
        <Button className="btn-secondary custom-btn" onClick={props.activeTab === 'register' ? register : login}>Submit</Button>{' '}
        <Button className="btn-secondary custom-btn" onClick={props.toggleModal}>Cancel</Button>
      </ModalFooter>
      </Modal>
  
  )}

export default LoginRegModal;