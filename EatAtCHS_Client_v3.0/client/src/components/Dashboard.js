//Dashboard Komponente für den User

//React Imports

import React from 'react';
import '../App.css';

//Bootstrap allgemein Import

import 'bootstrap/dist/css/bootstrap.min.css';

//Bootstrap Komponenten Imports

import Container from 'react-bootstrap/container';
import Row from 'react-bootstrap/row';
import Col from 'react-bootstrap/col';
import Button from 'react-bootstrap/button';
import Alert from 'react-bootstrap/alert';

import moment from 'moment';
import 'moment/locale/de';
moment.locale("de");

//Eigentliche Dashboard Komponente

function Dashboard(props) {

  const items = props.bookedByMe().map((item) => {
    return (
      <li
        className={"UserDayItem-" + item.paid.toString()}
        id={item.foodDay.date.slice(0, 10)}
        onClick={() => props.onItemClick(item.foodDay.date.slice(0, 10))}
      >
        {moment(item.foodDay.date.slice(0, 10),
          "YYYY-MM-DD").format("dddd")},
        {item.foodDay.date.slice(8, 10)}.
        {item.foodDay.date.slice(5, 7)}.
        {item.foodDay.date.slice(0, 4)}
        <div
          className="editRight"
        >
          {item.foodDay.menu.starter},
          {item.foodDay.menu.main},
          {item.foodDay.menu.dessert}
        </div>
      </li>
    );
  });

let offeneZahlung = props.bookedByMe().filter(item => ! item.paid).length;

  //Ergebnis: squares = [1, 4, 9, 16, 25]

  return (
    <body className="App-body thinHeading">
      <Container>
        <Row>
          <Col>
            <Alert variant={props.a} show="false" >{props.c}</Alert>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button as="input" type="button" variant="outline-dark" className="inputButtonBig" value="Tage hinzufügen" onClick={() => props.TageHinzufügen()} />
          </Col>
          <Col>
            <div>Gebuchte Tage: {props.NrBooked()}</div>
            <div>Offener Betrag: {offeneZahlung * 5}€</div>
          </Col>
        </Row>
        <Row>
          <Col>
            Meine nächsten Termine:
          </Col>
        </Row>
        <Row>
          <Col>
            <ul className="bookedDaysList">
              {items}
            </ul>
          </Col>
        </Row>
      </Container>
    </body>
  );
}

export default Dashboard;
