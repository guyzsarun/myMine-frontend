import React from "react";
import Popup from "reactjs-popup";
import "../css/CreditPopup.css";

export const CreditPopup: any = () => {
  return (
    <Popup
      trigger={<button className="creditButton"> How to Play </button>}
      modal
      closeOnDocumentClick
    >
      <div className="Credit">
        <h2>How to play</h2>
        <ul>
          <li>There are 11 bomb on the Grid</li>
          <li>Each player must find all the bomb</li>
          <li>The player with the highest score win</li>
        </ul>
        <p>Netcentric Architecture class 2019</p>
      </div>
    </Popup>
  );
};
