import React from 'react';
import '../App.css';

function UserDetails(props) {

const output = props.benutzer().filter( item => item.id === props.id());

  return(
    <table>
      <tr>
        <td className="menü">
          Username:
        </td>
        <td>
          {output[0].username}
        </td>
      </tr>
      <tr>
        <td className="menü">
          Vorname:
        </td>
        <td>
          {output[0].firstname}
        </td>
      </tr>
      <tr>
        <td className="menü">
        Nachname:
        </td>
        <td>
          {output[0].lastname}
        </td>
      </tr>
      <tr className="menü">
        <td>
          Email:
        </td>
        <td>
          {output[0].email}
        </td>
      </tr>
      <tr>
        <td>
          <input type="button" id="menüZurück" className="inputField" value="Zurück" onClick={() => props.Zurück()}></input>
        </td>
      </tr>
    </table>
  );
}

export default UserDetails;
