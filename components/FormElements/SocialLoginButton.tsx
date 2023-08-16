"use client";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { signIn } from "next-auth/react";

type SocialLoginButtonProps = {
  helperText: string;
};

const SocialLoginButton = ({ helperText }: SocialLoginButtonProps) => {
  return (
    <Box>
      <Box className="flex items-center my-5">
        <hr className="flex-grow border-gray-300 border-t" />
        <span className="px-2 bodyOne !font-bold">{helperText}</span>
        <hr className="flex-grow border-gray-300 border-t" />
      </Box>
      <Box className="flex justify-between items-center gap-4">
        <Button
          variant="contained"
          className="bg-blue-600 text-white hover:bg-blue-600 hover:bg-opacity-70"
          fullWidth
          startIcon={<GoogleIcon />}
          onClick={() => signIn("google")}
        >
          Google
        </Button>
        <Button
          variant="contained"
          className="bg-black text-white hover:bg-black hover:bg-opacity-70"
          fullWidth
          startIcon={<GitHubIcon />}
        >
          GitHub
        </Button>
      </Box>
    </Box>
  );
};

export default SocialLoginButton;
