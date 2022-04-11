import {
  Avatar,
  Box,
  Button,
  FormControlLabel,
  Typography,
} from "@mui/material";
import React from "react";
import InputField from "../../../../components/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import FaceIcon from "@mui/icons-material/Face";
const schema = yup
  .object()
  .shape({
    userName: yup.string().required("(*) Vui lòng nhập tên người dùng"),
    email: yup
      .string()
      .required("(*) Vui lòng nhập email")
      .email("Email không đúng định dạng"),
    password: yup.string().required("(*) Vui lòng nhập mật khẩu"),
  })
  .required();

function FormSignUp({ handleFormSubmit }) {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      userName: "",
    },
    resolver: yupResolver(schema),
  });
  const { handleSubmit } = form;
  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit((data) => console.log({ data }))}
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
          ĐĂNG KÝ
        </Typography>
      </Box>

      <InputField form={form} name="userName" label="Tên người dùng" />
      <InputField form={form} name="email" label="Email" />
      <InputField
        form={form}
        name="password"
        label="Mật khẩu"
        type="password"
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          mt: 3,
          mb: 2,
          bgcolor: "primary.main",
          ":hover": { bgcolor: "primary.main" },
        }}
      >
        ĐĂNG KÝ
      </Button>
    </Box>
  );
}

export default FormSignUp;
