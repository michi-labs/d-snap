import { useEffect, useState } from "react";

import { useAuth } from "../../packages/icp/hooks/useAuth";

export function AuthButton() {
  const [isAuth, setIsAuth] = useState<Boolean | undefined>(false);
  const auth = useAuth();

  useEffect(() => {
    getAuth();
  });

  async function getAuth() {
    const isAutheticated = await auth.isAuthenticated();
    setIsAuth(isAutheticated);
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
  return <button onClick={() => props.login()}>Ingresar</button>;
}

type LogoutButtonProps = {
  logout: () => void;
};

function LogoutButton(props: LogoutButtonProps) {
  return <button onClick={() => props.logout()}>Salir</button>;
}
