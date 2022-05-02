import { yupResolver } from "@hookform/resolvers/yup";
import FaceIcon from "@mui/icons-material/Face";
import LoadingButton from "@mui/lab/LoadingButton";
import { Avatar, Box, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import InputField from "../../../../components/InputField";
import { signUpAction } from "../../../../store/actions/auth.action";

const schema = yup
  .object()
  .shape({
    displayName: yup.string().required("(*) Vui lòng nhập tên người dùng"),
    email: yup.string().required("(*) Vui lòng nhập email").email("Email không đúng định dạng"),
    password: yup.string().required("(*) Vui lòng nhập mật khẩu"),
  })
  .required();

function FormSignUp() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [disable, setDisable] = useState(false);
  const handleSignUp = async (data) => {
    setDisable(true);
    await dispatch(signUpAction(data));
    setDisable(false);
  };

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      displayName: "",
    },
    resolver: yupResolver(schema),
  });
  const { handleSubmit } = form;
  return (
    <Box component="form" noValidate onSubmit={handleSubmit(handleSignUp)} sx={{ mt: 1 }}>
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
          ĐĂNG KÝ
        </Typography>
      </Box>

      <InputField form={form} name="displayName" label="Tên người dùng" />
      <InputField form={form} name="email" label="Email" />
      <InputField form={form} name="password" label="Mật khẩu" type="password" />
      {auth.error?.status && <Alert severity="error">{auth.error?.message}</Alert>}
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
        ĐĂNG KÝ
      </LoadingButton>
    </Box>
  );
}

export default FormSignUp;
