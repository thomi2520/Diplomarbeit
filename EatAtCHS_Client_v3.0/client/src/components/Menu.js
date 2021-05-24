import React from 'react';
import '../App.css';

function Menu(props) {

  return (
    <>
    <table className="MenuTable">
      <tr>
        <td className="Menu">
          <p className="SiteTitle"
        	 onClick={() => props.onTitleClick()}
           >
           Eat at CHS
           </p>
        </td>
      <td>
        <p className="MenuItem" id="MenuBtnLogin"
          onClick={() => props.onLoginClick()}
        >
          Login
        </p>
      </td>
      <td>
        <p className="MenuItem" id="MenuBtnRegister"
          onClick={() => props.onRegisterClick()}
        >Register</p>
      </td>
      <td className="MenuItemRight"> </td>
      </tr>
    </table>
    </>
  );
}

export default Menu;
