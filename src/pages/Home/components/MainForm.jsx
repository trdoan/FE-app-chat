import { Button, Container, FormControl } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
function MainForm({ user, login }) {
  const history = useNavigate();
  const [lobby, setLobby] = useState({
    username: user ? user.givenName : "",
    roomID: "",
  });

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setLobby({ ...lobby, [name]: value });
    console.log("lobby", lobby);
  };

  const handleNewRoom = (event) => {
    event.preventDefault();

    setLobby((preState) => ({ ...preState, roomID: uuidv4() }));
  };
  const handleSubmitForm = (event) => {
    event.preventDefault();
    alert("submit form");
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" noValidate autoComplete="off">
        <FormControl variant="standard" fullWidth>
          <TextField
            fullWidth
            id="room"
            label="RoomID"
            variant="standard"
            style={{ margin: "10px 0px" }}
            name="roomID"
            value={lobby.roomID}
            onChange={(e) => handleChange(e)}
          />
          <Box spacing={3}>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              fullWidth
              sx={{ my: 1 }}
              onClick={(e) => handleNewRoom(e)}
            >
              NEW ROOM
            </Button>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              onClick={() => {
                history(`/room/${lobby.roomID}`);
              }}
            >
              JOIN ROOM
            </Button>
          </Box>
        </FormControl>
      </Box>
    </Container>
  );
}

export default MainForm;
