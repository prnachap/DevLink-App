import LoginForm from "@/components/AuthForms/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login Devlinks",
  description: "This is the logic page for Devlinks application",
};

const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;
