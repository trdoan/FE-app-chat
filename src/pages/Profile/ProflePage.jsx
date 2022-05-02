import DuoIcon from "@mui/icons-material/Duo";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Button, Tabs, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tab from "@mui/material/Tab";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import { createRoom, findAllRoom } from "../../store/actions/room.action";
import FormSignUp from "../Auth/components/FormSignUp/FormSignUp";
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
export default function ProfilePage() {
  const dispatch = useDispatch();
  const { socket } = useSelector((state) => state.socket);
  const { roomList } = useSelector((state) => state.room);
  const [value, setValue] = useState("1");
  useEffect(() => {
    dispatch(findAllRoom());
    socket.on("send-rooms-to-client", () => {
      dispatch(findAllRoom());
    });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderItem = () => {
    let temp = "1";
    return data?.map((item, index) => {
      temp = temp + 1;
      return (
        <Tab {...a11yProps(temp)} icon={item.icon} label={item.content} iconPosition="start"></Tab>
      );
    });
  };
  return (
    <>
      <Header position="relative" />
      <Box
        sx={{
          bgcolor: "background.paper",
          display: "flex",
          height: "100vh",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider", width: "250px" }}
        >
          {renderItem()}
        </Tabs>
        <TabPanel value={value} index={0}>
          <FormSignUp />
        </TabPanel>
        <TabPanel value={value} index={1} sx={{ widh: "100%" }}>
          <TableRoom roomList={roomList} socket={socket} />
        </TabPanel>
      </Box>
    </>
  );
}
