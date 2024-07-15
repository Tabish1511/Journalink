"use client"
import { useEffect, useState } from 'react'
import {ChatComponent} from '@repo/ui/chatComponent'

const WebSocketComponent = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [allMessages, setAllMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");
  // const baseEndpoint = 'https://journalink-web.vercel.app';

  useEffect(() => {
    // const newSocket = new WebSocket(baseEndpoint);
    const newSocket = new WebSocket('https://journalink-web.vercel.app');
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
