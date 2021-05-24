//Login Formular Komponente

//React Imports

import React from 'react';
import '../App.css';

//Bootstrap allgemein Import

import 'bootstrap/dist/css/bootstrap.min.css';

//Bootstrap Komponenten Imports

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

//Eigentliche Login Komponente

function Login(props) {

 return (
   <Form className=" shadow inputForm loginForm">
    <Form.Group>
      <Form.Label>Username</Form.Label>
      <Form.Control type="text" placeholder="username..." className="inputText" value={props.inpLoginUsername} onChange={props.handleInputUsernameChange}/>
    </Form.Group>
    <Form.Group>
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="password..." className="inputText" value={props.inpLoginPassword} onChange={props.handleInputPasswordChange}/>
    </Form.Group>

    <BtnLogin
          onLoginClick={() => props.onLoginClick()}
        />
   </Form>
 );
}

function BtnLogin(props) {
  return (
    <div>
      <Button as="input" type="button" value="Login" className="inputButtonSmall" onClick={props.onLoginClick} variant="outline-dark" />
    </div>
  );
}

export default Login;
