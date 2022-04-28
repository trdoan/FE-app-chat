import React, { useEffect, useState } from "react";
import "./MessageBox.css";
function MessageBox({ content, idOwn }) {
  useEffect(() => {
    document
      .getElementById("myBox")
      .scrollTo(0, document.getElementById("myBox").scrollHeight);
  }, [content]);
  console.log(content);
  return (
    <ul
      id="myBox"
      style={{ height: "80%", overflowY: "auto", overflowX: "hidden" }}
    >
      {content?.map((message, i) => {
        return message.username === "Hệ thống" ? (
          <li key={i} className="nofiSystem">
            <b>{message.username}</b>
            <div>{message.message}</div>
          </li>
        ) : message.username == null ||
          (message.username != null &&
            (message.message == "" || message.message == "\n")) ? (
          ""
        ) : (
          <li
            key={i}
            className={idOwn === message.idOwn ? "yourMess" : "otherMess"}
          >
            <div className="empty"></div>
            <div className="directionMess" style={{ position: "relative" }}>
              <b className="author">{message.username}</b>
              {message.message.split(/\n/).map((line, i) => (
                <div key={i} className="contentMess">
                  {line}
                </div>
              ))}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default MessageBox;
