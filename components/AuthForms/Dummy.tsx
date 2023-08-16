"use client";

import { MESSAGES } from "@/constants/constant";
import { useAppSelector } from "@/redux";
import { useState } from "react";
import CustomSnackbar from "../Snackbar/CustomSnackbar";

const HomePage = () => {
  const { success } = useAppSelector((state) => state.auth);
  const [counter, setCounter] = useState(0);
  return (
    <div>
      Home Page
      {counter}
      <button onClick={() => setCounter(counter + 1)}>Add</button>
      {success && (
        <CustomSnackbar>{MESSAGES.REGISTER_SUCCESSFUL}</CustomSnackbar>
      )}
    </div>
  );
};

export default HomePage;
