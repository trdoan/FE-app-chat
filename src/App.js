import { Route, Routes } from "react-router-dom";

import "./App.css";
import ChatPage from "./pages/Chat/ChatPage";
import HomePage from "./pages/Home/HomePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/room/:room/:username" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
