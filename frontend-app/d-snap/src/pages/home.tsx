import { useActor } from "dsnap/icp/hooks/useActor";
import { useEffect, useState } from "react";

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
  return <div>Home: {greet}</div>;
}
