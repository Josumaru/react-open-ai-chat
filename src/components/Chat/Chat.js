import "./Chat.css"
import { useEffect, useState } from "react"
import axios from "axios"
import ChatBox from "../ChatBox/ChatBox"

const Chat = () => {
    const [input, setInput] = useState()
    const [content, setContent] = useState()
    const [outGoing, setOutGoing] = useState([])
    const [response, setResponse] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            setContent(input)
            setOutGoing(prevState => [...prevState,input])
            setInput('')
        }
    }
    useEffect(() => {
        const assistant = async () => {
            const options = {
                method: 'POST',
                url: 'https://chatgpt53.p.rapidapi.com/',
                headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_OPEN_AI,
                'X-RapidAPI-Host': 'chatgpt53.p.rapidapi.com'
                },
                data: {
                messages: [
                    {
                    role: 'user',
                    content: content,
                    }
                ]
                }
            };
            
            try {
                const response = await axios.request(options);
                setResponse(prevState => [...prevState,response.data.choices[0].message.content]);

            } catch (error) {
                console.error(error);
            }
        }
        if (!isLoading) {
        assistant()
        }
    }, [content])

    useEffect(() => {
        setIsLoading(false)
    }, [])
    return (
        <div className="chat-area">
            {outGoing.map((outgoing, index) => {
                const incoming = response[index]
                return (
                    <ChatBox key={ index } outgoing={outgoing} incoming={incoming} />
                )
            })}
            <div className="message-bar">
                <div className="textarea-bar">
                    <textarea className="textarea" value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={handleKeyDown} placeholder="Send a Message.."></textarea>
                    <span onClick={() => setContent(input)  } style={{color:"white", cursor: "pointer"}} className="material-symbols-outlined">send</span>
                </div>
                <span style={{color:"white", cursor: "pointer"}} className="material-symbols-outlined">mic</span>
            </div>
        </div>
    )
}

export default Chat;