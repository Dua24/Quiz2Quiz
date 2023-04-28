import { useEffect, useRef, useState } from "react"
import io from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid';
const socket = io.connect('http://localhost:8081')
const name = uuidv4()
const NetworkErr = () => {
    const [message, setMessage] = useState('')
    const [data, setData] = useState([])
    const [room, setRoom] = useState(0)
    const sendMsg = () => {
        setData([...data, {
            message: message,
            name: name
        }])

        socket.emit("chat", {
            message: message,
            name: name,
            room
        })
    }
    const joinRoom = () => {
        socket.emit("room", room)
    }
    useEffect(() => {
        socket.on('user_chat', (dataChatFromSever) => {
            setData([...data, {
                message: dataChatFromSever.message,
                name: dataChatFromSever.name
            }])
        })
    }, [socket])
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <input
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                placeholder="room"
            />
            <button onClick={joinRoom}>JOIN ROOM</button>
            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={() => sendMsg()}>
                Click
            </button>
            <div>{data.map((e, i) => { return <div key={i}>{e.name} : {e.message}</div> })}</div>
            {/* SOME THING WRONG, TRY AGAIN... */}
        </div>
    );
};

export default NetworkErr