import React from 'react';
import '../App.css';
import moment from 'moment';
import 'moment/locale/de';
moment.locale("de");

function TageBearbeiten(props) {

  let filter = props.foodDays();

  if(props.Suche() === "") {
    filter = props.foodDays();
  }
  else {

    filter = props.foodDays().filter(item => (item.date.slice(8,10) + "." + item.date.slice(5,7) + "." + item.date.slice(0,4)).includes(props.Suche()));
  }


  const items = filter.map(item => <li className="adminListe" id={item.date.slice(0,10)} onClick={() => props.FoodDayDetails(item.id, item.date.slice(0,10))}>{moment(item.date.slice(0,10), "YYYY-MM-DD").format("dddd")}, {item.date.slice(8,10)}.{item.date.slice(5,7)}.{item.date.slice(0,4)}<div className="editRight">{item.menu.starter}, {item.menu.main}, {item.menu.dessert}</div></li>);

  return(
    <body className="App-body AdminUnterseite seperationLine thinHeading">
      <table>
        <tr>
          <td>
            Suchen <input type="text" className="inputField" placeholder="Suchen..." onChange={props.SucheChange}></input>
          </td>
          <td>
            <input type="button" className="inputField" className="HinzufügenZurück inputField" value="Zurück" onClick={() => props.Zurück()}></input>
          </td>
        </tr>
        <tr>
          <td>
            <ul className="bookedDaysList">
              {items}
            </ul>
          </td>
        </tr>
      </table>
    </body>
  );
}

export default TageBearbeiten;
