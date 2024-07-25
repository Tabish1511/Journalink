"use client"
import { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios
import { AllMessagesComponent } from '@repo/ui/allMessagesComponent';

export default function ChatComponent() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [allMessages, setAllMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true); // State to track loading of messages
  const baseEndpoint = process.env.NEXT_PUBLIC_API_URL as string;

  useEffect(() => {
    axios.get(`${baseEndpoint}/api/v1/message/messages`)
      .then(response => {
        const prevMessages = response.data.map((message: any) => message.content);
        setAllMessages(prevMessages);
        setIsLoading(false); // Set loading to false after messages are fetched
      })
      .catch(error => console.error("Failed to fetch messages:", error));

    const newSocket = new WebSocket(`${baseEndpoint}/api/v1/chatWs`);
    newSocket.onopen = () => {
      console.log('Connection established');
      setSocket(newSocket);
    };
    newSocket.onmessage = (message) => {
      console.log('Message received:', message);
      setAllMessages(prevMessages => [...prevMessages, message.data]);
    };
    
  }, [baseEndpoint]);

  if (!socket || isLoading) { // Check both socket connection and loading state
    return <div>Loading messages...</div>;
  }

  return (
    <div className='h-screen flex justify-center'>
      <div className='w-2/6 flex flex-col justify-center'>
        <AllMessagesComponent messagesObject={allMessages} />
        <div className='flex justify-center'>
          <input className='rounded-lg bg-indigo-800 border-sky-500 w-4/5 py-4'
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            placeholder='Type your message'></input>
          
          <button className='rounded-lg bg-indigo-800 border-sky-500 w-32 py-4'
            onClick={() => {
              if (message.trim() === '') return; // Prevent sending if message is empty or only whitespace
              socket?.send(message); // Optional chaining in case socket is null
              setMessage(''); // Clear the input after sending the message
            }}>Send</button>
        </div>
      </div>   
    </div>
  );
}























































// "use client"
// import { useEffect, useState } from 'react'
// import {AllMessagesComponent} from '@repo/ui/allMessagesComponent'

// export default function ChatComponent() {
//   const [socket, setSocket] = useState<WebSocket | null>(null);
//   const [allMessages, setAllMessages] = useState<string[]>([]);
//   const [message, setMessage] = useState<string>("");
//   const baseEndpoint = process.env.NEXT_PUBLIC_API_URL as string;

//   useEffect(() => {
//     const newSocket = new WebSocket(`${baseEndpoint}/api/v1/chatWs`);
//     newSocket.onopen = () => {
//       console.log('Connection established');
//       setSocket(newSocket);
//     }
//     newSocket.onmessage = (message) => {
//       console.log('Message received:', message);
//       setAllMessages(prevMessages => [...prevMessages, message.data])
//     }
    
//   }, [])

//   if(!socket){
//     return <div>
//       Loading messages...
//     </div>
//   }

//   return <div className='h-screen flex justify-center'>
//       <div className='w-2/6 flex flex-col justify-center'>
//         <AllMessagesComponent messagesObject={allMessages} />
//         <div className='flex justify-center'>
//           <input className='rounded-lg bg-indigo-800 border-sky-500 w-4/5 py-4'
//           onChange={(e) => {
//           setMessage(e.target.value);
//           }} value={message} placeholder='Type your message'></input>
          
//           <button className='rounded-lg bg-indigo-800 border-sky-500 w-32 py-4'
//           onClick={() => {
//             socket.send(message);
//           }}>Send</button>
//         </div>
//       </div>   
//     </div>
// }
