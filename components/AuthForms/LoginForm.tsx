"use client";

import CustomInput from "@/components/FormElements/CustomInput";
import SocialLoginButton from "@/components/FormElements/SocialLoginButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Image from "next/image";
import Link from "next/link";
import EmailIcon from "../../public/images/icon-email.svg";
import PasswordIcon from "../../public/images/icon-password.svg";
import DevIcon from "../../public/images/logo-devlinks-large.svg";

const LoginForm = () => {
  return (
    <Box className="w-[95%] min-h-[600px] mt-10 mb-2 m-auto flex flex-col gap-5 md:w-[29rem]">
      <Image
        alt="DevLinks - Link Icon"
        src={DevIcon}
        width={182}
        height={40}
        className="mx-auto"
      />
      <Box className="bg-lotion p-10 md:bg-white md:rounded-md">
        <Typography variant="h1" className="headingOne" gutterBottom>
          Login
        </Typography>
        <Typography variant="body2" className="mb-10 bodyOne !text-nickel">
          Add your details below to get back into the app
        </Typography>
        <form className="flex flex-col gap-6">
          <CustomInput
            id="email"
            label="Email Address"
            placeholder="e.g. alex@gmail.com"
            fullWidth
            startAdornment={
              <InputAdornment position="start">
                <Image
                  alt="email icon"
                  src={EmailIcon}
                  height={16}
                  width={16}
                />
              </InputAdornment>
            }
          />

          <CustomInput
            id="password"
            label="Password"
            placeholder="Enter your password"
            fullWidth
            startAdornment={
              <InputAdornment position="start">
                <Image
                  alt="lock icon"
                  src={PasswordIcon}
                  height={16}
                  width={16}
                />
              </InputAdornment>
            }
          />
          <Button className="bg-hanPurple text-white hover:bg-paleViolet">
            Login
          </Button>
        </form>
        <Typography
          variant="body1"
          className="text-center mt-6 text-nickel font-normal"
        >
          Don&apos;t have an account?{" "}
          <Link href={"/register"} className="text-hanPurple">
            Create account
          </Link>
        </Typography>
        <SocialLoginButton helperText="Or continue with" />
      </Box>
    </Box>
  );
};

export default LoginForm;
