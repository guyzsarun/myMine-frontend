import React from "react";
import Popup from "reactjs-popup";
import "../css/CreditPopup.css";

export const CreditPopup: any = () => {
  return (
    <Popup
      trigger={<button className="creditButton"> Credit </button>}
      modal
      closeOnDocumentClick
    >
      <div className="Credit">
        <h2>CREDIT</h2>
        <ul>
          <li>Wasuthon Klyhirun 6031847021</li>
          <li>Sarun Nuntaviriyakul 6031851521</li>
          <li>Phumiphat Phumariyapong 6031826921</li>
          <li>Rhach Roongnirandon 6031838421</li>
        </ul>
        <p>Netcentric Architecture class 2019</p>
      </div>
    </Popup>
  );
};
