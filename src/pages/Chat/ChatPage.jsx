import Avatar from "@mui/material/Avatar";
import React, { useEffect, useState } from "react";
import "./ChatPage.css";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}
function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}
function ChatPage() {
  const { username, room } = useParams();
  const [users, setUsers] = useState([]);
  const [content, setContent] = useState([]);
  useEffect(() => {
    const socket = io("http://localhost:5000", {
      origin: "*",
    });
    console.log({ username, room });
    socket.emit("join-room", { username, room });
    socket.on("helloFirstTime", (data) => {
      setContent((preState) => [...preState, data]);
    });
    socket.on("notify-new-user-connect", (data) => {
      setContent((preState) => [...preState, data]);
    });
    socket.on("get-user-list-by-room", (data) => {
      setUsers(data);
    });
    socket.on("one-user-out", ({ data, message }) => {
      setContent((preState) => [...preState, message]);
      setUsers(data);
    });
  }, []);
  return (
    <main className="row app">
      <section className="col-md-3 col-sm-4 app__left">
        <h1 className="text-center">
          <span className="app__title">Meet Clone</span>
        </h1>
        <div className="app__title--line" />
        <div className="app__title--totat-user">
          <h5 className="text-right">Số lượng: {users?.length}</h5>
        </div>
        <div className="app__list-user">
          <ul className="app__list-user--content" id="user-list-by-room">
            {users?.map((user) => {
              return (
                <li className="app__item-user d-flex align-items-center">
                  <Avatar
                    className="mr-2"
                    alt="Remy Sharp"
                    src="https://seeklogo.com/images/V/viet-nam-logo-3D78D597F9-seeklogo.com.png"
                  />

                  <span>{user.username}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <section className="col-md-9 col-sm-8 app__right">
        <div className="app__messages">
          <div className="message-item">
            <div className="message__row1">
              <p className="message__name">Hệ thống</p>
              <p className="message__date"></p>
            </div>
            <div className="message__row2">
              {content?.map((item) => {
                return <p className="message__content">{item}</p>;
              })}
            </div>
          </div>
          <div className="app__send-messages">
            <form id="form-messages" className="form-messages">
              <div className="input-group h-100">
                <div className="input-messages__wrapper">
                  <input type="text" id="input-messages" className="input-messages" />
                </div>
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary btn-send" type="submit">
                    Gửi
                  </button>
                  <button
                    className="btn btn-outline-secondary btn-location"
                    id="btn-share-location"
                    type="button"
                  >
                    Gửi Vị Trí
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ChatPage;
