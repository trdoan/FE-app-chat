import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import LoginPage from "./pages/Auth/LoginPage";
import ChatPage from "./pages/Chat/ChatPage";
import HomePage from "./pages/Home/HomePage";
// var jwt = require("jsonwebtoken");
function App() {
  // var decoded = jwt.verify(
  //   "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2V4cGlyZWQiOiIzLzEvMjA0NSAzOjA1OjIxIFBNIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6ImQ5Njk5Yjc3LWYwMDMtNDJjNC1iMDUwLTI2NjA3MDc5YTc4OSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InRyYW5xdWFuZ3NpZ2xAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiREFBTEwiLCJuYmYiOjE2NDYxMjE5MjEsImV4cCI6MTY0NjEyNTUyMX0.ZYYI6nHwpU6_oaSF7PXVIE1v74AS6FzUSvAjygIDQ3o",
  //   "Cybersoft@123"
  // );
  // console.log(decoded); // bar
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/room/:room" element={<ChatPage />} />
      </Routes>

      <ToastContainer
        limit={3}
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />
    </div>
  );
}

export default App;
