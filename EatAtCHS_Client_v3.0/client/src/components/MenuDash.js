//Top Menu Komponente auf allen Seiten außer Login und Register verwendet

//React Imports

import React from 'react';
import '../App.css';

//Eigentliche MenuDash Komponente

function MenuDash(props) {
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
        <p className="MenuItem" id="MenuBtnLogout"
          onClick={() => props.LogoutClick()}
        >
          Logout
        </p>
      </td>
      <td className="MenuItemRight"> </td>
      </tr>
    </table>
    <p className="Welcome">{props.name()}</p>
    </>
  );
}

export default MenuDash;
