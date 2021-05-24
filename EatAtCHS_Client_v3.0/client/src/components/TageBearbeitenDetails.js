import React from 'react';
import '../App.css';

function TageBearbeitenDetails(props) {

  const items = props.Menus().map(item => <option value={item.id}>{item.starter}, {item.main}, {item.dessert}</option>);

  return(
    <table className="AdminZweiteUnterseite">
      <tr>
        <td className="menü">
          Datum:
        </td>
        <td>
          {props.foodDayDate().slice(8,10)}.{props.foodDayDate().slice(5,7)}.{props.foodDayDate().slice(0,4)}
        </td>
      </tr>
      <tr>
        <td>
          <label className="label">Menü</label>
          </td>
        <td>
          <select onChange={props.handleChangeFoodDayMenuChange}>
            <option value="" selected disabled hidden></option>
            {items}
          </select>
        </td>
      </tr>
      <tr>
        <td>
          <input type="button" id="deleteDay" className="buttons inputField" value="Tag löschen" onClick={() => props.TagLöschen()}></input>
        </td>
        <td>
          <input type="button" id="changeDay" className="buttons inputField" value="Speichern" onClick={() => props.Speichern()}></input>
        </td>
        <td>
          <input type="button" id="menüZurück" className="inputField" value="Zurück" onClick={() => props.FoodDayBearbeitenZurück()}></input>
        </td>
      </tr>
    </table>
  );
}

export default TageBearbeitenDetails;
