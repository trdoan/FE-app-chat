import React from "react";
import "./MessageBox.css";
function MessageBox({ content, idOwn }) {
  console.log(idOwn);
  return (
    <ul style={{ height: "80%", overflowY: "auto", overflowX: "hidden" }}>
      {content?.map((message, i) => {
        return message.username == "Hệ thống" ? (
          <li key={i} className="nofiSystem">
            <b>{message.username}</b>
            <div>{message.message}</div>
          </li>
        ) : message.username == null ||
          (message.username != null && message.message == "") ? (
          ""
        ) : (
          <li
            key={i}
            className={idOwn === message.idOwn ? "yourMess" : "otherMess"}
          >
            <div className="empty"></div>
            <div className="directionMess">
              <b>{message.username}</b>
              <div>{message.message}</div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default MessageBox;
