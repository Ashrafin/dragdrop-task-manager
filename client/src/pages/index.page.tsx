import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  // reroute the user to /boards
  useEffect(() => {
    router.push("/boards");
  }, []);
  
  return <></>;
};