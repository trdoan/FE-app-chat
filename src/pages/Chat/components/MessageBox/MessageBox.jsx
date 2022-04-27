import React, { useEffect } from "react";
import "./MessageBox.css";
function MessageBox({ content, idOwn }) {
  useEffect(() => {
    document.getElementById("myBox").scrollTo(0, document.getElementById("myBox").scrollHeight);
  }, [content]);
  return (
    <ul id="myBox" style={{ height: "80%", overflowY: "auto", overflowX: "hidden" }}>
      {content?.map((message, i) => {
        return message.username == "Hệ thống" ? (
          <li key={i} className="nofiSystem">
            <b>{message.username}</b>
            <div>{message.message}</div>
          </li>
        ) : message.username == null || (message.username != null && message.message == "") ? (
          ""
        ) : (
          <li key={i} className={idOwn === message.idOwn ? "yourMess" : "otherMess"}>
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
