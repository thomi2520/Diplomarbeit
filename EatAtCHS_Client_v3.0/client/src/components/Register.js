//React Imports

import React from 'react';
import '../App.css';

//Bootstrap allgemein Import

import 'bootstrap/dist/css/bootstrap.min.css';

//Bootstrap Komponenten Imports

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Register(props) {

  return (
    <Form className=" shadow inputForm registerForm">
     <Form.Group>
       <Form.Label>Firstname</Form.Label>
       <Form.Control type="text" placeholder="firstname..." name="inpRegisterFirstname" className="inputText" value={props.inpRegisterFirstname} onChange={props.handleRegisterInputChange}/>
     </Form.Group>
     <Form.Group>
       <Form.Label>Lastname</Form.Label>
       <Form.Control type="text" placeholder="lastname..." name="inpRegisterLastname" className="inputText" value={props.inpRegisterLastname} onChange={props.handleRegisterInputChange}/>
     </Form.Group>
     <Form.Group>
       <Form.Label>Username</Form.Label>
       <Form.Control type="text" placeholder="username..." name="inpRegisterUsername" className="inputText" value={props.inpRegisterUsername} onChange={props.handleRegisterInputChange}/>
     </Form.Group>
     <Form.Group>
       <Form.Label>Email</Form.Label>
       <Form.Control type="text" placeholder="email..." name="inpRegisterEmail" className="inputText" value={props.inpRegisterEmail} onChange={props.handleRegisterInputChange}/>
     </Form.Group>
     <Form.Group>
       <Form.Label>Password</Form.Label>
       <Form.Control type="password" placeholder="passsword..." name="inpRegisterPassword1" className="inputText" value={props.inpRegisterPassword1} onChange={props.handleRegisterInputChange}/>
     </Form.Group>
     <Form.Group>
       <Form.Label>Repeat password</Form.Label>
       <Form.Control type="password" placeholder="repeat password..." name="inpRegisterPassword2" className="inputText" value={props.inpRegisterPassword2} onChange={props.handleRegisterInputChange}/>
     </Form.Group>

     <BtnRegister
           onRegisterClick={() => props.onRegisterClick()}
         />
    </Form>
  );
}

function BtnRegister(props) {
  return (
    <Button as="input" type="button" value="Register" className="inputButtonSmall" onClick={props.onRegisterClick} variant="outline-dark" />
  );
}

export default Register;
