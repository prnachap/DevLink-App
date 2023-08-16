"use client";

import CustomInput from "@/components/FormElements/CustomInput";
import SocialLoginButton from "@/components/FormElements/SocialLoginButton";
import { useAppDispatch, useAppSelector } from "@/redux";
import { onError, onSuccess } from "@/redux/features/authSlice";
import { registerUser } from "@/services/register";
import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import { isEqual } from "lodash";
import isEmpty from "lodash/isEmpty";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import EmailIcon from "../../public/images/icon-email.svg";
import PasswordIcon from "../../public/images/icon-password.svg";
import DevIcon from "../../public/images/logo-devlinks-large.svg";
import BackdropWithLoader from "../BackdropWithLoader/BackdropWithLoader";
import CustomSnackbar from "../Snackbar/CustomSnackbar";

const schema = yup.object({
  email: yup.string().required("Email is mandatory").email("Invalid Email"),
  password: yup
    .string()
    .required("Password is mandatory")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .required("Password is mandatory")
    .oneOf([yup.ref("password")], "Passwords does not match"),
});

type FormData = yup.InferType<typeof schema>;

const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", confirmPassword: "", password: "" },
    resolver: yupResolver(schema),
  });

  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.auth);
  const [isFetching, setIsFetching] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    setIsFetching(true);
    dispatch(onError({ error: null }));
    const { status, error } = await registerUser(data);
    if (!isEqual(status, 200)) {
      dispatch(onError({ error: error as string }));
      setIsFetching(false);
      return;
    }
    dispatch(onSuccess({ success: true }));
    setIsFetching(false);
    router.push("/");
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
            type="password"
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

  const renderControlledConfirmPasswordInput = () => {
    return (
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => (
          <CustomInput
            id="confirmPassword"
            label="Confirm Password"
            placeholder="Atleast 8 characters"
            fullWidth
            type="password"
            error={!isEmpty(errors.confirmPassword)}
            helperText={errors.confirmPassword?.message}
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
            {...field}
          />
        )}
      />
    );
  };

  const renderBackdrop = () => {
    if (isFetching) {
      return <BackdropWithLoader openModal={isFetching} />;
    }
  };

  const renderSnackbar = () => {
    if (selector.error) {
      return <CustomSnackbar severity="error">{selector.error}</CustomSnackbar>;
    }
  };
  return (
    <Box>
      <Box className="w-[95%] min-h-[600px] m-auto mt-10 mb-2 flex flex-col gap-5 md:w-[29rem]">
        {renderBackdrop()}
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
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {renderControlledEmailInput()}
            {renderControlledPasswordInput()}
            {renderControlledConfirmPasswordInput()}
            <Typography variant="body2" className="bodyTwo !text-nickel">
              Password must contain at least 8 characters
            </Typography>
            <Button
              type="submit"
              className="bg-hanPurple text-white hover:bg-paleViolet"
            >
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
      {renderSnackbar()}
    </Box>
  );
};

export default RegisterForm;
