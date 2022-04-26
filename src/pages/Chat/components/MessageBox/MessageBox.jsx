import React from "react";

function MessageBox({ content }) {
  return (
    <ul style={{ height: "80%" }}>
      {content?.map((message, i) => {
        return (
          <li key={i}>
            <b>{message.username}</b>
            <div>{message.message}</div>
          </li>
        );
      })}
    </ul>
  );
}

export default MessageBox;
