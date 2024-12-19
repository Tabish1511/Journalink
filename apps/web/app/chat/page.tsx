"use client";

import ChatComponent from "@repo/ui/chatComponent";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';

export default function Chat() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/chat");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ChatComponent />

      {JSON.stringify(session)}
    </div>
  );
}
