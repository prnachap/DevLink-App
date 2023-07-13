"use client";

import CustomInput from "@/components/FormElements/CustomInput";
import SocialLoginButton from "@/components/FormElements/SocialLoginButton";
import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import isEmpty from "lodash/isEmpty";
import Image from "next/image";
import Link from "next/link";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import EmailIcon from "../../public/images/icon-email.svg";
import PasswordIcon from "../../public/images/icon-password.svg";
import DevIcon from "../../public/images/logo-devlinks-large.svg";
import ForgotterPassword from "../FormElements/ForgotterPassword";

const schema = yup.object({
  email: yup.string().required("Can't be empty").email("Invalid email"),
  password: yup.string().required("Can't be empty"),
});
export type FormData = yup.InferType<typeof schema>;

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  const renderControlledEmailInput = () => {
    return (
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <CustomInput
            id="email"
            label="Email Address"
            placeholder="e.g. alex@gmail.com"
            fullWidth
            autoComplete="off"
            error={!isEmpty(errors?.email)}
            helperText={errors.email?.message}
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
            {...field}
          />
        )}
      />
    );
  };

  const renderControlledPasswordInput = () => {
    return (
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <CustomInput
            id="password"
            label="Password"
            placeholder="Enter your password"
            fullWidth
            error={!isEmpty(errors.password)}
            helperText={errors.password?.message}
            {...field}
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
        )}
      />
    );
  };

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
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          {renderControlledEmailInput()}
          {renderControlledPasswordInput()}
          <ForgotterPassword />
          <Button
            type="submit"
            className="bg-hanPurple text-white hover:bg-paleViolet"
          >
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
