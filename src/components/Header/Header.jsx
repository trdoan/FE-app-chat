import LogoutIcon from "@mui/icons-material/Logout";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import { Popover } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { checkTokenAction } from "../../store/actions/auth.action";

function Header({ position, user }) {
  // const [user, setUser] = useState("");

  // const userLocal = JSON.parse(localStorage.getItem("user"));
  // console.log({ user }, { userLocal });
  const isLogin = useSelector((state) => state.auth.isLogin);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    localStorage.clear();
    await dispatch(checkTokenAction());
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position={position ? position : "fixed"}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => {
              navigate("/");
            }}
          >
            <VideoCameraBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Google Meet
          </Typography>
          {!isLogin && (
            <Button color="inherit">
              <Link
                to="/login"
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Đăng nhập
              </Link>
            </Button>
          )}
          {isLogin && (
            <>
              <Typography
                onClick={handleClick}
              >{`Hi ${user?.displayName}`}</Typography>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Typography
                  sx={{ p: 2, cursor: "pointer" }}
                  onClick={handleLogout}
                >
                  Đăng xuất
                  <LogoutIcon sx={{ mx: 1 }} />
                </Typography>
              </Popover>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default React.memo(Header);
