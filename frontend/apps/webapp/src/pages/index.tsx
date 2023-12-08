import { useEffect, useState } from "react";

import { useActor } from "../packages/icp/hooks/useActor";
import { AuthButton } from "../components/auth/auth-button";

export default function HomePage() {
  const [greet, setGreet] = useState("");
  const [username, setUsername] = useState("");
  const test = useActor("test");
  const user = useActor("user");

  useEffect(() => {
    getGreet();
  }, []);

  async function getGreet() {
    // @ts-ignore
    const greet = await test.greet("Adrian");
    setGreet(greet);
  }

  async function create() {
    try {
      // @ts-ignore
      await user.create({
        username: "adrian_hidalgo",
        bio: "Software developer",
        picture: {
          url: "https://www.google.com",
        },
      });

      // @ts-ignore
      const profile = await user.getProfile();
      console.log({ profile });

      setUsername(profile.username);
    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <div>
      <h1>Home: {greet}</h1>
      <AuthButton />
      <button onClick={() => create()}>Crear</button>

      <div>Profile</div>
      <div>Username: {username}</div>
    </div>
  );
}
