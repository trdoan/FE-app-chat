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
export default function Header({ isLogin }) {
  let user = JSON.parse(localStorage.getItem("user"));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
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
            <Avatar>
              <Typography>{"Hi" + user.name[0]}</Typography>
            </Avatar>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
