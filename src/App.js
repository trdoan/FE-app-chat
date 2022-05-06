import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import LoginPage from "./pages/Auth/LoginPage";
import ChatPage from "./pages/Chat/ChatPage";
import HomePage from "./pages/Home/HomePage";
import PageNotFound from "./pages/page-not-found/pageNotFound";
import ProfilePage from "./pages/Profile/ProflePage";

function App() {
  // const isLoading = useSelector((state) => state.common.isFetch);

  return false ? (
    "đang tải"
  ) : (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/profile"
          element={[
            // <Header position="relative" user={user} />,
            <ProfilePage />,
          ]}
        />
        <Route path="/room/:id" element={<ChatPage />} />
        <Route path="*" element={<PageNotFound />} />
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
