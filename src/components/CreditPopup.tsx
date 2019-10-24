import React from "react"
import Popup from "reactjs-popup"
import "../css/CreditPopup.css"

export const CreditPopup: any = () => {
  return (
    <Popup
      trigger={<button className="button"> Credit </button>}
      modal
      closeOnDocumentClick
    >
      <div className="Credit">
        <h2>CREDIT</h2>
        <ul>
          <li>Wasuthon Klyhirun 6031847021</li>
          <li>Sarun Nuntaviriyakul 6031851521</li>
          <li>Phumiphat Phumariyapong 6031826921</li>
          <li>Rhach Roongniran 60369696969</li>
        </ul>
        <p>Netcentric Architecture 2019</p>
      </div>
    </Popup>
  )
}