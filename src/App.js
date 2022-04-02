import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import ChatPage from "./pages/Chat/ChatPage";
import HomePage from "./pages/Home/HomePage";
var Peer = require("simple-peer");

var peer1 = new Peer({ initiator: true });
var peer2 = new Peer();
function App() {
  useEffect(() => {
    var Peer = require("simple-peer");

    // get video/voice stream
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false,
      })
      .then(gotMedia)
      .catch(() => {});

    function gotMedia(stream) {
      var peer1 = new Peer({ initiator: true, stream: stream });
      var peer2 = new Peer();

      peer1.on("signal", (data) => {
        peer2.signal(data);
      });

      peer2.on("signal", (data) => {
        peer1.signal(data);
      });

      peer2.on("stream", (stream) => {
        // got remote video stream, now let's show it in a video tag
        var video = document.querySelector("video");

        if ("srcObject" in video) {
          video.srcObject = stream;
        } else {
          video.src = window.URL.createObjectURL(stream); // for older browsers
        }

        video.play();
      });
    }
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/room/:room" element={<ChatPage />} />
      </Routes>
      <div id="video"></div>
    </div>
  );
}

export default App;
