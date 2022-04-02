import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import "./ChatPage.css";
function ChatPage() {
  // const { room } = useParams();
  // const username = useSelector((state) => state.user.google.name);

  // const [users, setUsers] = useState([]);
  const [content, setContent] = useState([]);
  const [clipboard, setClipboard] = useState({
    value: "",
    copied: false,
  });
  //
  const username = "test";
  const [users, setUsers] = useState([]);
  const { room } = useParams();
  useEffect(() => {
    const socket = io("http://localhost:5001", {
      origin: "*",
    });
    console.log({ username, room });
    setClipboard((preState) => ({ ...preState, value: room }));
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
    return () => {
      socket.close();
    };
  }, []);
  return (
    <main className="row app">
      <section className="col-md-3 col-sm-4 app__left">
        <h1 className="text-center">
          <span className="app__title">Meet Clone</span>
          <CopyToClipboard
            text={clipboard.value}
            onCopy={() => {
              setClipboard((prevState) => ({
                ...prevState,
                copied: true,
              }));
            }}
          >
            <Button variant="contained" sx={{ display: "block", mx: "auto" }}>
              COPY ID ROOM
            </Button>
          </CopyToClipboard>
        </h1>
        <div className="app__title--line" />

        <Box sx={{ ml: "auto", position: "relative", height: 30 }}>
          <Badge
            badgeContent={users.length}
            color="primary"
            sx={{ marginLeft: "auto", position: "absolute", right: 0 }}
          >
            <PersonOutlineIcon />
          </Badge>
        </Box>

        <div className="app__list-user">
          <video
            src=""
            style={{ transform: "rotateY(180deg)", width: 200 }}
          ></video>
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
                  <input
                    type="text"
                    id="input-messages"
                    className="input-messages"
                  />
                </div>

                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary btn-send"
                    type="submit"
                  >
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
