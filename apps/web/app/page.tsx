"use client"
import { useEffect, useState } from 'react'
import {ChatComponent} from '@repo/ui/chatComponent'

const WebSocketComponent = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [allMessages, setAllMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    // const newSocket = new WebSocket('https://journalink-oh7b.onrender.com');
    const newSocket = new WebSocket('ws://localhost:8080');
    newSocket.onopen = () => {
      console.log('Connection established');
      setSocket(newSocket);
    }
    newSocket.onmessage = (message) => {
      console.log('Message received:', message);
      setAllMessages(prevMessages => [...prevMessages, message.data])
    }
    
  }, [])

  if(!socket){
    return <div>
      Loading messages...
    </div>
  }

  return <div className='h-screen flex justify-center'>
      <div className='w-2/6 flex flex-col justify-center'>
        <ChatComponent messagesObject={allMessages} />
        <div className='flex justify-center'>
          <input className='rounded-lg bg-indigo-800 border-sky-500 w-4/5 py-4'
          onChange={(e) => {
          setMessage(e.target.value);
          }} value={message} placeholder='Type your message'></input>
          
          <button className='rounded-lg bg-indigo-800 border-sky-500 w-32 py-4'
          onClick={() => {
            socket.send(message);
          }}>Send</button>
        </div>
      </div>   
    </div>
}

WebSocketComponent.displayName = 'WebSocketComponent';

export default WebSocketComponent;





























{/* BELOW IS CODE FOR MAPPING THROUGH MESSAGES --- RAW */}


{/* hi there
      
      <input onChange={(e) => {
        setMessage(e.target.value);
      }} value={message} placeholder='Type your message'></input>
      
      <button onClick={() => {
        socket.send(message);
      }}>Send</button> <br/>

      <div>
        {Object.entries(allMessages).map(([key, value]) => (
          <div key={key}>
            {value}
          </div>
        ))}
      </div> */}






















{/* // import Image from "next/image";
// import { Button } from "@repo/ui/button";
// import styles from "./page.module.css";

// export default function Home() {
//   return (
//     <div className={styles.page}>
//       <main className={styles.main}>
//         <Image
//           className={styles.logo}
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol>
//           <li>
//             Get started by editing <code>app/page.tsx</code>
//           </li>
//           <li>Save and see your changes instantly.</li>
//         </ol>

//         <div className={styles.ctas}>
//           <a
//             className={styles.primary}
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className={styles.logo}
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//             className={styles.secondary}
//           >
//             Read our docs
//           </a>
//         </div>
//         <Button
//           appName="web"
//           className="mx-auto rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
//         >
//           Open alert
//         </Button>
//       </main>
//       <footer className={styles.footer}>
//         <a
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file-text.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }*/}
