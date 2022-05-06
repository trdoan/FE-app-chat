import { yupResolver } from "@hookform/resolvers/yup";
import FaceIcon from "@mui/icons-material/Face";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  Modal,
  Switch,
  Typography,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import InputField from "../../../../components/InputField";
import MySwitch from "../../../../components/MySwitch/MySwitch";
import { signUpAction } from "../../../../store/actions/auth.action";
import { updateUserAction } from "../../../../store/actions/users.action";
import { ERROR_RESPONSE } from "../../../../store/constants/auth.constant";
import { styled } from "@mui/material/styles";
import {
  createRoom,
  deleteRoom,
  findAllRoom,
} from "../../../../store/actions/room.action";
import { YouTube } from "@mui/icons-material";

const schema = yup
  .object()
  .shape({
    name: yup.string().required("(*) Vui lòng nhập tên phòng"),
    password: yup
      .string()
      .optional()
      .min(6, "(*) Mật khẩu có tối thiểu 6 ký tự"),
  })
  .required();
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //   width: 400,
  minWidth: 180,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

function RoomForm(createNewRoom) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { socket } = useSelector((state) => state.socket);
  const [disable, setDisable] = useState(false);

  const handleCreateRoom = async (data) => {
    setDisable(true);
    //console.log(data);
    await dispatch(
      createRoom({
        name: data.name,
        type: checked ? "PRIVATE" : "PUBLIC",
        password: checked && data.password,
      })
    );
    handleClose();
    socket.emit("new-room-created", data);
    setDisable(false);
  };
  useEffect(() => {}, []);
  const form = useForm({
    defaultValues: {
      name: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const { handleSubmit } = form;
  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        TẠO PHÒNG
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(handleCreateRoom)}
            sx={{ mt: 1 }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                <FaceIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                PHÒNG CHAT
              </Typography>
            </Box>

            <InputField form={form} name="name" label="Tên phòng" />

            <FormGroup>
              <FormControlLabel
                control={<MaterialUISwitch sx={{ m: 1 }} />}
                label="Riêng tư"
                checked={checked}
                onChange={handleChange}
              />
            </FormGroup>
            {checked && (
              <InputField form={form} name="password" label="Mật khẩu phòng" />
            )}
            {auth.error?.status && (
              <Alert severity="error">{auth.error?.message}</Alert>
            )}
            {auth.success?.status === "SUCCESS" && (
              <Alert severity="success">{auth.success?.message}</Alert>
            )}
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: "primary.main",
                ":hover": { bgcolor: "primary.main" },
              }}
              loading={disable}
            >
              TẠO PHÒNG
            </LoadingButton>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default RoomForm;
