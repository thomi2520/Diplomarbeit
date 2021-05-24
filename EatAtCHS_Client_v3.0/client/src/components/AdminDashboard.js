import React from 'react';
import '../App.css';

import TageBearbeiten from './TageBearbeiten.js';
import AdminAlleBuchungen from './AdminAlleBuchungen.js';
import TageBearbeitenDetails from './TageBearbeitenDetails.js';
import AdminTageHinzufügen from './AdminTageHinzufügen.js';
import BenutzerAnzeigen from './BenutzerAnzeigen.js';
import AdminMenüsHinzufügen from './AdminMenüsHinzufügen.js'



class AdminDashboard extends React.Component {

  constructor(props)	{
    super(props);
    this.state	=	{
    }
  }

  render() {
    if(this.props.foodDayChange === true) {
      return(
        <body className="AdminDashNavigation thinHeading" id="body">
          <table>
            <tr>
              <td className="AdminMenu">
              <table className="AdminMenu">
                <tr>
                  <td>
                    <input type="button" className="adminBtn" value="Buchungen anzeigen" onClick={() => this.props.AdminAlleBuchungen()}></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="button" className="adminBtn" value="Benutzer anzeigen" onClick={() => this.props.BenutzerAnzeigen()}></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="button" className="adminBtn" value="Tage hinzufügen" onClick={() => this.props.AdminTageHinzufügen()}></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="button" className="adminBtn active" value="Tage anzeigen" onClick={() => this.props.TageBearbeiten()}></input>
                  </td>
                </tr>
              </table>
              </td>
              <td>
                <TageBearbeiten
                  foodDays={this.props.foodDays}
                  Zurück={() => this.props.Zurück()}
                  Suche={this.props.Suche}
                  SucheChange={(event) => this.props.SucheChange(event)}
                  FoodDayDetails={(id, date) => this.props.FoodDayDetails(id, date)}
                />
              </td>
              <td>
                <TageBearbeitenDetails
                  Speichern={() => this.props.Speichern()}
                  FoodDayBearbeitenZurück={() => this.props.FoodDayBearbeitenZurück()}
                  TagLöschen={() => this.props.TagLöschen()}
                  Menus={this.props.Menus}
                  foodDayDate={this.props.foodDayDate}
                  handleChangeFoodDayMenuChange={(event) => this.props.handleChangeFoodDayMenuChange(event)}
                />
              </td>
            </tr>
          </table>
        </body>
      );
    }
    else if(this.props.tageBearbeiten === true) {
      return(
        <body className="AdminDashNavigation thinHeading" id="body">
          <table>
            <tr>
              <td>
              <table>
                <tr>
                  <td>
                    <input type="button" className="adminBtn" value="Buchungen anzeigen" onClick={() => this.props.AdminAlleBuchungen()}></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="button" className="adminBtn" value="Benutzer anzeigen" onClick={() => this.props.BenutzerAnzeigen()}></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="button" className="adminBtn" value="Tage hinzufügen" onClick={() => this.props.AdminTageHinzufügen()}></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="button" className="adminBtn active" value="Tage anzeigen" onClick={() => this.props.TageBearbeiten()}></input>
                  </td>
                </tr>
              </table>
              </td>
              <td>
                <TageBearbeiten
                  foodDays={this.props.foodDays}
                  Zurück={() => this.props.Zurück()}
                  Suche={this.props.Suche}
                  SucheChange={(event) => this.props.SucheChange(event)}
                  FoodDayDetails={(id, date) => this.props.FoodDayDetails(id, date)}
                />
              </td>
              <td>
              </td>
            </tr>
          </table>
        </body>
      );
    }
    else if(this.props.adminTageHinzufügen === true) {
      return(
        <body className="AdminDashNavigation thinHeading" id="body">
          <table>
            <tr>
              <td>
              <table>
                <tr>
                  <td>
                    <input type="button" className="adminBtn" value="Buchungen anzeigen" onClick={() => this.props.AdminAlleBuchungen()}></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="button" className="adminBtn" value="Benutzer anzeigen" onClick={() => this.props.BenutzerAnzeigen()}></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="button" className="adminBtn active" value="Tage hinzufügen" onClick={() => this.props.AdminTageHinzufügen()}></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="button" className="adminBtn" value="Tage anzeigen" onClick={() => this.props.TageBearbeiten()}></input>
                  </td>
                </tr>
              </table>
              </td>
              <td>
                <TageBearbeiten
                  foodDays={this.props.foodDays}
                  Zurück={() => this.props.Zurück()}
                  Suche={this.props.Suche}
                  SucheChange={(event) => this.props.SucheChange(event)}
                  FoodDayDetails={(id, date) => this.props.FoodDayDetails(id, date)}
                />
              </td>
              <td>
                <AdminTageHinzufügen
                  Zurück={() => this.props.Zurück()}
                  Menus={this.props.Menus}
                  TagErstellen={() => this.props.TagErstellen()}
                  handleCreateFoodDayDateChange={(event) => this.props.handleCreateFoodDayDateChange(event)}
                  handleCreateMenuChange={(event) => this.props.handleCreateMenuChange(event)}
                  createMenuStarter={this.props.createMenuStarter}
                  createMenuMain={this.props.createMenuMain}
                  createMenuDessert={this.props.createMenuDessert}
                  createFooddayWeekday={this.props.createFooddayWeekday}
                  MenüErstellen={() => this.props.MenüErstellen()}
                />
              </td>
            </tr>
          </table>
        </body>
      );
    }
    else if(this.props.alleBuchungenAdmin === true) {
      return(
        <body className="AdminDashNavigation thinHeading" id="body">
          <table>
            <tr>
              <td>
              <table>
                <tr>
                  <td>
                    <input type="button" className="adminBtn active" value="Buchungen anzeigen" onClick={() => this.props.AdminAlleBuchungen()}></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="button" className="adminBtn" value="Benutzer anzeigen" onClick={() => this.props.BenutzerAnzeigen()}></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="button" className="adminBtn" value="Tage hinzufügen" onClick={() => this.props.AdminTageHinzufügen()}></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="button" className="adminBtn" value="Tage anzeigen" onClick={() => this.props.TageBearbeiten()}></input>
                  </td>
                </tr>
              </table>
              </td>
              <td>
                <AdminAlleBuchungen
                  Zurück={() => this.props.Zurück()}
                  bookedDaysAll={this.props.bookedDaysAll}
                  userList={this.props.userList}
                  AdminBuchungenSucheChange={(event) => this.props.AdminBuchungenSucheChange(event)}
                  buchungsSuche={this.props.buchungsSuche}
                  Gezahlt={(id) => this.props.Gezahlt(id)}
                />
              </td>
            </tr>
          </table>
        </body>
      );
    }
    else if(this.props.benutzerAnzeigen === true) {
      return(
        <body className="AdminDashNavigation thinHeading" id="body">
          <table>
            <tr>
              <td>
              <table>
                <tr>
                  <td>
                    <input type="button" className="adminBtn" value="Buchungen anzeigen" onClick={() => this.props.AdminAlleBuchungen()}></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="button" className="adminBtn active" value="Benutzer anzeigen" onClick={() => this.props.BenutzerAnzeigen()}></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="button" className="adminBtn" value="Tage hinzufügen" onClick={() => this.props.AdminTageHinzufügen()}></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="button" className="adminBtn" value="Tage anzeigen" onClick={() => this.props.TageBearbeiten()}></input>
                  </td>
                </tr>
              </table>
              </td>
              <td>
                <BenutzerAnzeigen
                  benutzer={this.props.userList}
                  Zurück={() => this.props.Zurück()}
                  Suche={this.props.BenutzerAnzeigenSuche}
                  SucheChange={(event) => this.props.BenutzerAnzeigenSucheChange(event)}
                  UserClick={(id) => this.props.UserClick(id)}
                  NachrichtBearbeiten={(event) => this.props.NachrichtBearbeiten(event)}
                  Nachricht={this.props.Nachricht}
                />
              </td>
            </tr>
          </table>
        </body>
      );
    }
    else if(this.props.menüsHinzufügenAdmin === true) {
      return(
        <body className="AdminDashNavigation thinHeading" id="body">
          <table>
            <tr>
              <td>
              <table>
                <tr>
                  <td>
                    <input type="button" className="adminBtn" value="Buchungen anzeigen" onClick={() => this.props.AdminAlleBuchungen()}></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="button" className="adminBtn" value="Benutzer anzeigen" onClick={() => this.props.BenutzerAnzeigen()}></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="button" className="adminBtn" value="Tage hinzufügen" onClick={() => this.props.AdminTageHinzufügen()}></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="button" className="adminBtn" value="Tage anzeigen" onClick={() => this.props.TageBearbeiten()}></input>
                  </td>
                </tr>
              </table>
              </td>
              <td>
                <AdminMenüsHinzufügen
                  Zurück={() => this.props.Zurück()}
                  handleCreateMenuChange={(event) => this.props.handleCreateMenuChange(event)}
                  createMenuStarter={this.props.createMenuStarter}
                  createMenuMain={this.props.createMenuMain}
                  createMenuDessert={this.props.createMenuDessert}
                  MenüErstellen={() => this.props.MenüErstellen()}
                />
              </td>
            </tr>
          </table>
        </body>
      );
    }
    else{
      return(
        <body className="AdminDashNavigation thinHeading" id="body">
          <table>
            <tr>
              <td>
              <table>
                <tr>
                  <td>
                    <input type="button" className="adminBtn" value="Buchungen anzeigen" onClick={() => this.props.AdminAlleBuchungen()}></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="button" className="adminBtn" value="Benutzer anzeigen" onClick={() => this.props.BenutzerAnzeigen()}></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="button" className="adminBtn" value="Tage hinzufügen" onClick={() => this.props.AdminTageHinzufügen()}></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="button" className="adminBtn" value="Tage anzeigen" onClick={() => this.props.TageBearbeiten()}></input>
                  </td>
                </tr>
              </table>
              </td>
            </tr>
          </table>
        </body>
      );
    }
  }
}

export default AdminDashboard;
