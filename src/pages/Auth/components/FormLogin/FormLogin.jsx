import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";
import { Alert, IconButton, Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import InputField from "../../../../components/InputField";
import FormSignUp from "../FormSignUp/FormSignUp";
const schema = yup
  .object()
  .shape({
    email: yup
      .string()
      .required("(*) Vui lòng nhập email")
      .email("Email không đúng định dạng"),
    password: yup.string().required("(*) Vui lòng nhập mật khẩu"),
  })
  .required();

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",

  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};
function FormLogin({ handleLogin, disable }) {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const isFetch = useSelector((state) => state.common.isFetch);
  const error = useSelector((state) => state.auth.error);
  const { handleSubmit } = form;

  return (
    <>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(handleLogin)}
        sx={{ mt: 1 }}
      >
        <InputField form={form} name="email" label="Email" />
        <InputField
          form={form}
          name="password"
          label="Mật khẩu"
          type="password"
        />
        <FormControlLabel
          control={
            <Checkbox
              value="remember"
              sx={{
                color: "primary.main",
                "&.Mui-checked": {
                  color: "primary.main",
                },
              }}
            />
          }
          label="Duy trì đăng nhập"
        />

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
          loading={isFetch}
        >
          ĐĂNG NHẬP
        </LoadingButton>
      </Box>
    </>
  );
}

export default React.memo(FormLogin);
