"use client";

import ChatComponent from "@repo/ui/chatComponent";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Chat() {
  // const router = useRouter();

  // useEffect(() => {
  //   const token = Cookies.get("token");
  //   if (!token) {
  //     console.log("NO TOKEN FOUND FROM /CHAT")
  //     router.push("/");
  //   }
  // }, [router]);

  return (
    <div>
      <ChatComponent />
    </div>
  );
}
