import React from "react";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Link from "next/link";

const ForgotterPassword = () => {
  return (
    <Box className="flex justify-between items-center">
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              disableRipple
              className="paleViolet"
              sx={{
                color: "#737373",
                "&.Mui-checked": {
                  color: "#633CFF",
                },
              }}
            />
          }
          label="Remember me"
          className=" bodyTwo !text-nickel"
        />
      </FormGroup>
      <Typography variant="body2" className="bodyOne !text-hanPurple">
        <Link href="/forgottenPassword">Forgot password?</Link>
      </Typography>
    </Box>
  );
};

export default ForgotterPassword;
