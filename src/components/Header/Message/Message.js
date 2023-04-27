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
import { useContext } from "react"
import { AuthContext } from "../../Context/Context"
import { v4 as uuidv4 } from 'uuid'
import { useSelector } from "react-redux"
import { getAllUser } from "../../../services/apiServices"
const Message = (props) => {
    const { isAuthenticated, account } = useSelector(state => state.user)

    // const userFound = [
    //     {
    //         id: 1,
    //         img: "https://www.redditstatic.com/avatars/avatar_default_20_FFD635.png",
    //         name: "DuyNguyen",
    //         checked: false
    //     },
    //     {
    //         id: 2,
    //         img: "https://styles.redditmedia.com/t5_356bu/styles/communityIcon_ski6pyqvm4t11.png",
    //         name: "envy",
    //         checked: false
    //     }
    //     ,
    //     {
    //         id: 3,
    //         img: "https://styles.redditmedia.com/t5_356bu/styles/communityIcon_ski6pyqvm4t11.png",
    //         name: "bbbbbbb",
    //         checked: false
    //     }

    // ]

    const message = {
        1: {
            message_id: 1,
            sender_id: 1,
            reciever_id: account.id,
            content: "duy nguyen nhan!!"
        },
        2: {
            message_id: 2,
            sender_id: account.id,
            reciever_id: 1,
            content: "user nhan cho duy nguyen!!"
        },
        3: {
            message_id: 3,
            sender_id: account.id,
            reciever_id: 2,
            content: "user nhan cho aliba!!"
        },
        4: {
            message_id: 4,
            sender_id: 1,
            reciever_id: account.id,
            content: "duy nguyen nhan cho user lan 2"
        },
        5: {
            message_id: 5,
            sender_id: 2,
            reciever_id: account.id,
            content: "aliba nhan cho user lan 1"
        }
    }
    const { showMessageBox, setShowMessageBox } = props
    const [minMessageBox, setMinMessageBox] = useState(false)
    const [listFriend, setListFriend] = useState([])
    const [dataUserFound, setDataUserFound] = useImmer([])
    const [isStartChat, setIsStartChat] = useState(false)
    const [chatValue, setChatValue] = useState('')
    const [searchValue, setSearchValue] = useState('')
    const [recentChatArr, setRecentChatsArr] = useImmer([])
    const [currentUserChatting, setCurrentUserChatting] = useState({})
    const [messages, setMessages] = useImmer(message)
    const messagesEndRef = useRef(null);
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

    const handleAddDirectChat = (uf) => {
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
    const handleTabchater = (uf) => {
        setCurrentUserChatting(uf)
        setIsStartChat(true)
    }
    const handleSendMsg = (e) => {
        if (e.key === "Enter") {
            sendMsg()
        }
    }

    const sendMsg = () => {
        if (chatValue) {
            const newMsgId = uuidv4()
            setMessages(draft => {
                draft[newMsgId] = {
                    message_id: newMsgId,
                    sender_id: account.id,
                    reciever_id: currentUserChatting._id,
                    content: chatValue
                }
                setChatValue("")
            })
        }
    }
    const handleStartChat = (type) => {
        if (type === "direct") {
            return (
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
            )
        } else if (type === 'chat') {
            return (
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
                                                <span className="msg">{value.content}</span>
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
                                                        <img src={currentUserChatting.img} />
                                                    </span>
                                                    <span className="msg">{value.content}</span>
                                                </div>
                                            )
                                        }
                                    }
                                })}

                                <div ref={messagesEndRef}></div>
                            </div>
                        </div>
                        <div className="inputChat">
                            <span className="camera">
                                <FiCamera />
                            </span>
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
            )
        }

    }

    return (
        <>
            {showMessageBox &&
                <div className="message_container">
                    <div className="direct_chat">

                        <>
                            <span className="text_direct">All the direct chats that you're in will show up here</span>
                            {handleStartChat('direct')}
                        </>

                        <div className="createChat_btn" onClick={() => handleAddNewChat()}>
                            <MdPersonAddAlt />
                            Create chat
                        </div>
                    </div>
                    <div className="chat">
                        {isStartChat ?
                            handleStartChat('chat')
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