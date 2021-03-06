import { TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

function InputField(props) {
  const { form, name, label, disabled, type, value } = props;
  const { errors, formState } = form;
  const hasError = formState.touched[name] && errors[name];
  return (
    <Controller
      name={name}
      control={form.control}
      as={<TextField />}
      fullWidth
      type={type}
      label={label}
      value={value}
      disabled={disabled}
      margin="normal"
      autoComplete="off"
      error={!!hasError || !!errors[name]}
      helperText={errors[name]?.message}
      sx={{
        "& label.Mui-focused": {
          color: errors[name] ? "error" : "primary.main",
        },
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: errors[name] ? "error" : "primary.main",
          },
        },
      }}
    ></Controller>
  );
}

export default InputField;
