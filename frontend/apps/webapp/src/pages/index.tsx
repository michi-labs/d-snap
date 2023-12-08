import { useEffect, useState } from "react";

import { useActor } from "../packages/icp/hooks/useActor";
import { AuthButton } from "../components/auth/auth-button";

export default function HomePage() {
  const [greet, setGreet] = useState("");
  const test = useActor("test");

  useEffect(() => {
    getGreet();
  });

  async function getGreet() {
    // @ts-ignore
    const greet = await test.greet("Adrian");
    setGreet(greet);
  }

  return (
    <div>
      <h1>Home: {greet}</h1>
      <AuthButton />
    </div>
  );
}
