"use client";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React, { useState } from "react";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomSnackbar = ({ children, severity }: AlertProps) => {
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={severity ?? "success"}
        className="w-full"
      >
        {children}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
