import React, { useEffect, useState } from "react";
import "./MessageBox.css";
function MessageBox({ content, idOwn }) {
  useEffect(() => {
    document
      .getElementById("myBox")
      .scrollTo(0, document.getElementById("myBox").scrollHeight);
  }, [content]);
  //console.log(content);
  return (
    <ul
      id="myBox"
      style={{ height: "80%", overflowY: "auto", overflowX: "hidden" }}
    >
      {content?.map((message, i) => {
        return message.displayName === "Hệ thống" ? (
          <li key={i} className="nofiSystem">
            <b>{message.displayName}</b>
            <div>{message.message}</div>
          </li>
        ) : message.displayName == null ||
          (message.displayName != null &&
            (message.message == "" || message.message == "\n")) ? (
          ""
        ) : (
          <li
            key={i}
            className={idOwn === message.idOwn ? "yourMess" : "otherMess"}
          >
            <div className="titleName">
              <b className="author">{message.displayName}</b>
            </div>
            <div className="content">
              <div className="empty"></div>
              <div className="directionMess" style={{ position: "relative" }}>
                {message.message.split(/\n/).map((line, i) => (
                  <div key={i} className="contentMess">
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default MessageBox;
