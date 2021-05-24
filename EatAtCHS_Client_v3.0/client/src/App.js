//React

import React from 'react';

//CSS

import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/container';
import Row from 'react-bootstrap/row';
import Col from 'react-bootstrap/col';
import Alert from 'react-bootstrap/alert';


//Components

import Login from './components/Login.js';
import Register from './components/Register.js';
import Menu from './components/Menu.js';
import MenuDash from './components/MenuDash.js';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import Menü from './components/Menü.js';
import AdminTageHinzufügen from './components/AdminTageHinzufügen.js';
import TageHinzufügen from './components/TageHinzufügen.js';
import TageAnmelden from './components/TageAnmelden.js';
import TageBearbeiten from './components/TageBearbeiten.js';
import BenutzerAnzeigen from './components/BenutzerAnzeigen.js';
import AdminMenüsHinzufügen from './components/AdminMenüsHinzufügen.js'
import UserDetails from './components/AdminBenutzerDetails.js';
import TageBearbeitenDetails from './components/TageBearbeitenDetails.js';
import AdminAlleBuchungen from './components/AdminAlleBuchungen.js';

import moment from 'moment';
import 'moment/locale/de';
moment.locale("de");


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

      //Grundinformationen

      baseurl: "localhost",
      port: ":7000",

      //Anzeige-Variablen

      btnLoginMenuClick: false,
      btnRegisterMenuClick: false,
      btnLoginFormClick: false,
      btnRegisterFormClick: false,
      menü: false,
      admin: false,
      benutzerAnzeigen: false,
      tageBearbeiten: false,
      offeneZahlungenAnzeigen: false,
      tageHinzufügen: false,
      adminTageHinzufügen: false,
      loggedIn: false,
      userDetails: false,
      foodDayChange: false,
      alleBuchungenAdmin: false,
      menüsHinzufügenAdmin: false,

      //Eingabe-Felder

      inpLoginUsername: "",
      inpLoginPassword: "",
      inpRegisterFirstname: "",
      inpRegisterLastname: "",
      inpRegisterUsername: "",
      inpRegisterEmail: "",
      inpRegisterPassword1: "",
      inpRegisterPassword2: "",
      tageBearbeitenSuche: "",
      tageHinzufügenSuche: "",
      benutzerAnzeigenSuche: "",
      adminBuchungenSuche: "",
      cfdmID: "",                 //createFoodDayMenuID
      cfdd: "",                   //createFoodDayDate
      chfdmID: "",                //changeFoodDayMenuID
      createFooddayWeekday: "",
      createMenuStarter: "",
      createMenuMain: "",
      createMenuDessert: "",

      Montag: false,
      Dienstag: false,
      Mittwoch: false,
      Donnerstag: false,
      Freitag: false,
      AnmeldenMonat: "",

      //Essentielle Variablen

      jwt: "",
      loggedInUsername: "",
      userId: "",
      clickedId: "",
      applyId: "",
      bookedId: "",
      clickedUserId: "",
      clickedFoodDayID: "",

      //Daten

      bookedByMe: [],
      actualBookedByMe: [],
      foodDays: [],
      userList: [],
      menus: [],
      bookedDaysAll: [],
      NrBooked: 0,
      clickedApply: null,
      clickedCancel: null,
      foodDaysToApply: [],

      alert: "",
      alertColor: "",

      Nachricht: "",

      test: {}
    }
  }

  // Login onChange handlers

  handleLoginInputUsernameChange(event) {
    this.setState({ inpLoginUsername: event.target.value });
  }

  handleLoginInputPasswordChange(event) {
    this.setState({ inpLoginPassword: event.target.value });
  }

  // Register onChange handler

  handleRegisterInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  //Suche onChange handlers

  handleTageBearbeitenSucheChange(event) {
    this.setState({ tageBearbeitenSuche: event.target.value });
  }

  handleTageHinzufügenSucheChange(event) {
    this.setState({ tageHinzufügenSuche: event.target.value });
  }

  handleBenutzerAnzeigenSuche(event) {
    this.setState({ benutzerAnzeigenSuche: event.target.value });
  }

  handleAdminBuchungenSucheChange(event) {
    this.setState({ adminBuchungenSuche: event.target.value });
  }

  //Admin Nachricht Change handleRegisterInputChange

  handleNachrichtBearbeitenChange(event) {
    this.setState({Nachricht: event.target.value});
  }

  //Tage anmelden Wochentag Check

  handleWeekDayChange(event) {
    this.setState({ [event.target.name]: event.target.checked });
  }

  //Tage anmelden Monat changeHandler

  handleAnmeldenMonatChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  //FoodDay erstellen Datum changeHandler

  handleCreateFoodDayDateChange(event) {
    this.setState({ cfdd: event.target.value });
  }

  //FoodDay erstellen Menü changeHandler

  handleCreateFoodDayMenuChange(event) {
    this.setState({ cfdmID: event.target.value });
  }

  //FoodDay ändern Menü changeHandler

  handleChangeFoodDayMenuChange(event) {
    this.setState({ chfdmID: event.target.value });
  }

  //Menü erstellen changeHandler

  handleCreateMenuChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  //Klickevent für den Seitentitel

  TitleClick() {
    if (this.state.jwt) {
      this.setState({
        loggedIn: true,
        menü: false,
        tageHinzufügen: false,
        btnLoginMenuClick: false,
        btnRegisterMenuClick: false
      });
    }
    else {
      this.setState({
        btnLoginMenuClick: true,
        loggedIn: false,
        menü: false,
        tageHinzufügen: false
      });
    }

  }

  //Klickevent für den RegisterNow Button auf der Login Seite

  RegisterNowClick() {
    this.setState({ btnRegisterMenuClick: true });
    this.setState({ btnLoginMenuClick: false });
  }

  //Klickevent für den Login Button im Login Formular

  MenuLogin() {
    this.setState({ btnLoginMenuClick: true });
    this.setState({ btnRegisterMenuClick: false });

    this.setState({
      alert: "",
      alertColor: ""
    });
  }

  //Klickevent für den Register Button im Register Formular

  MenuRegister() {
    this.setState({ btnRegisterMenuClick: true });
    this.setState({ btnLoginMenuClick: false });
  }

  //Wechselt die angezeigte Seite zu BenutzerAnzeigen

  BenutzerAnzeigen() {
    this.setState({
      benutzerAnzeigen: true,
      tageBearbeiten: false,
      adminTageHinzufügen: false,
      foodDayChange: false,
      menüsHinzufügenAdmin: false,
      alleBuchungenAdmin: false,
      userDetails: false
    });
  }

  //Wechselt die angezeigte Seite zu TageBearbeiten

  TageBearbeiten() {
    this.setState({
      tageBearbeiten: true,
      adminTageHinzufügen: false,
      foodDayChange: false,
      menüsHinzufügenAdmin: false,
      alleBuchungenAdmin: false,
      userDetails: false,
      benutzerAnzeigen: false
    });
  }

  //Wechselt die angezeigte Seite zu TageHinzufügen

  TageHinzufügen() {
    this.setState({
      loggedIn: false,
      tageHinzufügen: true
    });
    this.GetFoodDays();
  }

  //Wechselt die angezeigte Seite zu AdminTageHinzufügen

  AdminTageHinzufügen() {
    this.setState({
      tageBearbeiten: false,
      adminTageHinzufügen: true,
      foodDayChange: false,
      menüsHinzufügenAdmin: false,
      alleBuchungenAdmin: false,
      userDetails: false,
      benutzerAnzeigen: false
    });
  }

  //Wechselt die angezeigte Seite zu Alle Buchungen anzeigen für den Admin

  AdminAlleBuchungen() {
    this.setState({
      tageBearbeiten: false,
      adminTageHinzufügen: false,
      foodDayChange: false,
      menüsHinzufügenAdmin: false,
      alleBuchungenAdmin: true,
      userDetails: false,
      benutzerAnzeigen: false

    });
  }

  //Wechselt die angezeigte Seite zu Menüs hinzufügen für den Admin

  MenüsHinzufügen() {
    this.setState({
      tageBearbeiten: false,
      adminTageHinzufügen: false,
      foodDayChange: false,
      menüsHinzufügenAdmin: true,
      alleBuchungenAdmin: false,
      userDetails: false,
      benutzerAnzeigen: false
    });
  }

  //Klickevent für alle Logout Buttons auf den diversen Seiten

  LogoutClick() {
    this.Zurück();
    this.setState({
      loggedIn: false,
      jwt: "",
      admin: false,
      loggedInUsername: "",
      loggedInFirstname: ""
    });
  }

  //Klickevent für den Abmelden Button bei den einzelnen BookedDays

  Abmelden(id) {
    let d = this.state.bookedByMe.filter(item => item.foodDay.date === id);
    this.setState({ clickedCancel: d });

    this.Cancel(d);
  }

  Gezahlt(id) {
    let d = this.state.bookedDaysAll.filter(item => item.id === id)[0];

    this.CheckPaid(d);
  }

  //Klickevent für den FoodDay hinzufügen Button für den Admin

  TagErstellen() {
    this.CreateFoodDay();
  }

  //Klickevent für den Menü erstellen Button für den Admin

  MenüErstellen() {

  }

  //Klickevent für die Zurück Buttons auf den diversen Seiten

  Zurück() {
    if (this.state.jwt) {
      this.setState({
        loggedIn: true,
        menü: false,
        tageHinzufügen: false,
        adminTageHinzufügen: false,
        tageBearbeiten: false,
        benutzerAnzeigen: false,
        offeneZahlungenAnzeigen: false,
        userDetails: false,
        foodDayChange: false,
        alleBuchungenAdmin: false,
        menüsHinzufügenAdmin: false,

        tageBearbeitenSuche: "",
        tageHinzufügenSuche: "",
        benutzerAnzeigenSuche: "",

        createMenuStarter: "",
        createMenuMain: "",
        createMenuDessert: "",

        foodDaysToApply: []
      });
    }
    else {
      this.setState({ btnLoginMenuClick: true });
    }
  }

  //Spezieller Zurück Button für die User Detail Anzeige, der den Admin wieder zur
  //Benutzer Liste führt, und nicht aufs Dashboard

  UserDetailsZurück() {
    this.setState({
      userDetails: false,
      benutzerAnzeigen: true
    });
  }

  FoodDayBearbeitenZurück() {
    this.setState({
      foodDayChange: false,
      tageBearbeiten: true
    });
  }

  //Wechselt die angezeigte Seite zur Detailanzeige

  onItemClick(id) {
    this.setState({
      menü: true,
      loggedIn: false,
      clickedId: id
    });
  }

  //Wechselt die angezeigte Seite zur User-Detailanzeige

  onUserClick(id) {
    this.setState({
      userDetails: true,
      loggedIn: false,
      benutzerAnzeigen: false,
      clickedUserId: id
    });
  }

  //Klickevent für Klick auf einen Tag auf der Anmelden Seite

  onApplyClick(id) {

    let day = this.state.foodDays.filter(item => item.id === id)[0];

    let c = this.state.foodDaysToApply.filter(item => item.id == id);

    if (c.length != 0) {
      alert("a");
      let newDays = [];
      newDays = this.state.foodDaysToApply.filter(item => item.id !== id);
      this.setState({ foodDaysToApply: newDays });
    }
    else {
      this.setState({ foodDaysToApply: [...this.state.foodDaysToApply, day] });
    }
  }

  ApplyAll() {

    let corrDays = [];

    corrDays = this.state.foodDays.filter((item) => {

      let c = true;

      if (item.date.includes(("-" + this.state.AnmeldenMonat + "-"))) {
        if (this.state.Montag) {
          if (moment(item.date.slice(0, 10), "YYYY-MM-DD").format("dddd") === "Montag") {
            this.Apply(item);
          }
        }
        if (this.state.Dienstag) {
          if (moment(item.date.slice(0, 10), "YYYY-MM-DD").format("dddd") === "Dienstag") {
            this.Apply(item);
          }
        }
        if (this.state.Mittwoch) {
          if (moment(item.date.slice(0, 10), "YYYY-MM-DD").format("dddd") === "Mittwoch") {
            this.Apply(item);
          }
        }
        if (this.state.Donnerstag) {
          if (moment(item.date.slice(0, 10), "YYYY-MM-DD").format("dddd") === "Donnerstag") {
            this.Apply(item);
          }
        }

        return c;
      }
    });

    this.setState({
      foodDaysToApply: corrDays,
      Montag: false,
      Dienstag: false,
      Mittwoch: false,
      Donnerstag: false,
      Freitag: false

    });

    //let d = corrDays.map(item => this.Apply(item));
    this.Zurück();

  }

  //Klickevent für Klick auf einen FoodDay in der Admin linkStyleTwo

  handleFoodDayDetailsClick(id, date) {
    this.setState({
      clickedFoodDayDate: date,
      clickedFoodDayID: id,
      foodDayChange: true,
    });
  }

  //Klickevent für den Speichern Button auf der FoodDay bearbeiten Seiten

  onUpdateFoodDay() {
    this.UpdateFoodDay();
  }

  FoodDayLöschen() {
    this.DeleteFoodDay();
  }

  //Klickevent für Klick auf den Login Button

  onLoginClick() {

    let b = true;
    let a = "";
    let c = "";

    if (this.state.inpLoginUsername === "") {
      b = false;
      a = "Username must not be blank";
      c = "warning";
    }

    if (this.state.inpLoginPassword === "") {
      b = false;
      a = " Password must not be blank";
      c = "warning";
    }

    this.LogoutClick();

    if (b === true) {
      this.Login(a, c);
    }
    else {
      this.setState({
        alert: a,
        alertColor: c
      });
    }
  }



  //-------------
  //Server Calls
  //-------------

  async Apply(day) {

    try {

      let data = JSON.stringify({
        fID: day.id,
        uID: this.state.userId,
        loggedIn: true,
        paid: false,
        consumed: false
      });

      let response = await fetch("http://" + this.state.baseurl + this.state.port + "/bookedDay/", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data
      }
      );
      let result = await response.json();

      if (result.message === "Day created") {
        this.GetBookedDays();
      }
      else {
        alert("Das hat leider nicht funktioniert. Stellen Sie sicher, dass Sie für diesen Tag nicht bereits angemeldet sind.");
      }
    }
    catch (e) {
      alert("Error: " + e.message);
    }
  }

  async ReApply(day) {

    try {

      let data = JSON.stringify({
        loggedIn: true
      });

      let response = await fetch("http://" + this.state.baseurl + this.state.port + "/bookedDay/" + day.id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: data
      }
      );
      let result = await response.json();

      if (result.message === "updated") {
        this.GetBookedDays();
      }
      else {
        alert("Das hat leider nicht funktioniert. Stellen Sie sicher, dass Sie für diesen Tag nicht bereits angemeldet sind.");
      }
    }
    catch (e) {
      alert("Error: " + e.message);
    }
  }

  async CreateFoodDay() {

    if (this.state.cfdd === "") {
      alert("Please set a Date and a Menu");
    }
    else {
      try {

        let menu = JSON.stringify({
          name: "",
          description: "",
          starter: this.state.createMenuStarter,
          main: this.state.createMenuMain,
          dessert: this.state.createMenuDessert
        })

        let responseM = await fetch("http://" + this.state.baseurl + this.state.port + "/menu/", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.state.jwt },
          body: menu
        }
        );

        let resultM = await responseM.json();

        if (resultM.message === "Menu created") {

          let data = JSON.stringify({
            menuID: resultM.id,
            date: this.state.cfdd
          });

          let responseF = await fetch("http://" + this.state.baseurl + this.state.port + "/foodDay/", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: data
          }
          );
          let resultF = await responseF.json();

          if (resultF.message === "FoodDay created") {
            this.GetFoodDays();
          }
          else {
            alert("Fehler");
          }
        }
        else {
          alert("menu not created");
        }
      }
      catch (e) {
        alert("Error: " + e.message);
      }
    }
  }

  async Cancel(day) {

    try {

      let data = JSON.stringify({
        loggedIn: false
      });

      let response = await fetch("http://" + this.state.baseurl + this.state.port + "/bookedDay/" + day[0].id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: data
      }
      );
      let result = await response.json();

      if (result.message === "updated") {
        this.setState({ menü: false, loggedIn: true });
        this.GetBookedDays();
      }
    }
    catch (e) {
      alert("Error: " + e.message);
    }
  }

  async CheckPaid(day) {

    try {

      let data = JSON.stringify({
        paid: (!day.paid)
      });

      let response = await fetch("http://" + this.state.baseurl + this.state.port + "/bookedDay/" + day.id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: data
      });

      let result = await response.json();

      if (result.message === "updated") {
        this.GetAllBookedDays();
      }
    }
    catch (e) {
      alert("Error: " + e.message);
    }
  }

  async GetFoodDays() {

    try {
      let response = await fetch("http://" + this.state.baseurl + this.state.port + "/foodDay/", {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.state.jwt }
      }
      );

      let result = await response.json();

      this.setState({ foodDays: result });
    }
    catch (e) {
      alert("Error: " + e.message);
    }
  }

  async GetMenus() {

    try {
      let response = await fetch("http://" + this.state.baseurl + this.state.port + "/menu/", {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.state.jwt }
      }
      );

      let result = await response.json();

      this.setState({ menus: result });
    }
    catch (e) {
      alert("Error: " + e.message);
    }
  }

  async GetBookedDays() {

    try {
      let response = await fetch("http://" + this.state.baseurl + this.state.port + "/bookedDay/users/" + this.state.userId, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.state.jwt }
      }
      );

      let result = await response.json();

      const list = result.filter(item => item.loggedIn === true);

      this.setState({ bookedByMe: result, actualBookedByMe: list });
    }
    catch (e) {
      alert("Error: " + e.message);
    }

    this.setState({ NrBooked: this.state.actualBookedByMe.length });
  }

  async GetAllBookedDays() {

    try {
      let response = await fetch("http://" + this.state.baseurl + this.state.port + "/bookedDay/", {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.state.jwt }
      }
      );

      let result = await response.json();

      this.setState({ bookedDaysAll: result });
    }
    catch (e) {
      alert("Error: " + e.message);
    }
  }

  async GetUsers() {

    try {
      let response = await fetch("http://" + this.state.baseurl + this.state.port + "/user/", {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.state.jwt }
      }
      );

      let result = await response.json();

      this.setState({ userList: result });
    }
    catch (e) {
      alert("Error: " + e.message);
    }
  }

  async UpdateFoodDay() {

    try {

      let data = JSON.stringify({
        menuID: this.state.chfdmID
      });

      let response = await fetch("http://" + this.state.baseurl + this.state.port + "/foodDay/" + this.state.clickedFoodDayID, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: data
      }
      );
      let result = await response.json();

      if (result.message === "updated") {
        this.setState({
          chfdmID: "",
          clickedFoodDayID: "",
          clickedFoodDayDate: ""
        });
        this.GetFoodDays();
        this.FoodDayBearbeitenZurück();
      }
    }
    catch (e) {
      alert("Error: " + e.message);
    }
  }

  async DeleteFoodDay() {

    try {

      let response = await fetch("http://" + this.state.baseurl + this.state.port + "/foodDay/" + this.state.clickedFoodDayID, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      }
      );
      let result = await response.json();

      if (result.message === "deleted") {
        this.setState({
          chfdmID: "",
          clickedFoodDayID: "",
          clickedFoodDayDate: ""
        });
        this.GetFoodDays();
        this.FoodDayBearbeitenZurück();
      }
    }
    catch (e) {
      alert("Error: " + e.message);
    }
  }

  async Login(a, c) {

    try {

      let data = JSON.stringify({
        username: this.state.inpLoginUsername,
        password: this.state.inpLoginPassword
      });

      let response = await fetch("http://" + this.state.baseurl + this.state.port + "/api/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data
      }
      );
      let result = await response.json();

      if (result.jwt) {

        a = "";
        c = "";

        this.setState({
          loggedIn: true,
          admin: false,
          btnLoginMenuClick: false,
          btnRegisterMenuClick: false,
          jwt: result.jwt,
          loggedInUsername: this.state.inpLoginUsername,
          loggedInFirstname: result.firstname,
          userId: result.id,
          inpLoginPassword: ""
        });
        if (result.role === 2) {
          this.setState({ admin: true });
          this.GetAllBookedDays();
        }

        this.GetBookedDays();
        this.GetFoodDays();
        this.GetUsers();
        this.GetMenus();
      }
      else {
        a = "Username and/or password incorrect";
        c = "warning";
      }
    }
    catch (e) {
      alert("Error: " + e.message);
    }
    this.setState({
      alert: a,
      alertColor: c
    });
  }

  async RegisterClick() {

    // --- Input Checks

    let b = true;

    if (this.state.inpRegisterFirstname === "") {
      alert("Firstname must not be blank");
      b = false;
    }

    if (this.state.inpRegisterLastname === "") {
      alert("Lastname must not be blank");
      b = false;
    }

    if (this.state.inpRegisterUsername === "") {
      alert("Username must not be blank");
      b = false;
    }

    if (this.state.inpRegisterEmail === "") {
      alert("Email must not be blank");
      b = false;
    }

    if (this.state.inpRegisterEmail.includes("htl-villach") === false || this.state.inpRegisterEmail.includes("@") === false) {
      alert("The Email address must be from Htl Villach or CHS and contain an @ sign");
      b = false;
    }

    if (this.state.inpRegisterPassword1 === "") {
      alert("Password must not be blank");
      b = false;
    }

    if (this.state.inpRegisterPassword2 === "") {
      alert("Repeat password must not be blank");
      b = false;
    }

    if (this.state.inpRegisterPassword1 != this.state.inpRegisterPassword2) {
      alert("The passwords don't match");
      b = false;
    }

    if (b) {

      try {

        let data = JSON.stringify({
          firstname: this.state.inpRegisterFirstname,
          lastname: this.state.inpRegisterLastname,
          email: this.state.inpRegisterEmail,
          username: this.state.inpRegisterUsername,
          password: this.state.inpRegisterPassword1
        });

        let response = await fetch("http://" + this.state.baseurl + this.state.port + "/user", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: data
        }
        );
        let result = await response.json();

        if (result.message === "user created") {
          this.setState({
            btnRegisterMenuClick: false,
            inpRegisterPassword1: "",
            inpRegisterPassword2: ""
          });
        }

      }
      catch (e) {
        alert("Error: " + e.message);
      }
    }
  }

  //Ausgabe

  render() {

    if (this.state.btnLoginMenuClick === true) {
      return (
        <div className="App">
          <Container>
            <header className="App-header">
              <Menu
                onLoginClick={() => this.MenuLogin()}
                onRegisterClick={() => this.MenuRegister()}
                onTitleClick={() => this.TitleClick()}
              />
            </header>
            <body className="App-body">
              <Row>
                <Col>
                  <Alert variant={this.state.alertColor} show="false" >{this.state.alert}</Alert>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Login
                    onLoginClick={() => this.onLoginClick()}
                    onRegisterClick={() => this.RegisterClick()}
                    onRegisterNowClick={() => this.RegisterNowClick()}
                    handleInputUsernameChange={(event) => this.handleLoginInputUsernameChange(event)}
                    handleInputPasswordChange={(event) => this.handleLoginInputPasswordChange(event)}
                  />
                </Col>
              </Row>
            </body>
          </Container>
        </div>
      );
    }
    else if (this.state.btnRegisterMenuClick === true) {
      return (
        <div className="App">
          <Container>
            <header className="App-header">
              <Menu
                onLoginClick={() => this.MenuLogin()}
                onRegisterClick={() => this.MenuRegister()}
                onTitleClick={() => this.TitleClick()}
              />
            </header>
            <body className="App-body">
              <Row>
                <Col>
                  <Alert variant={this.state.alertColor} show="false" >{this.state.alert}</Alert>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Register
                    onRegisterClick={() => this.RegisterClick()}
                    handleRegisterInputChange={(event) => this.handleRegisterInputChange(event)}
                  />
                </Col>
              </Row>
            </body>
          </Container>
        </div>
      );
    }
    else if (this.state.loggedIn === true && this.state.jwt && this.state.admin === true) {
      return (
        <div className="App">
          <header className="App-header">
            <MenuDash
              LogoutClick={() => this.LogoutClick()}
              onTitleClick={() => this.TitleClick()}
              name={() => ("Herzlich Willkommen, " + this.state.loggedInFirstname)}
            />
          </header>
          <AdminDashboard
            AdminTageHinzufügen={() => this.AdminTageHinzufügen()}
            TageBearbeiten={() => this.TageBearbeiten()}
            BenutzerAnzeigen={() => this.BenutzerAnzeigen()}
            MenüsHinzufügen={() => this.MenüsHinzufügen()}
            AdminAlleBuchungen={() => this.AdminAlleBuchungen()}

            //Tage bearbeiten

            tageBearbeiten={this.state.tageBearbeiten}

            foodDays={() => this.state.foodDays}
            Suche={() => this.state.tageBearbeitenSuche}
            SucheChange={(event) => this.handleTageBearbeitenSucheChange(event)}
            FoodDayDetails={(id, date) => this.handleFoodDayDetailsClick(id, date)}

            //alle Buchungen

            alleBuchungenAdmin={this.state.alleBuchungenAdmin}

            Zurück={() => this.Zurück()}
            bookedDaysAll={() => this.state.bookedDaysAll}
            userList={() => this.state.userList}
            AdminBuchungenSucheChange={(event) => this.handleAdminBuchungenSucheChange(event)}
            buchungsSuche={() => this.state.adminBuchungenSuche}
            Gezahlt={(id) => this.Gezahlt(id)}

            //Tage bearbeiten Details

            foodDayChange={this.state.foodDayChange}

            Speichern={() => this.onUpdateFoodDay()}
            FoodDayBearbeitenZurück={() => this.FoodDayBearbeitenZurück()}
            TagLöschen={() => this.FoodDayLöschen()}
            Menus={() => this.state.menus}
            foodDayDate={() => this.state.clickedFoodDayDate}
            handleChangeFoodDayMenuChange={(event) => this.handleChangeFoodDayMenuChange(event)}

            //Tage hinzufügen

            adminTageHinzufügen={this.state.adminTageHinzufügen}
            createFooddayWeekday={this.state.createFooddayWeekday}

            TagErstellen={() => this.TagErstellen()}
            handleCreateFoodDayDateChange={(event) => this.handleCreateFoodDayDateChange(event)}
            handleCreateFoodDayMenuChange={(event) => this.handleCreateFoodDayMenuChange(event)}

            //Benutzer anzeigen

            benutzerAnzeigen={this.state.benutzerAnzeigen}

            BenutzerAnzeigenSuche={() => this.state.benutzerAnzeigenSuche}
            BenutzerAnzeigenSucheChange={(event) => this.handleBenutzerAnzeigenSuche(event)}
            UserClick={(id) => this.onUserClick(id)}
            NachrichtBearbeiten={(event) => this.handleNachrichtBearbeitenChange(event)}
            Nachricht={this.state.Nachricht}

            //Menüs hinzufügen

            menüsHinzufügenAdmin={this.state.menüsHinzufügenAdmin}

            handleCreateMenuChange={(event) => this.handleCreateMenuChange(event)}
            createMenuStarter={this.state.createMenuStarter}
            createMenuMain={this.state.createMenuMain}
            createMenuDessert={this.state.createMenuDessert}
            MenüErstellen={() => this.MenüErstellen()}
          />
        </div>
      );
    }
    else if (this.state.loggedIn === true && this.state.jwt) {
      return (
        <div className="App">
          <Container>
            <header className="App-header">
              <MenuDash
                LogoutClick={() => this.LogoutClick()}
                onTitleClick={() => this.TitleClick()}
                name={() => ("Herzlich Willkommen, " + this.state.loggedInFirstname)}
              />
            </header>
            <Row>
              <Col>
                <Dashboard
                  TageHinzufügen={() => this.TageHinzufügen()}
                  onItemClick={() => this.onItemClick()}
                  onItemClick={this.onItemClick.bind(this)}
                  NrBooked={() => this.state.NrBooked}
                  bookedByMe={() => this.state.actualBookedByMe}
                  a={() => this.state.alert}
                  c={() => this.state.alertColor}
                />
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
    else if (this.state.menü === true) {
      return (
        <div className="App">
          <Container>
            <header className="App-header">
              <MenuDash
                LogoutClick={() => this.LogoutClick()}
                onTitleClick={() => this.TitleClick()}
                name={() => ("Herzlich Willkommen, " + this.state.loggedInFirstname)}
              />
            </header>
            <body className="App-body">
              <Row>
                <Col>
                  <Alert variant={this.state.alertColor} show="false" >{this.state.alert}</Alert>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Menü
                    Abmelden={(id) => this.Abmelden(id)}
                    Zurück={() => this.Zurück()}
                    booking={() => this.state.bookedByMe}
                    id={() => this.state.clickedId}
                  />
                </Col>
              </Row>
            </body>
          </Container>
        </div>
      );
    }
    else if (this.state.tageHinzufügen === true) {
      return (
        <div className="App">
          <Container>
            <header className="App-header">
              <MenuDash
                LogoutClick={() => this.LogoutClick()}
                onTitleClick={() => this.TitleClick()}
                name={() => ("Herzlich Willkommen, " + this.state.loggedInFirstname)}
              />
            </header>
            <body className="App-body thinHeading">
              <Row>
                <Col>
                  <Alert variant={this.state.alertColor} show="false" >{this.state.alert}</Alert>
                </Col>
              </Row>
              <Row>
                <Col>
                  <TageAnmelden
                    Zurück={() => this.Zurück()}
                    foodDays={() => this.state.foodDays}
                    onApplyClick={() => this.onApplyClick()}
                    onApplyClick={this.onApplyClick.bind(this)}
                    handleWeekDayChange={(event) => this.handleWeekDayChange(event)}
                    handleAnmeldenMonatChange={(event) => this.handleAnmeldenMonatChange(event)}
                    AnmeldenMonat={this.state.AnmeldenMonat}
                    Suche={() => this.state.tageHinzufügenSuche}
                    SucheChange={(event) => this.handleTageHinzufügenSucheChange(event)}
                    ApplyAll={() => this.ApplyAll()}
                  />
                </Col>
              </Row>
            </body>
          </Container>
        </div>
      );
    }
    else if (this.state.userDetails === true) {
      return (
        <div className="App">
          <header className="App-header">
            <MenuDash
              LogoutClick={() => this.LogoutClick()}
              onTitleClick={() => this.TitleClick()}
              name={() => ("Herzlich Willkommen, " + this.state.loggedInFirstname)}
            />
          </header>
          <body className="App-body" id="body">
            <form className="form" id="TagBearbeiten">
              <UserDetails
                Zurück={() => this.UserDetailsZurück()}
                benutzer={() => this.state.userList}
                id={() => this.state.clickedUserId}
              />
            </form>
          </body>
        </div>
      );
    }
    else {
      return (
        <div className="App">
          <Container>
            <header className="App-header">
              <Menu
                onLoginClick={() => this.MenuLogin()}
                onRegisterClick={() => this.MenuRegister()}
                onTitleClick={() => this.TitleClick()}
              />
            </header>
            <body className="App-body">
              <Row>
                <Col>
                  <Alert variant={this.state.alertColor} show="false" >{this.state.alert}</Alert>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Login
                    onLoginClick={() => this.onLoginClick()}
                    onRegisterClick={() => this.RegisterClick()}
                    onRegisterNowClick={() => this.RegisterNowClick()}
                    handleInputUsernameChange={(event) => this.handleLoginInputUsernameChange(event)}
                    handleInputPasswordChange={(event) => this.handleLoginInputPasswordChange(event)}
                  />
                </Col>
              </Row>
            </body>
          </Container>
        </div>
      );
    }
  }
}

export default App;
