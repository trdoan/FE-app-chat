import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import InputField from "../../../../components/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
function FormLogin({ handleFormSubmit }) {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const { handleSubmit } = form;
  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(handleFormSubmit)}
      sx={{ mt: 1 }}
    >
      <InputField form={form} name="email" label="Email" />
      <InputField
        form={form}
        name="password"
        label="Password"
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
        // onClick={() => {
        //   toast.success("Đăng nhập thành công", {
        //     position: "bottom-left",
        //     autoClose: 3000,
        //     hideProgressBar: true,
        //     closeOnClick: true,
        //     pauseOnHover: false,
        //     draggable: false,
        //     progress: undefined,
        //   });
        // }}
      >
        ĐĂNG NHẬP
      </Button>

      <Grid container>
        <Grid item xs>
          <Button
            variant="body2"
            sx={{
              color: "primary.main",
              textDecoration: "none",
              "&:hover": {
                color: "primary.main",
                textDecoration: "none",
              },
            }}
            onClick={() => {
              toast.success("Đã gửi mật khẩu qua email", {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
              });
            }}
          >
            Quên mật khẩu?
          </Button>
        </Grid>
        <Grid item>
          <Button
            href="#"
            variant="body2"
            sx={{
              color: "primary.main",
              textDecoration: "none",
              "&:hover": {
                color: "primary.main",
                textDecoration: "none",
              },
            }}
            onClick={() => {
              toast.info("Đi tạo tài khoản nào", {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
              });
            }}
          >
            {"ĐĂNG KÝ NGAY"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FormLogin;
