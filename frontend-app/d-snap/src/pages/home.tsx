import { useEffect, useState } from "react";

import { useActor } from "../icp/hooks/useActor";
import { Auth, useAuth } from "../icp/hooks/useAuth";

export default function HomePage() {
  const [greet, setGreet] = useState("");
  const test = useActor("test");
  const auth = useAuth();

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
      {auth.isReady && <button onClick={() => auth.login()}>Ingresar</button>}
    </div>
  );
}
