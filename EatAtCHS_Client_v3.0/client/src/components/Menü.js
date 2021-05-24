//Menü Details Komponente für den User

//React Imports

import React from 'react';
import '../App.css';

//Bootstrap allgemein Import

import 'bootstrap/dist/css/bootstrap.min.css';

//Bootstrap Komponenten Imports

import Button from 'react-bootstrap/button';

//Eigentliche Menü Komponente

function Menü(props) {

const output = props.booking().filter( item => item.foodDay.date.slice(0,10) === props.id());

  return(
    <table className="menüTable">
      <tr>
        <td className="menü">
          Tag:
        </td>
        <td className="menü">
          {output[0].foodDay.date.slice(8,10)}.{output[0].foodDay.date.slice(5,7)}.{output[0].foodDay.date.slice(0,4)}
        </td>
      </tr>
      <tr>
        <td className="menü">
          Vorspeise:
        </td>
        <td className="menü">
          {output[0].foodDay.menu.starter}
        </td>
      </tr>
      <tr>
        <td className="menü">
        Hauptspeise:
        </td>
        <td className="menü">
          {output[0].foodDay.menu.main}
        </td>
      </tr>
      <tr>
        <td className="menü">
        Nachspeise:
        </td>
        <td className="menü">
          {output[0].foodDay.menu.dessert}
        </td>
      </tr>
      <tr>
        <td className="menü">
          Preis:
        </td>
        <td className="menü">
          5€
        </td>
      </tr>
      <tr>
        <td className="menü">
          <Button as="input" type="button" variant="outline-dark" className="inputButtonSmall" value="Zurück" onClick={() => props.Zurück()}/>
        </td>
      </tr>
    </table>
  );
}

export default Menü;
