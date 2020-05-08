

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { Nav, NavItem, NavLink, } from 'reactstrap';
import axios from 'axios';


const LoginRegModal = (props) => {
  const {
    buttonLabel
  } = props;

  const [modal, setModal] = useState(false);
  const [activeTab, setActiveTab] = useState('Register');
  const toggle = () => setModal(!modal);
  const closeBtn = <button className="close" onClick={toggle}>&times;</button>;

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
      setModal(!modal);
  }

  return (
    <div>
      <Button className=" btn-secondary custom-btn " onClick={toggle}>{buttonLabel}Login</Button>
      <Button className="btn-secondary custom-btn" onClick={toggle}>{buttonLabel}Register</Button>
      <Modal isOpen={modal} toggle={toggle} centered>
        <ModalHeader toggle={toggle} className=" mx-auto text-center" close={closeBtn}>
        <img src="/register.png"  className="img-fluid" width="200" height="160" alt=""></img>
         </ModalHeader>
        <Nav tabs>
          <NavItem>
            <NavLink onClick={()=> setActiveTab('register')} href="#" className={activeTab === "register" ? "active" : null}>Register</NavLink>
          </NavItem>
          <NavItem>
          <NavLink onClick={()=> setActiveTab('login')} href="#" className={activeTab === "login" ? "active" : null}>Login</NavLink>
          </NavItem>
        </Nav>
        <ModalBody>
          <Form >
          {activeTab === 'register' ?
            <FormGroup>
              <Label for="exampleName">Name</Label>
              <Input onChange={(e) => setName(e.target.value)} type="name" name="name" value={name} id="exampleName" placeholder="Please enter your name." />
            </FormGroup> : null }


            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input onChange={(e) => setEmail(e.target.value)} type="email" name="email" value={email} id="exampleEmail" placeholder="Please enter your Email address" />
            </FormGroup>

            {activeTab === 'register' ?
            <FormGroup>
              <Label for="exampleUsername">Username</Label>
              <Input onChange={(e) => setUsername(e.target.value)} type="username" name="username" value={username} id="exampleUsername" placeholder="Please select a Username." />
            </FormGroup> : null }

            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input onChange={(e) => setPassword(e.target.value)} type="password" name="password" value={password} id="examplePassword" placeholder="Please select a password." />
            </FormGroup>

            {activeTab === 'register' ?
            <FormGroup>
              <Label for="confirmPassword">Confirm Password</Label>
              <Input onChange={(e) => setConfirmPassword(e.target.value)} type="password" name="confirmPassword" value={confirmPassword} id="confirmPassword" placeholder="Please confirm your password." />
            </FormGroup> : null }

          </Form>
        </ModalBody>
        <ModalFooter>'
        <Button color="primary" onClick={activeTab === 'register' ?  register : login }>Submit</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default LoginRegModal;