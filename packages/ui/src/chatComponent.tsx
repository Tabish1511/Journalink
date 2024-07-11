import { MessageComponent } from "@repo/ui/messageComponent";


interface ChatComponentProps {
    messagesObject: string[];
}

export function ChatComponent(props: ChatComponentProps) {
    const messagesArray = Object.entries(props.messagesObject);
    
    return <div className="bg-gray-800 rounded-lg w-full h-lvh my-20 flex flex-col justify-center">
            {Object.entries(props.messagesObject).map(([key, value]) => (
            <div key={key}>
                <MessageComponent message={value} /> <br/>
            </div>
            ))}
    </div>
}























































// const [allMessages, setAllMessages] = useState<string[]>([]);

//     useEffect(() => {
//         setAllMessages(prevMessages => [...prevMessages, props.allMessages])
        
//       }, [])

//     if(!allMessages){
//         return <div>
//             No messages yet...
//         </div>
//     }

//     return <div className="bg-gray-800 rounded-lg w-full h-lvh my-20 flex flex-col justify-end">
//         <div className="border-solid border-2 border-sky-500 w-full h-max flex justify-center">
//             {props.messagesObject}

//             {Object.entries(props.allMessages).map(([key, value]) => (
//             <div key={key}>
//                 <MessageComponent message={typeof(value)} /> <br/>
//             </div>
//             ))}
//         </div>
//     </div>