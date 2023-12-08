import { useEffect, useState } from "react";

import { useAuth } from "../../packages/icp/hooks/useAuth";
import { Button } from "../ui/button";

export function AuthButton() {
  const [isAuth, setIsAuth] = useState<Boolean | undefined>(false);
  const auth = useAuth();

  useEffect(() => {
    getAuth();
  }, []);

  async function getAuth() {
    const isAuthenticated = await auth.isAuthenticated();
    setIsAuth(isAuthenticated);
  }

  function login() {
    auth.login({
      onSuccess: () => {
        setIsAuth(true);
      },
    });
  }

  function logout() {
    auth.logout();
    setIsAuth(false);
  }

  return !isAuth ? (
    <LoginButton login={login} />
  ) : (
    <LogoutButton logout={logout} />
  );
}

type LoginButtonProps = {
  login: () => void;
};

function LoginButton(props: LoginButtonProps) {
  return (
    <Button
      className="w-full py-2 bg-purple-600 text-white rounded-md"
      variant="outline"
      onClick={() => props.login()}
    >
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
      onClick={() => props.logout()}
    >
      <div className="flex items-center justify-center gap-2">Logout</div>
    </Button>
  );
}
