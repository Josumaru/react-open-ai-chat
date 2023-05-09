import "./ChatBox.css"
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
const ChatRoom = (props) => {
    const [incoming, setIncoming] = useState(<Loader />)
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        if (!isLoading) {
            setIncoming(props.incoming)
        }
    }, [props.incoming])
    useEffect(() => {
        setIsLoading(false)
    },[])
    return (
        <div className="chat-box">
            <div className="chat outgoing">
                <div className="details">
                    <p>{ props.outgoing }</p>
                </div>
            </div>
            <div className="chat incoming">
                <div className="details">
                    <p>{ incoming }</p>
                </div>
            </div>
        </div>
    )
}
export default ChatRoom;