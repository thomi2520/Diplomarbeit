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

import moment from 'moment';
import 'moment/locale/de';
moment.locale("de");

//Eigentliche Tage hinzufügen Komponente

class TageHinzufügen extends React.Component {
  constructor(props)	{
    super(props);
    this.state	=	{
      days: this.props.foodDays().map(item => item = {...item, clicked: "UserDayItem"}),
      output: [],
      test: "",
      suche: this.props.Suche()
    }
  }

  componentWillMount() {

    let filter = this.state.days;

    if(this.props.Suche() === "") {
      filter = this.state.days;
    }
    else {
      filter = this.state.days.filter(item => (item.date.slice(8,10) + "." + item.date.slice(5,7) + "." + item.date.slice(0,4)).includes(this.props.Suche()));
    }

    let items = filter.map( item =>
      <li
        className={item.clicked}
        id={item.date.slice(0,10)}
        onClick={() => this.click(item.id, item.date.slice(0,10))}
        key={item.id}>
        {moment(item.date.slice(0,10), "YYYY-MM-DD").format("dddd")}, {item.date.slice(8,10)}.{item.date.slice(5,7)}.{item.date.slice(0,4)}
        <div
          className="editRight">
          {item.menu.starter}, {item.menu.main}, {item.menu.dessert}
        </div>
      </li>
    );

    this.setState({output: items});

    this.render();
  }


  click (id, date) {


    let d = this.state.days.map((day) => {

      if(day.id === id && day.clicked === "UserDayItem") {
        day.clicked = "FoodDayClicked";
      }
      else if (day.id === id && day.clicked === "FoodDayClicked") {
        day.clicked = "UserDayItem";
      }
      return day;
    });

    this.setState({days: d});
    this.props.onApplyClick(id);
    this.componentWillMount();
  }

  render() {
    return(
        <Container>
          <Row>
            <Col>
              Suchen <input type="text" className="inputField" placeholder="Suchen..." onChange={this.props.SucheChange} ></input>
            </Col>
            <Col>
              <Button as="input" type="button" variant="outline-dark" className="inputButtonSmall" value="Zurück" onClick={() => this.props.Zurück()}/>
            </Col>
            <Col>
              <Button as="input" type="button" variant="outline-dark" className="inputButtonSmall" value="Anmelden" onClick={() => this.props.ApplyAll()}/>
            </Col>
          </Row>
          <Row>
            <Col>
              Tage auswählen:
            </Col>
          </Row>
          <Row>
            <Col>
              <ul className="bookedDaysList">
                {this.state.output}
              </ul>
            </Col>
          </Row>
        </Container>
    );
  }
}

export default TageHinzufügen;
