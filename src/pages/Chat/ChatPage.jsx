import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import MenuIcon from "@mui/icons-material/Menu";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import MuiAppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import { styled, useTheme } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";
import { io } from "socket.io-client";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./ChatPage.css";
import ChatForm from "./components/ChatForm/ChatForm";
import MessageBox from "./components/MessageBox/MessageBox";
import UserList from "./components/UserList";
import {
  checkPasswordRoom,
  findOneRoomAction,
} from "./../../store/actions/room.action";
import FormByPass from "./components/FormByPass/FormByPass";
import Loading from "../../components/Loading/Loading";
import { Button } from "@mui/material";
const drawerWidth = 300;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function ChatPage() {
  const [content, setContent] = useState([]);
  const [clipboard, setClipboard] = useState({
    value: "",
    copied: false,
  });
  const [idOwn, setIdOwn] = useState();
  const dispatch = useDispatch();
  //
  const displayName = JSON.parse(localStorage.getItem("user"))?.displayName;
  //console.log({ displayName });
  const [users, setUsers] = useState([]);
  const { id } = useParams();

  const socket = useSelector((state) => state.socket.socket);
  const room = useSelector((state) => state.room.currentRoom.info);
  const isValid = useSelector((state) => state.room.currentRoom.isValid);
  const isFetch = useSelector((state) => state.common.isFetch);
  // const [socket, setSocket] = useState(
  //   io("http://localhost:5001", {
  //     origin: "*",
  //   })
  // );
  console.log({ room });
  const navigate = useNavigate();
  useEffect(() => {
    console.log("use Effect");

    dispatch(findOneRoomAction(id, navigate));
    setClipboard((preState) => ({ ...preState, value: room }));
    socket.on("getID", (id) => {
      setIdOwn(id);
    });
    socket.emit("join-room", { displayName, room: id });
    // socket.on("helloFirstTime", (data) => {
    //   //console.log({ data });
    //   setContent((preState) => [...preState, data]);
    // });
    // socket.on("notify-new-user-connect", (data) => {
    //   setContent((preState) => [...preState, data]);
    // });
    socket.on("get-user-list-by-room", (data) => {
      setUsers(data);
    });
    socket.on("send-client-others", (data) => {
      setContent((preState) => [...preState, data]);
    });
    socket.on("one-user-out", ({ data, message }) => {
      setContent((preState) => [...preState, message]);
      setUsers(data);
    });
    return () => {
      socket.close();
    };
  }, []);

  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleSendMessage = (e, data) => {
    e.preventDefault();
    data.idOwn = idOwn;
    socket.emit("send-message", data);
  };
  const confirmPasswordRoom = (data) => {
    dispatch(checkPasswordRoom(id, data));
  };
  if (isFetch) {
    <Loading />;
  }
  return isFetch && true ? (
    <>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          marginTop: "20%",
        }}
      >
        <Loading />
      </Box>
    </>
  ) : isValid === false ? (
    <FormByPass confirmPasswordRoom={confirmPasswordRoom} />
  ) : (
    <>
      <Box
        sx={{
          display: "flex",
          position: "relative",
          height: "100vh",
          backgroundColor: "#fff",
        }}
      >
        <CssBaseline />
        <AppBar open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" noWrap component="div">
              {"Tên phòng: " + room?.name}
            </Typography>
            <CopyToClipboard
              text={room?.name}
              onCopy={() =>
                setClipboard((preState) => ({ ...preState, copied: true }))
              }
            >
              <IconButton sx={{ mx: 1, color: "#fff" }}>
                <ContentCopyIcon />
              </IconButton>
            </CopyToClipboard>
            <Button
              sx={{
                width: "auto",
                bgcolor: "white",
                marginLeft: "auto",
                ":hover": {
                  bgcolor: "white",
                },
              }}
              onClick={() => {
                window.location.href = "/profile";
              }}
            >
              RỜI PHÒNG
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
            height: "100%",
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <List>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="icon tabs example"
              >
                <Tab
                  icon={
                    <Badge badgeContent={users.length} color="error">
                      <PersonPinIcon />
                    </Badge>
                  }
                  aria-label="person"
                />
              </Tabs>
            </List>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />

          <TabPanel value={value} index={0}>
            <UserList userList={users} idOwn={idOwn} />
          </TabPanel>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          <MessageBox content={content} idOwn={idOwn} />
          <ChatForm
            handleSendMessage={handleSendMessage}
            displayName={displayName}
          />
        </Main>
      </Box>
    </>
  );
}

export default ChatPage;
