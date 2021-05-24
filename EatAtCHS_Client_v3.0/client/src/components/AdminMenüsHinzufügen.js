import React from 'react';
import '../App.css';

function AdminMenüsHinzufügen(props) {


  return(
    <body className="App-body thinHeading AdminUnterseite">
      <table>
        <tr>
          <td>
            <label className="label">Vorspeise</label>
          </td>
          <td>
            <input type="text" name="createMenuStarter" className="inputField" placeholder="Vorspeise..." value={props.createMenuStarter} onChange={props.handleCreateMenuChange}></input>
          </td>
        </tr>
        <tr>
          <td>
            <label className="label">Hauptspeise</label>
          </td>
          <td>
            <input type="text" name="createMenuMain" className="inputField" placeholder="Hauptspeise..." value={props.createMenuMain} onChange={props.handleCreateMenuChange}></input>
          </td>
        </tr>
        <tr>
          <td>
            <label className="label">Nachspeise</label>
          </td>
          <td>
            <input type="text" name="createMenuDessert" className="inputField" placeholder="Nachspeise..." value={props.createMenuDessert} onChange={props.handleCreateMenuChange}></input>
          </td>
        </tr>
        <tr>
          <td>
            <input type="button" className="inputField" value="Menü erstellen" onClick={() => props.MenüErstellen()}></input>
          </td>
          <td>
            <input type="button" className="HinzufügenZurück inputField" value="Zurück" onClick={() => props.Zurück()}></input>
          </td>
        </tr>
      </table>
    </body>
  );
}

export default AdminMenüsHinzufügen;
