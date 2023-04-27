import { useEffect, useRef, useState } from "react"
import io from 'socket.io-client'
const socket = io.connect('http://localhost:8081')
const name = 'as'
const NetworkErr = () => {
    const [message, setMessage] = useState('')
    const [data, setData] = useState([])
    const sendMsg = () => {
        setData([...data, {
            message: message,
            name: name
        }])

        socket.emit("chat", {
            message: message,
            name: name
        })
    }
    useEffect(() => {
        socket.on('user_chat', (data1) => {
        })
    }, [socket])
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={() => sendMsg()}>
                Click
            </button>
            {/* <div>{data.messa.map((e) => { return <div>{e}</div> })}</div> */}
            {/* SOME THING WRONG, TRY AGAIN... */}
        </div>
    );
};

export default NetworkErr