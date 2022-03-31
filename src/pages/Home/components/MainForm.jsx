import { Button, Container, FormControl } from "@mui/material";
import { Input } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function MainForm({ user }) {
  console.log(user);
  const [lobby, setLobby] = useState({
    username: user ? user.givenName : "",
    roomID: "",
  });
  const history = useNavigate();
  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    // const temp = { ...lobby, [name]: value };
    setLobby({ ...lobby, [name]: value });
    console.log(lobby);
  };
  const handleSubmitForm = (event) => {
    event.preventDefault();
    alert("submit form");
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" noValidate autoComplete="off">
        <FormControl variant="standard" fullWidth>
          <Input
            defaultValue="Hello world"
            fullWidth
            id="username"
            label="Username"
            variant="standard"
            style={{ margin: "10px 0px" }}
            value="asdasd "
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <TextField
            fullWidth
            id="room"
            label="RoomID"
            variant="standard"
            style={{ margin: "10px 0px" }}
            name="roomID"
            onChange={(e) => handleChange(e)}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            onClick={() => {
              history(`/room/${lobby.roomID}/${lobby.username}`);
            }}
          >
            JOIN ROOM
          </Button>
        </FormControl>
      </Box>
    </Container>
  );
}

export default MainForm;
