import "./Message.scss"
import { CiMinimize1, CiSearch } from 'react-icons/ci'
import { AiOutlineClose } from 'react-icons/ai'
import { FiCamera } from 'react-icons/fi'
import { TbWindowMinimize, TbSend } from 'react-icons/tb'
import { MdPersonAddAlt } from 'react-icons/md'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useEffect, useRef, useState } from "react"
import { useImmer } from "use-immer"
import PriButton from "../../Button/PriButton"
import _ from 'lodash'
import { useSelector } from "react-redux"
import { createChatRoom, getAllMessageOfRoom, getAllUser, postMessage } from "../../../services/apiServices"
import socket from "../../../services/socket"
const Message = (props) => {
    const { isAuthenticated, account } = useSelector(state => state.user)
    const { showMessageBox, setShowMessageBox } = props
    const [minMessageBox, setMinMessageBox] = useState(false)
    const [listFriend, setListFriend] = useState([])
    const [dataUserFound, setDataUserFound] = useImmer([])
    const [isStartChat, setIsStartChat] = useState(false)
    const [chatValue, setChatValue] = useState('')
    const [searchValue, setSearchValue] = useState('')
    const [recentChatArr, setRecentChatsArr] = useImmer([])
    const [currentUserChatting, setCurrentUserChatting] = useState({})
    const [messages, setMessages] = useState([])
    const messagesEndRef = useRef(null);
    const [currentRoom, setCurrentRoom] = useState('')
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);
    useEffect(() => {
        if (searchValue) {
            const newFilteredUserFound = listFriend.filter((user) =>
                user.name.toLowerCase().includes(searchValue.toLowerCase())
            );
            setDataUserFound(newFilteredUserFound);
        } else {
            setDataUserFound([]);
        }
    }, [searchValue]);

    useEffect(() => {
        fetchListUser()
    }, [])
    useEffect(() => {
        socket.on('user_chat', (dataChatFromSever) => {
            console.log('dataChatFromSever ', dataChatFromSever);
            setMessages((messages) => [...messages, {
                sender_id: dataChatFromSever.sender_id,
                reciever_id: dataChatFromSever.reciever_id,
                message: dataChatFromSever.message
            }])
        })
    }, [socket])
    const fetchListUser = async () => {
        const res = await getAllUser()
        if (res && res.EC == 0) {
            const userFound = res.DT.filter((e) => {
                e['checked'] = false
                return e._id !== account.id
            }
            )
            setListFriend(userFound)
        }
    }

    const handleMsgBox = (type, e) => {
        if (type === "min") {
            setShowMessageBox(false)
            setMinMessageBox(true)
        } else if (type === "all") {
            e.stopPropagation()
            setMinMessageBox(false)
            setShowMessageBox(false)
        } else if (type === "max") {
            setShowMessageBox(true)
            setMinMessageBox(false)

        }
    }


    const handleOnChangeCheck = (id) => {
        setDataUserFound(draft => {
            draft.forEach((uf) => {
                if (uf._id === id) {
                    uf.checked = !uf.checked
                }
            })
        })
    }

    const handleShowStartChatBtn = () => {
        const uf = dataUserFound.find((uf) => { return uf.checked === true })
        if (uf) {
            return (
                <div className="contain_startChat">
                    <span className="cl" onClick={() => setSearchValue('')}  >
                        <PriButton type="spri" text="Cancle" />
                    </span>
                    <span onClick={() => handleAddDirectChat(uf)}>
                        <PriButton type="pri" text="Start chat" />
                    </span>
                </div>
            )
        } else {
            return <></>
        }
    }

    const handleAddDirectChat = async (uf) => {
        const res = await createChatRoom([account.id, uf._id])
        socket.emit("room", res.DT._id)
        const r = await getAllMessageOfRoom(res.DT._id)
        console.log("r", r)
        if (r && r.EC === 0) {
            setMessages(r.DT)
        }
        setCurrentRoom(res.DT._id)
        setIsStartChat(true)
        setRecentChatsArr(draft => {
            if (!recentChatArr.find((e) => { return e._id === uf._id })) {
                draft.push(uf)
            }
        })
        setCurrentUserChatting(uf)
        setDataUserFound(draft => {
            draft.splice(draft.findIndex(e => e._id === uf._id), 1);
        })
    }
    const handleAddNewChat = () => {
        setIsStartChat(false)
        setCurrentUserChatting({})
        setSearchValue('')
    }
    const handleTabchater = async (uf) => {
        const res = await createChatRoom([account.id, uf._id])
        socket.emit("room", res.DT._id)
        const r = await getAllMessageOfRoom(res.DT._id)
        console.log("r", r)
        if (r && r.EC === 0) {
            setMessages(r.DT)
        }
        setCurrentRoom(res.DT._id)
        setCurrentUserChatting(uf)
        setIsStartChat(true)
    }
    const handleSendMsg = (e) => {
        if (e.key === "Enter") {
            sendMsg()
        }
    }

    const sendMsg = async () => {
        if (chatValue) {
            socket.emit("chat", {
                message: chatValue,
                sender_id: account.id,
                reciever_id: currentUserChatting._id,
                room: currentRoom
            })
            const res = await postMessage(chatValue, account.id, currentUserChatting._id, currentRoom)
            // if (res && res.EC == 0) {

            // }
            setMessages([...messages, {
                sender_id: account.id,
                reciever_id: currentUserChatting._id,
                message: chatValue
            }])
            setChatValue('')
        }
    }
    return (
        <>
            {showMessageBox &&
                <div className="message_container">
                    <div className="direct_chat">

                        <>
                            <span className="text_direct">All the direct chats that you're in will show up here</span>
                            <div className="contain_chat_recent">
                                {recentChatArr && recentChatArr.length > 0 && recentChatArr.map((uf, i) => {
                                    return (
                                        <div
                                            className={`chaters ${currentUserChatting._id === uf._id && 'active'}`}
                                            key={i}
                                            onClick={() => handleTabchater(uf)}
                                        >
                                            <img src={uf.image} />
                                            <span>{uf.name}</span>
                                        </div>
                                    )

                                })
                                }
                            </div >
                        </>

                        <div className="createChat_btn" onClick={() => handleAddNewChat()}>
                            <MdPersonAddAlt />
                            Create chat
                        </div>
                    </div>
                    <div className="chat">
                        {isStartChat ?
                            <>
                                <div className="chat_header">
                                    <span className="container_userInfoChat">{currentUserChatting.name} <span className={`${currentUserChatting.Online ? 'online' : 'offline'}`}></span></span>
                                    <div className="chat_header">
                                        <div className="header_nav">
                                            <TbWindowMinimize onClick={() => handleMsgBox("min")} />
                                            <AiOutlineClose onClick={() => setShowMessageBox(false)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="chat_container started">
                                    <div className="boxchat">
                                        <div className="contain_messages" >
                                            {Object.entries(messages).map(([key, value]) => {
                                                if (value.sender_id === account.id && value.reciever_id === currentUserChatting._id) {
                                                    return (
                                                        <div key={key} className="owner">
                                                            <span className="msg">{value.message}</span>
                                                            <span className="avt">
                                                                <img src={account.image} />
                                                            </span>
                                                        </div>
                                                    )
                                                } else {
                                                    if (value.sender_id === currentUserChatting._id) {
                                                        return (
                                                            <div key={key} className="friend">
                                                                <span className="avt">
                                                                    <img src={currentUserChatting.image} />
                                                                </span>
                                                                <span className="msg">{value.message}</span>
                                                            </div>
                                                        )
                                                    }
                                                }
                                            })}

                                            <div ref={messagesEndRef}></div>
                                        </div>
                                    </div>
                                    <div className="inputChat">
                                        <label htmlFor="uploadimgMsg">
                                            <span className="camera">
                                                <FiCamera />
                                            </span>
                                        </label>
                                        <input
                                            id="uploadimgMsg"
                                            type='file'
                                            hidden
                                        />
                                        <input
                                            type="text"
                                            value={chatValue}
                                            onChange={e => setChatValue(e.target.value)}
                                            onKeyDown={(e) => handleSendMsg(e)}
                                        />
                                        <span
                                            className={`send ${chatValue && "active"}`}
                                            onClick={() => sendMsg()}
                                        >
                                            <TbSend />
                                        </span>
                                    </div>

                                </div>
                            </>
                            :
                            <>
                                <div className="chat_header">
                                    <span>New Chat</span>
                                    <div className="header_nav">
                                        <TbWindowMinimize onClick={() => handleMsgBox("min")} />
                                        <AiOutlineClose onClick={() => setShowMessageBox(false)} />
                                    </div>
                                </div>
                                <div className="chat_container">
                                    <div className="search_label">Search</div>
                                    <div className="md_search_input">
                                        <InputGroup size="sm" className=" contain_search_input">
                                            <InputGroup.Text id="inputGroup-sizing-sm" className="icon_search_input">
                                                <CiSearch />
                                            </InputGroup.Text>
                                            <Form.Control
                                                aria-label="Small"
                                                aria-describedby="inputGroup-sizing-sm"
                                                className="search_chat_input"
                                                placeholder="Type username"
                                                value={searchValue}
                                                onChange={(e) => setSearchValue(e.target.value)}
                                            />
                                        </InputGroup>
                                        <div className="user_found_container">
                                            {dataUserFound && dataUserFound.length > 0 && dataUserFound.map((uf, i) => {
                                                return (
                                                    <div className="user_found" key={i} onClick={() => handleOnChangeCheck(uf._id)}>
                                                        <img src={uf.image} />
                                                        <span >{uf.name}</span>
                                                        <input
                                                            type="radio"
                                                            checked={uf.checked}
                                                            onChange={() => handleOnChangeCheck(uf._id)}
                                                        />
                                                    </div>
                                                )
                                            })
                                            }
                                            {searchValue && _.isEmpty(dataUserFound) && <span className="not_exist">User doesn't exist</span>}

                                        </div>

                                    </div>
                                    {handleShowStartChatBtn()}

                                </div>
                            </>
                        }

                    </div>
                </div>
            }
            {minMessageBox && !showMessageBox ?
                <div className="message_container_close" onClick={() => handleMsgBox("max")}>
                    Chat
                    <AiOutlineClose
                        onClick={(e) => handleMsgBox('all', e)}
                        style={{ fontSize: '20px' }} />
                </div>
                :
                <></>
            }

        </>

    )

}

export default Message