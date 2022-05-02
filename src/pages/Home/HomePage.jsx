import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Banner from "./components/Banner/Banner";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import MainForm from "./components/MainForm";
import Pricing from "./components/Pricing/Pricing";
import TeamTest from "./components/TeamTest";
import "./HomePage.css";
import { checkTokenAction } from "../../store/actions/auth.action";

function HomePage() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.isLogin);
  const token = localStorage.getItem("token");
  useEffect(() => {
    dispatch(checkTokenAction(token));
  }, []);

  return (
    <div>
      <Header isLogin={isLogin} />
      <Banner isLogin={isLogin} />
      <Pricing />

      <TeamTest />
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default HomePage;
