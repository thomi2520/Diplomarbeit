//Benutzer Anzeigen Komponente am Admin Dashboard+

//React Imports

import React from 'react';
import '../App.css';

//Eigentliche Benutzer Anzeigen Komponente

function BenutzerAnzeigen(props) {

  let filter = props.benutzer();

  if(props.Suche() === "") {
    filter = props.benutzer();
  }
  else {
    let suche = props.Suche();
    filter = props.benutzer().filter(item => item.firstname.toUpperCase().includes(props.Suche().toUpperCase()) || item.lastname.toUpperCase().includes(props.Suche().toUpperCase()));
  }

  const items = filter.map(item => <li className="adminListe" id={item.username} onClick={() => props.UserClick(item.id)}>{item.firstname} {item.lastname}<div className="editRight"></div></li>);

  return(
    <body className="App-body AdminUnterseite thinHeading">
      <table>
      <tr>
        <td>
          Nachricht: <input type="text" className="nachricht" value={props.Nachricht} onChange={props.NachrichtBearbeiten}></input>
        </td>
      </tr>
        <tr>
          <td>
            Benutzer:
          </td>
        </tr>
        <tr>
          <td>
            Suchen <input type="text" id="benutzerSuchen" className="inputField" placeholder="suchen..." onChange={props.SucheChange}></input>
          </td>
          <td>
            <input type="button" className="HinzufügenZurück inputField" value="Zurück" onClick={() => props.Zurück()}></input>
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

export default BenutzerAnzeigen;
