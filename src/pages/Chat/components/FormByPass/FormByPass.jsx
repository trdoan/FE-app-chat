import { yupResolver } from "@hookform/resolvers/yup";
import { Send } from "@mui/icons-material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { Box, Button, Popover, TextField } from "@mui/material";
import Picker from "emoji-picker-react";
import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import InputField from "../../../../components/InputField";

const schema = yup
  .object()
  .shape({
    password: yup.string().required("(*) Vui lòng nhập mật khẩu"),
  })
  .required();
function FormByPass({ confirmPasswordRoom }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [password, setPassword] = React.useState("");
  const form = useForm({
    defaultValues: {
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const { handleSubmit } = form;

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  //
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(confirmPasswordRoom)}
      sx={{ position: "relative", mx: 5, my: 5 }}
    >
      <InputField
        id="outlined-multiline-static"
        variant="outlined"
        name="password"
        label="Mật khẩu "
        type="password"
        form={form}
        rows={2}
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <Button type="submit">VÀO PHÒNG</Button>
    </Box>
  );
}

export default React.memo(FormByPass);
