import ChatIcon from "@mui/icons-material/Chat";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import MuiAppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import { styled, useTheme } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import { listUserTest } from "./user.js";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import "./ChatPage.css";
import UserList from "./components/UserList";
import Badge from "@mui/material/Badge";
const drawerWidth = 300;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
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
  //
  const username = "test";
  const [users, setUsers] = useState([]);
  const { room } = useParams();
  useEffect(() => {
    const socket = io("http://localhost:5001", {
      origin: "*",
    });
    console.log({ username, room });
    setClipboard((preState) => ({ ...preState, value: room }));
    socket.emit("join-room", { username, room });
    socket.on("helloFirstTime", (data) => {
      setContent((preState) => [...preState, data]);
    });
    socket.on("notify-new-user-connect", (data) => {
      setContent((preState) => [...preState, data]);
    });
    socket.on("get-user-list-by-room", (data) => {
      setUsers(data);
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
  const [open, setOpen] = React.useState(false);

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
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
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
            {"ID: " + room}
          </Typography>
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
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <List>
            <Tabs value={value} onChange={handleChange} aria-label="icon tabs example">
              <Tab icon={<ChatIcon />} aria-label="chat" />
              <Tab
                icon={
                  <Badge badgeContent={listUserTest.length} color="error">
                    <PersonPinIcon />
                  </Badge>
                }
                aria-label="person"
              />
            </Tabs>
          </List>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          <UserList userList={listUserTest} />
        </TabPanel>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
    // <main className="row app">
    //   <section className="col-md-3 col-sm-4 app__left">
    //     <h1 className="text-center">
    //       <img
    //         src="https://www.gstatic.com/meet/meet_logo_dark_2020q4_8955caafa87e403c96e24e8aa63f2433.svg"
    //         alt="logo"
    //         style={{ maxWidth: 200 }}
    //       />
    //       <CopyToClipboard
    //         text={clipboard.value}
    //         onCopy={() => {
    //           setClipboard((prevState) => ({
    //             ...prevState,
    //             copied: true,
    //           }));
    //         }}
    //       >
    //         <Button variant="contained" sx={{ display: "block", mx: "auto" }}>
    //           COPY ID ROOM
    //         </Button>
    //       </CopyToClipboard>
    //     </h1>
    //     <div className="app__title--line" />

    //     <Box sx={{ ml: "auto", position: "relative", height: 30 }}>
    //       <Badge
    //         badgeContent={users.length || listUserTest.length}
    //         showZero
    //         color="primary"
    //         sx={{
    //           marginLeft: "auto",
    //           position: "absolute",
    //           right: 0,
    //         }}
    //       >
    //         <PersonOutlineIcon />
    //       </Badge>
    //     </Box>

    //     <div className="app__list-user">
    //       <ul className="app__list-user--content" id="user-list-by-room">
    //         {listUserTest.map((user) => {
    //           return (
    //             <li className="app__item-user d-flex align-items-center">
    //               <Avatar
    //                 className="mr-2"
    //                 alt="Remy Sharp"
    //                 src="https://seeklogo.com/images/V/viet-nam-logo-3D78D597F9-seeklogo.com.png"
    //               />

    //               <span>{user.username}</span>
    //             </li>
    //           );
    //         })}
    //       </ul>
    //     </div>
    //   </section>
    //   <section className="col-md-9 col-sm-8 app__right">
    //     <GridVideo data={listUserTest} />
    //   </section>
    //   {/* <section className="col-md-9 col-sm-8 app__right">
    //     <div className="app__messages">
    //       <div className="message-item">
    //         <div className="message__row1">
    //           <p className="message__name">Hệ thống</p>
    //           <p className="message__date"></p>
    //         </div>
    //         <div className="message__row2">
    //           {content?.map((item) => {
    //             return <p className="message__content">{item}</p>;
    //           })}
    //         </div>
    //       </div>
    //       <div className="app__send-messages">
    //         <form id="form-messages" className="form-messages">
    //           <div className="input-group h-100">
    //             <div className="input-messages__wrapper">
    //               <input type="text" id="input-messages" className="input-messages" />
    //             </div>

    //             <div className="input-group-append">
    //               <button className="btn btn-outline-secondary btn-send" type="submit">
    //                 Gửi
    //               </button>
    //               <button
    //                 className="btn btn-outline-secondary btn-location"
    //                 id="btn-share-location"
    //                 type="button"
    //               >
    //                 Gửi Vị Trí
    //               </button>
    //             </div>
    //           </div>
    //         </form>
    //       </div>
    //     </div>
    //   </section> */}
    // </main>
  );
}

export default ChatPage;
