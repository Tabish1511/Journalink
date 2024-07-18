"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import Appbar from "@repo/ui/appBar";

export default function Home() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!session && status !== "loading") {
      signIn();
    }
  }, [session, status]);

  if(status === "loading"){
    return <div>Loading...</div>
  }

  return (
    <div>
      <Appbar />
    </div>
  );
}