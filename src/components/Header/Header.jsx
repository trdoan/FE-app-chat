import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
export default function Header({ position }) {
  let user = JSON.parse(localStorage.getItem("user"));
  const isLogin = useSelector((state) => state.auth.isLogin);
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
          {isLogin && <Typography>{`Hi ${user.displayName}`}</Typography>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
