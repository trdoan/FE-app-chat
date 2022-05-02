import { Send } from "@mui/icons-material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { Box, Button, Popover, TextField } from "@mui/material";
import Picker from "emoji-picker-react";
import React, { useEffect, useState, useRef } from "react";

function ChatForm({ handleSendMessage, displayName }) {
  const [message, setMessage] = useState({ displayName, message: "" });
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
    console.log(e);
    handleSendMessage(e, message);
    setMessage((t) => ({ ...t, message: "" }));
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  //
  return (
    <Box
      component="form"
      onSubmit={(e) => handleForm(e)}
      sx={{ position: "relative" }}
    >
      <Box sx={{ display: "flex" }}>
        <TextField
          id="outlined-multiline-static"
          variant="outlined"
          label="Tin nhắn: "
          multiline
          rows={2}
          value={message.message}
          fullWidth
          onChange={(e) => {
            setMessage((s) => ({ ...s, message: e.target.value }));
          }}
          onKeyDown={(e) => {
            if (e.keyCode === 13 && !e.shiftKey) {
              handleForm(e);
            }
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
        <Button
          type="submit"
          disabled={message.message == "" || message.message == "\n"}
        >
          <Send />
        </Button>
      </Box>
    </Box>
  );
}

export default React.memo(ChatForm);
