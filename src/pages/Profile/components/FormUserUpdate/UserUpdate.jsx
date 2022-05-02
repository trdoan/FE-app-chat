import { yupResolver } from "@hookform/resolvers/yup";
import FaceIcon from "@mui/icons-material/Face";
import LoadingButton from "@mui/lab/LoadingButton";
import { Avatar, Box, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import InputField from "../../../../components/InputField";
import { signUpAction } from "../../../../store/actions/auth.action";
import { updateUserAction } from "../../../../store/actions/users.action";
import { ERROR_RESPONSE } from "../../../../store/constants/auth.constant";

const schema = yup
  .object()
  .shape({
    displayName: yup.string().required("(*) Vui lòng nhập tên người dùng"),
    currentPassword: yup.string().required("(*) Vui lòng nhập mật khẩu cũ"),
    newPassword: yup.string().required("(*) Vui lòng nhập mật khẩu mới"),
    confirmPassword: yup
      .string()
      .required("Password is mendatory")
      .oneOf([yup.ref("newPassword")], "(*) Mật khẩu chưa giống"),
  })
  .required();

function UserUpdate() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = JSON.parse(localStorage.getItem("user"));

  const [disable, setDisable] = useState(false);
  const handleUpdateUser = async (data) => {
    setDisable(true);
    // await dispatch(signUpAction(data));
    await dispatch(updateUserAction(data));

    setDisable(false);
  };
  useEffect(() => {
    return () => {
      dispatch({ type: ERROR_RESPONSE, payload: null });
    };
  }, []);
  const form = useForm({
    defaultValues: {
      displayName: user?.displayName,
      email: user?.email,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });
  const { handleSubmit } = form;
  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(handleUpdateUser)}
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
          HỒ SƠ
        </Typography>
      </Box>
      <InputField form={form} name="displayName" label="Tên người dùng" />
      <InputField form={form} name="email" label="Email" disabled={true} />
      <InputField
        form={form}
        name="currentPassword"
        label="Mật khẩu hiện tại"
        type="password"
      />
      <InputField
        form={form}
        name="newPassword"
        label="Mật khẩu mới"
        type="password"
      />
      <InputField
        form={form}
        name="confirmPassword"
        label="Xác nhận mật khẩu mới"
        type="password"
      />
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
        CẬP NHẬT
      </LoadingButton>
    </Box>
  );
}

export default UserUpdate;
