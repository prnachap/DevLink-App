"use client";

import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput, { OutlinedInputProps } from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";
import { forwardRef } from "react";

const StyledInput = styled(OutlinedInput)(({ theme }) => ({
  color: theme.palette.custom?.darkCharcoal,
  "label + &": {
    marginTop: theme.spacing(1),
  },

  "& .MuiInputBase-input": {
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
  },

  "&.Mui-focused": {
    "& .MuiOutlinedInput-notchedOutline": {
      boxShadow: `0px 0px 32px 0px rgba(99, 60, 255, 0.25)`,
      borderWidth: "1px",
      borderColor: theme.palette.custom.hanPurple,
    },
  },
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  "& .MuiFormHelperText-root": {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    right: 0,
    color: `${theme.palette.custom?.coralRed} !important`,
  },
}));

type CustomInputProps = OutlinedInputProps & {
  helperText?: string;
};
type Ref = any;
const CustomInput = forwardRef<Ref, CustomInputProps>((props, ref) => {
  const { helperText, label, ...otherProps } = props;

  const labelClassName = props?.error ? "text-coralRed" : "text-darkCharcoal";
  return (
    <StyledFormControl error={props.error} variant="outlined" fullWidth={true}>
      <InputLabel
        shrink
        htmlFor={props.id}
        className={`left-[-12px] text-sm ${labelClassName}`}
      >
        {label}
      </InputLabel>
      <StyledInput {...otherProps} ref={ref} />
      {props.error && (
        <FormHelperText id={"error-text"}>{helperText}</FormHelperText>
      )}
    </StyledFormControl>
  );
});

CustomInput.displayName = "CustomInput";

export default CustomInput;
