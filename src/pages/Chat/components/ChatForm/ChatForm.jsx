import { Send } from "@mui/icons-material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { Box, Button, Popover, TextField } from "@mui/material";
import Picker from "emoji-picker-react";
import React, { useState } from "react";

function ChatForm({ handleSendMessage, username }) {
  const [message, setMessage] = useState({ username, message: "" });
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setMessage((s) => ({ ...s, message: s.message + emojiObject.emoji }));
    setChosenEmoji(emojiObject);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleForm = (e) => {
    handleSendMessage(e, message);
    setMessage((t) => ({ ...t, message: "" }));
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Box component="form" onSubmit={(e) => handleForm(e)} sx={{ position: "relative" }}>
      <Box sx={{ display: "flex" }}>
        <TextField
          variant="outlined"
          label="Tin nhắn: "
          value={message.message}
          fullWidth
          onChange={(e) => {
            setMessage((s) => ({ ...s, message: e.target.value }));
          }}
        />
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          sx={{ top: "-10%", right: 0 }}
        >
          <Picker onEmojiClick={onEmojiClick} />
        </Popover>

        <Button onClick={handleClick}>
          <EmojiEmotionsIcon />
        </Button>
        <Button type="submit">
          <Send />
        </Button>
      </Box>
    </Box>
  );
}

export default React.memo(ChatForm);
