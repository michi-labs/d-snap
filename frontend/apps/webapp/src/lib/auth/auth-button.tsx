import { Button } from "../../components/ui/button";
import { useAuth } from "icp-connect-react/hooks";

export function AuthButton() {
  const { isAuthenticated, connect, disconnect } = useAuth();

  return !isAuthenticated ? <LoginButton login={connect} /> : <LogoutButton logout={disconnect} />;
}

type LoginButtonProps = {
  readonly login: () => void;
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
  readonly logout: () => void;
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
