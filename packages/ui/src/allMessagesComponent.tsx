import { MessageComponent } from "@repo/ui/messageComponent";


interface allMessagesProps {
    messagesObject: string[];
}

export function AllMessagesComponent(props: allMessagesProps) {
    const messagesArray = Object.entries(props.messagesObject);
    
    return <div className="bg-gray-800 rounded-lg w-full h-lvh my-20 flex flex-col justify-center">
            {Object.entries(props.messagesObject).map(([key, value]) => (
            <div key={key}>
                <MessageComponent message={value} /> <br/>
            </div>
            ))}
    </div>
}