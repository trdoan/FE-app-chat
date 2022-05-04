import DuoIcon from "@mui/icons-material/Duo";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Tabs, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { checkTokenAction } from "../../store/actions/auth.action";
import { findAllRoom } from "../../store/actions/room.action";
import UserUpdate from "./components/FormUserUpdate/UserUpdate";
import TableRoom from "./components/TableRoom/TableRoom";

const data = [
  {
    ariaLabel: "info",
    icon: <ManageAccountsIcon />,
    content: "Hồ sơ",
  },
  {
    ariaLabel: "room",
    icon: <DuoIcon />,
    content: "Phòng chat",
  },
];
function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={{ width: "100%" }}
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
function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.auth.isLogin);
  isLogin === false && navigate("/");
  const { socket } = useSelector((state) => state.socket);
  const { roomList } = useSelector((state) => state.room);
  const [value, setValue] = useState(0);
  const token = localStorage.getItem("token");
  // const user = JSON.parse(localStorage.getItem("user"));
  const user = useSelector((state) => state.user.info);

  useEffect(async () => {
    await dispatch(checkTokenAction(token));
    await dispatch(findAllRoom());
    socket.on("send-rooms-to-client", () => {
      dispatch(findAllRoom());
    });
  }, [token]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderItem = () => {
    let temp = "1";
    return data?.map((item, index) => {
      temp = temp + 1;
      return (
        <Tab
          {...a11yProps(temp)}
          icon={item.icon}
          label={item.content}
          iconPosition="start"
          key={index}
        ></Tab>
      );
    });
  };
  return (
    <>
      <Header user={user} position="relative" />
      <Box
        sx={{
          bgcolor: "background.paper",

          display: "flex",
          justifyContent: "center",
        }}
      >
        <Tabs
          // variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{ margin: "auto", width: "auto" }}
          component="div"
        >
          {renderItem()}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <UserUpdate user={user} />
      </TabPanel>
      <TabPanel value={value} index={1} sx={{ widh: "100%" }}>
        <TableRoom roomList={roomList} socket={socket} />
      </TabPanel>
    </>
  );
}

export default React.memo(ProfilePage);
