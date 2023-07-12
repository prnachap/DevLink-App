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

const RegisterForm = () => {
  return (
    <Box className="w-[95%] min-h-[600px] m-auto mt-10 mb-2 flex flex-col gap-5 md:w-[29rem]">
      <Image
        alt="DevLinks - Link Icon"
        src={DevIcon}
        width={182}
        height={40}
        className="mx-auto"
      />
      <Box className="bg-lotion p-10 md:bg-white md:rounded-md">
        <Typography variant="h1" className="headingOne" gutterBottom>
          Create account
        </Typography>
        <Typography variant="body2" className="mb-6 bodyOne !text-nickel">
          Let&apos;s get you started sharing your links!
        </Typography>
        <form className="flex flex-col gap-4">
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
            label="Create Password"
            placeholder="Atleast 8 characters"
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
          <CustomInput
            id="confirmPassword"
            label="Confirm Password"
            placeholder="Atleast 8 characters"
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
          <Typography variant="body2" className="bodyTwo !text-nickel">
            Password must contain at least 8 characters
          </Typography>
          <Button className="bg-hanPurple text-white hover:bg-paleViolet">
            Create new account
          </Button>
        </form>
        <Typography
          variant="body1"
          className="text-center mt-6 text-nickel font-normal"
        >
          Already have an account?{" "}
          <Link href={"/login"} className="text-hanPurple">
            Login
          </Link>
        </Typography>
        <SocialLoginButton helperText="Or register with" />
      </Box>
    </Box>
  );
};

export default RegisterForm;
