import { useEffect, useState } from "react";
import axios from "axios";
import ChatRoom from "../ChatBox/ChatBox"
import Chat from "../Chat/Chat"
import "./Assistant.css"
const Assistant = (props) => {
  const [content, setContent] = useState("")
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
      const assistant = async () => {
          const options = {
            method: 'POST',
            url: 'https://chatgpt53.p.rapidapi.com/',
            headers: {
              'content-type': 'application/json',
              // 'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_OPEN_AI,
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
            console.log(response.data.choices[0].message.content);
          } catch (error) {
            console.error(error);
          } finally {
            setIsLoading(false)
          }
      }
    if (!isLoading) {
      assistant()
    }
  }, [content])
  
  useEffect(() => {
    setIsLoading(false)
  }, [])

    const handleSubmit = (event) => {
        console.log(content)
        event.preventDefault()
        setContent(input)
    }
  useEffect(() => {
    setInput(props.input)
  },[props.input])
    return (
      <div className="assistant">
        {/* <form onSubmit={ handleSubmit }>
          <input type="text" value={input} onChange={(event) => {setInput(event.target.value) }}></input>
        </form> */}
        {/* <ChatRoom outgoing={input} /> */}
        {/* <Chat /> */}
      </div>
    )
}
export default Assistant;