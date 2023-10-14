"use client";

import CustomInput from "@/components/FormElements/CustomInput";
import SocialLoginButton from "@/components/FormElements/SocialLoginButton";
import { MESSAGES } from "@/constants/constant";
import { useAppDispatch, useAppSelector } from "@/redux";
import { onError, onSuccess } from "@/redux/features/authSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import isEmpty from "lodash/isEmpty";
import { signIn, useSession } from "next-auth/react";
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
import ForgotterPassword from "../FormElements/ForgotterPassword";
import CustomSnackbar from "../Snackbar/CustomSnackbar";

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
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const session = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { error, success } = useAppSelector((state) => state.auth);

  const [isFetching, setIsFetching] = useState(false);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsFetching(true);
    try {
      dispatch(onError({ error: null }));
      const response = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (response?.error) {
        setIsFetching(false);
        dispatch(onError({ error: response?.error }));
        return;
      }
      dispatch(onSuccess({ success: MESSAGES.LOGIN_SUCCESSFUL }));
      setIsFetching(false);
      router.push("/dashboard");
    } catch (error: any) {
      setIsFetching(false);
      dispatch(onError({ error: error?.message }));
    }
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

  const renderLoader = () => {
    if (isFetching) {
      return <BackdropWithLoader openModal={isFetching} />;
    }
  };

  const renderSnackbar = () => {
    return error ? (
      <CustomSnackbar severity="error">{error}</CustomSnackbar>
    ) : null;
  };

  return (
    <Box>
      <Box className="w-[95%] min-h-[600px] mt-10 mb-2 m-auto flex flex-col gap-5 md:w-[29rem]">
        {renderLoader()}
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
          <form
            className="flex flex-col gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
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
      {renderSnackbar()}
    </Box>
  );
};

export default LoginForm;
