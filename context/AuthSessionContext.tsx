"use client";

import { SessionProvider } from "next-auth/react";

type AuthSessionContextProps = {
  children?: React.ReactNode;
};

const AuthSessionContext = ({ children }: AuthSessionContextProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthSessionContext;
