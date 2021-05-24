import React from 'react';
import '../App.css';

function AdminAlleBuchungen(props) {

  let bookedDays = [];
  bookedDays = props.bookedDaysAll();

  if(props.buchungsSuche() !== "") {
    bookedDays = props.bookedDaysAll().filter((item) => {

      let user = props.userList().filter(user => user.id == item.uID)[0];

      if(item.foodDay.date.includes(props.buchungsSuche())) {
        return true;
      }
      if(user.firstname.toUpperCase().includes(props.buchungsSuche().toUpperCase())) {
        return true;
      }
      if(user.lastname.toUpperCase().includes(props.buchungsSuche().toUpperCase())) {
        return true;
      }
      if((user.firstname + " " + user.lastname).toUpperCase().includes(props.buchungsSuche().toUpperCase())) {
        return true;
      }
      return false;
    });
  }
  else {
    bookedDays = props.bookedDaysAll();
  }

  const items = bookedDays.map(item =>
    <li className={"adminBuchungsListe-" + item.paid.toString()} id={item.foodDay.date.slice(0,10)} onClick={(id) => props.Gezahlt(item.id)}>
      {item.foodDay.date.slice(8,10)}.{item.foodDay.date.slice(5,7)}.{item.foodDay.date.slice(0,4)}
      <div className="editRight">
        {props.userList().filter(user => user.id == item.uID)[0].firstname} {props.userList().filter(user => user.id == item.uID)[0].lastname}
      </div>
    </li>
    );

  return(
    <body className="App-body AdminUnterseite thinHeading" id="body">
      <table>
      <tr>
        <td>
          Alle Buchungen:
        </td>
        <td>
        <input type="button" className="HinzufügenZurück inputField" value="Zurück" onClick={() => props.Zurück()}></input>
        </td>
      </tr>
      <tr>
        <td>
          Nach Benutzer oder Tag suchen: <input type="text" className="inputField" placeholder="suchen..." onChange={props.AdminBuchungenSucheChange}></input>
        </td>
      </tr>
        <tr>
          <td>
            <div className="">
              <ul className="bookedDaysList">
                {items}
              </ul>
            </div>
          </td>
        </tr>
      </table>
    </body>
  );
}

export default AdminAlleBuchungen;
