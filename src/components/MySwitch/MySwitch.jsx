import { TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import Switch from "@mui/material/Switch";

function MySwitch(props) {
  const { form, checked, onChange, inputProps } = props;
  const { errors, formState } = form;

  return <Controller control={form.control} as={<Switch />}></Controller>;
}

export default MySwitch;
