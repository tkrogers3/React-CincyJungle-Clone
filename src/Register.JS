

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { Nav, NavItem, NavLink, } from 'reactstrap';
import axios from 'axios';


const LoginRegModal = (props) => {
  

  // const [modal, setModal] = useState(false);
  // const [activeTab, setActiveTab] = useState('Register');
  // const toggle = () => setModal(!modal);
  // const closeBtn = <button className="close" onClick={toggle}>&times;</button>;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const login = (e) => {

    const loginInfo = {

      email: email,
      password: password,

    }

    axios.post('http://localhost:8000/api/login/' , loginInfo)
      .then(function (response) {
        let x = JSON.stringify(response.data);
 
        localStorage.setItem('auth',x);
        props.setLoggedIn(true);
        props.setAuth(response.data);
        return response.data;// handle success
     
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
      props.toggleModal()
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
    axios.post('http://localhost:8000/api/register', registerInfo)
      .then(function (response) {
        console.log(response);
        return response.data.data// handle success
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
      props.toggleModal()
  }

  return (

    
      <Modal isOpen={props.modal} toggle={props.toggleModal} centered>
        <ModalHeader toggle={props.toggleModal} className=" mx-auto text-center" close={props.closeBtn}> {props.activeTab === 'register' ? 
        <img src="/register.png"  className="img-fluid radius" width="250"  alt=""></img> : <img src="/whodey.jpg"  className="img-fluid radius" width="250"  alt=""></img> }
         </ModalHeader>
        <Nav tabs>
          <NavItem>
            <NavLink 
           
            onClick={()=> props.setActiveTab('register')} href="#" 
            className={props.activeTab === "register" ? "active" : ""}
            id="orange">
        
            <h5>Register</h5>
            </NavLink>
           </NavItem>

          <NavItem>
          <NavLink
           onClick={()=> props.setActiveTab('login')} href="#" 
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
            </FormGroup> : null }


            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input onChange={(e) => setEmail(e.target.value)} type="email" name="email" value={email} id="exampleEmail" placeholder="Please enter your Email address" />
            </FormGroup>

            {props.activeTab === 'register' ?
            <FormGroup>
              <Label for="exampleUsername">Username</Label>
              <Input onChange={(e) => setUsername(e.target.value)} type="username" name="username" value={username} id="exampleUsername" placeholder="Please select a Username." />
            </FormGroup> : null }

            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input onChange={(e) => setPassword(e.target.value)} type="password" name="password" value={password} id="examplePassword" placeholder="Please select a password." />
            </FormGroup>

            {props.activeTab === 'register' ?
            <FormGroup>
              <Label for="confirmPassword">Confirm Password</Label>
              <Input onChange={(e) => setConfirmPassword(e.target.value)} type="password" name="confirmPassword" value={confirmPassword} id="confirmPassword" placeholder="Please confirm your password." />
            </FormGroup> : null }

          </Form>
        </ModalBody>
        <ModalFooter>
        <Button className="btn-secondary custom-btn" onClick={props.activeTab === 'register' ?  register : login }>Submit</Button>{' '}
          <Button className="btn-secondary custom-btn" onClick={props.toggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>

  );
}

export default LoginRegModal;