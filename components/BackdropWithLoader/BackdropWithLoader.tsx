"use client";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";

type BackdropWithLoaderProps = {
  openModal: boolean;
};

const BackdropWithLoader = ({ openModal }: BackdropWithLoaderProps) => {
  const [open, setOpen] = useState(openModal);
  const handleClose = () => setOpen(false);
  return (
    <Backdrop open={open} onClick={handleClose}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default BackdropWithLoader;
