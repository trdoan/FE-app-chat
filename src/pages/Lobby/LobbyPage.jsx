import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import MainForm from "../Home/components/MainForm";
import s from "./LobbyPage.module.scss";
function LobbyPage() {
  return (
    <>
      <Header />

      <Box className="lobbyContent" sx={{ marginTop: 10 }}>
        <h4 style={{ textAlign: "center" }}>PHÒNG CHỜ</h4>
        <Grid container className={s.video} sx={{ margin: "auto" }}>
          <Grid item className={s.container} md={8}>
            <img src="./tan.jpg" className={s.responsiveIframe} alt="" />
          </Grid>
          <Grid item md={4}>
            <MainForm />
          </Grid>
        </Grid>
      </Box>

      {/* <Footer /> */}
    </>
  );
}

export default LobbyPage;
