import React, { Component } from "react";
import "./arrive.css";
import {
  Button,
  InputGroup,
  FormControl,
  Form,
  Row,
  Col,
  Alert,
  Nav,
  Navbar
} from "react-bootstrap";

class arriveClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertMessage: "",
      alertVariant: "light",

      baseURL: "http://localhost:7000/",

      username: "",
      password: "",
      jwt: "",
      isLoggedIn: false,

      allDays: [],
      allUsers: [],
      consumedDays: [],
      unSetConsumedDay: []
    };
  }

  handleChangeUserName = event => {
    let input1 = event.target.value;
    this.setState({ username: input1 });
  };

  handleChangePW = event => {
    let input2 = event.target.value;
    this.setState({ password: input2 });
  };

  handleClickLogin = async event => {
    event.preventDefault();
    debugger;

    if (this.state.username === "" || this.state.password === "") {
      this.setState({ alertMessage: "Username or password is empty" });
      this.setState({ alertVariant: "danger" });
    } else {
      try {
        let data = JSON.stringify({
          username: this.state.username,
          password: this.state.password
        });

        let response = await fetch(this.state.baseURL + "api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: data
        });

        let result = await response.json();

        if (result.jwt) {
          this.setState({
            jwt: result.jwt,
            isLoggedIn: true,
            alertMessage: "",
            alertVariant: "light"
          });

          let responseBookedDays = await fetch(
            this.state.baseURL + "bookedDay/arrive/",
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
              Authorization: this.state.jwt
            }
          );

          let resultDays = await responseBookedDays.json();

          this.setState({
            allDays: resultDays,
            unSetConsumedDay: resultDays
          });

          let responseUsers = await fetch(this.state.baseURL + "user/", {
            method: "GET",
            headers: { "Content-Type": "appliction/json" },
            Authorization: this.state.jwt
          });

          let resultUsers = await responseUsers.json();

          this.setState({
            allUsers: resultUsers
          });
        } else {
          this.setState({
            alertMessage: "Login unsuccessful!",
            alertVariant: "danger"
          });
        }
      } catch (e) {
        this.setState({ alertMessage: "Error " + e.message });
        this.setState({ alertVariant: "danger" });
      }
    }
  };

  handleSetConsumed = async id => {
    try {
      let data = JSON.stringify({
        consumed: true
      });

      let response = await fetch(this.state.baseURL + "bookedDay/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: data
      });

      let result = await response.json();

      let responseBookedDays = await fetch(
        this.state.baseURL + "bookedDay/arrive/",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          Authorization: this.state.jwt
        }
      );

      let resultDays = await responseBookedDays.json();

      /*let sortedList = resultDays.sort((day1, day2) =>
        day1.lastName.localCompare(day2.lastName)
      );*/

      this.setState({
        allDays: resultDays //sortedList
      });
    } catch (e) {
      this.setState({ alertMessage: "Error " + e.message });
      this.setState({ alertVariant: "danger" });
    }
  };

  handleUnSetConsumed = async id => {
    try {
      let data = JSON.stringify({
        consumed: false
      });

      let response = await fetch(this.state.baseURL + "bookedDay/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: data
      });

      let result = await response.json();

      let responseBookedDays = await fetch(
        this.state.baseURL + "bookedDay/arrive/",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          Authorization: this.state.jwt
        }
      );

      let resultDays = await responseBookedDays.json();

      /*let sortedList = resultDays.sort((day1, day2) =>
        day1.lastName.localCompare(day2.lastName)
      );*/

      this.setState({
        allDays: resultDays //sortedList
      });
    } catch (e) {
      this.setState({ alertMessage: "Error " + e.message });
      this.setState({ alertVariant: "danger" });
    }
  };

  handleClickLogout = event => {
    this.setState({
      isLoggedIn: false,
      jwt: "",
      username: "",
      password: "",
      alertMessage: "",
      alertVariant: "light"
    });
  };

  handleClickSubmitCheck = event => {
    this.setState({
      alertMessage: "Submitted",
      alertVariant: "success"
    });
  };

  onUserClick = id => {
    let days = this.state.allDays.filter(day => day.id !== id);
    this.setState({ allDays: days });
    this.handleSetConsumed(id);
  };

  onUserUnSetClick = id => {
    let setDays = this.state.allDays.filter(day => day.consumed === true);
    let days = setDays.filter(day => day.id !== id);
    this.setState({ unSetConsumedDay: days });
    this.handleUnSetConsumed(id);
  };

  render() {
    if (this.state.isLoggedIn === true) {
      return (
        <>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Eat@CHS</Navbar.Brand>
            <Nav className="mr-auto">
              {/*<Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#features"></Nav.Link>
                            <Nav.Link href="#pricing"></Nav.Link>*/}

              <Nav.Link onClick={this.handleClickLogout}>Logout</Nav.Link>
              <Nav.Link onClick={this.handleClickSubmitCheck}>Submit</Nav.Link>
            </Nav>
          </Navbar>
          <br />
          <br />
          <Row>
            <Col>
              <p className="listHead">Anwesend</p>
              <div class="container">
                {this.state.allDays
                  .filter(day => day.consumed === true)
                  .map(day => {
                    return (
                      <div>
                        <div className="allday" key={day.foodDay.date}>
                          <div
                            className="alldayName"
                            onClick={id => this.onUserUnSetClick(day.id)}
                          >
                            {day.name}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </Col>
            <Col>
              <p className="listHead">nicht Anwesend</p>
              <div class="container">
                {this.state.allDays
                  .filter(day => day.consumed === false)
                  .map(day => {
                    return (
                      <div>
                        <div className="allday" key={day.foodDay.date}>
                          <div
                            className="alldayName"
                            onClick={id => this.onUserClick(day.id)}
                          >
                            {day.name}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </Col>
            <Col>
              <div>
                <Alert className="mt-4" variant={this.state.alertVariant}>
                  {this.state.alertMessage}
                </Alert>
              </div>
            </Col>
          </Row>
        </>
      );
    } else {
      return (
        <>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Eat@CHS</Navbar.Brand>
            <Nav className="mr-auto">
              {/*<Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#features"></Nav.Link>
                            <Nav.Link href="#pricing"></Nav.Link>*/}
            </Nav>
          </Navbar>
          <br />
          <br />
          <br />
          <Row>
            <Col></Col>
            <Col>
              <Form>
                <Form.Group controlId="formBasicUsername">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="input"
                    onChange={this.handleChangeUserName}
                    placeholder="Username ..."
                    value={this.state.username}
                  />
                  <Form.Text className="text-muted">
                    Please enter username!
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPW">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    onChange={this.handleChangePW}
                    placeholder="Password ..."
                    value={this.state.password}
                  />
                  <Form.Text className="text-muted">
                    Please enter password!
                  </Form.Text>
                </Form.Group>
                <Button
                  variant="secondary"
                  onClick={this.handleClickLogin}
                  type="submit"
                >
                  Login
                </Button>
              </Form>
            </Col>
            <Col>
              <div>
                <Alert className="mt-4" variant={this.state.alertVariant}>
                  {this.state.alertMessage}
                </Alert>
              </div>
            </Col>
          </Row>
        </>
      );
    }
  }
}

export default arriveClient;
