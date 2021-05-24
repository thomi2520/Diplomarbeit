import React from 'react';
import '../App.css';
import moment from 'moment';

function AdminTageHinzufügen(props) {

  const items = props.Menus().map(item => <option value={item.id}>{item.starter}, {item.main}, {item.dessert}</option>);

  return(
    <body className="thinHeading AdminZweiteUnterseite" id="body">
      <table className="">
      <tr>
        <td className="bold">
          Tag erstellen:
        </td>
      </tr>
        <tr>
          <td>
            <label className="label">Datum</label>
            </td>
          <td>
            <input type="date" id="addDayDate" className="inputField" placeholder="Datum..." value={props.addDayDate} onChange={props.handleCreateFoodDayDateChange}></input>
          </td>
        </tr>
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
            <input type="button" id="btnTagHinzufügen" className="buttons inputField" value="Tag hinzufügen" onClick={() => props.TagErstellen()}></input>
          </td>
          <td>
            <input type="button" id="HinzufügenZurück" className="inputField" value="Zurück" onClick={() => props.Zurück()}></input>
          </td>
        </tr>
      </table>
    </body>
  );
}

export default AdminTageHinzufügen;
