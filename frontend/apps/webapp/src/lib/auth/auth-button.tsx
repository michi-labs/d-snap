import { Button } from "../../components/ui/button";
import { AuthContext } from "./auth-context";
import { useContext, useEffect, useState } from "react";

export function AuthButton() {
  const { isAuth, login, logout } = useContext(AuthContext);

  return !isAuth ? <LoginButton login={login} /> : <LogoutButton logout={logout} />;
}

type LoginButtonProps = {
  login: () => void;
};

function LoginButton(props: LoginButtonProps) {
  return (
    <Button
      className="w-full py-2 bg-purple-600 text-white rounded-md"
      variant="outline"
      onClick={() => props.login()}>
      <div className="flex items-center justify-center gap-2">Login</div>
    </Button>
  );
}

type LogoutButtonProps = {
  logout: () => void;
};

function LogoutButton(props: LogoutButtonProps) {
  return (
    <Button
      className="w-full py-2 bg-purple-600 text-white rounded-md"
      variant="outline"
      onClick={() => props.logout()}>
      <div className="flex items-center justify-center gap-2">Logout</div>
    </Button>
  );
}
