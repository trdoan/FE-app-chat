import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import { Link } from "react-router-dom";
import { Avatar, Popover } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  checkTokenAction,
  logoutAction,
} from "../../store/actions/auth.action";
import { WindowSharp } from "@mui/icons-material";
export default function Header({ position }) {
  let user = JSON.parse(localStorage.getItem("user"));
  const isLogin = useSelector((state) => state.auth.isLogin);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.clear();
    dispatch(checkTokenAction());
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
              >{`Hi ${user.displayName}`}</Typography>
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
