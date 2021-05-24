//Tage hinzufügen Komponente für den User

import React from 'react';
import '../App.css';

//Bootstrap allgemein Import

import 'bootstrap/dist/css/bootstrap.min.css';

//Bootstrap Komponenten Imports

import Container from 'react-bootstrap/container';
import Row from 'react-bootstrap/row';
import Col from 'react-bootstrap/col';
import Button from 'react-bootstrap/button';
import Form from 'react-bootstrap/Form';

import moment from 'moment';
import 'moment/locale/de';
moment.locale("de");

//Eigentliche Tage hinzufügen Komponente

function TageAnmelden(props) {

    return(
        <Container>
          <Row>
            <Col>
              <Button as="input" type="button" variant="outline-dark" className="inputButtonSmall" value="Zurück" onClick={() => props.Zurück()}/>
            </Col>
            <Col>
              <Button as="input" type="button" variant="outline-dark" className="inputButtonSmall" value="Anmelden" onClick={() => props.ApplyAll()}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form className=" shadow inputForm tageAnmeldenForm">
                <Form.Group>
                  <label>
                    Monat:
                    <select name="AnmeldenMonat" onChange={props.handleAnmeldenMonatChange}>
                      <option disabled active selected></option>
                      <option value="01">Jänner</option>
                      <option value="02">Februar</option>
                      <option value="03">März</option>
                      <option value="04">April</option>
                      <option value="05">Mai</option>
                      <option value="06">Juni</option>
                      <option value="07">Juli</option>
                      <option value="08">August</option>
                      <option value="09">September</option>
                      <option value="10">Oktober</option>
                      <option value="11">November</option>
                      <option value="12">Dezember</option>
                    </select>
                  </label>
                </Form.Group>
                <Form.Group>
                  <label><input type="checkbox" name="Montag" value="Montag" onChange={props.handleWeekDayChange}/> Montag</label>
                </Form.Group>
                <Form.Group>
                  <label><input type="checkbox" name="Dienstag" value="Dienstag" onChange={props.handleWeekDayChange}/> Dienstag</label>
                </Form.Group>
                <Form.Group>
                  <label><input type="checkbox" name="Mittwoch" value="Mittwoch" onChange={props.handleWeekDayChange}/> Mittwoch</label>
                </Form.Group>
                <Form.Group>
                  <label><input type="checkbox" name="Donnerstag" value="Donnerstag" onChange={props.handleWeekDayChange}/> Donnerstag</label>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
    );
}

export default TageAnmelden;
