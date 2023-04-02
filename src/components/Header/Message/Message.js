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
const Message = (props) => {
    const userFound = [
        {
            id: 1,
            img: "https://www.redditstatic.com/avatars/avatar_default_20_FFD635.png",
            name: "DuyNguyen",
            checked: false
        },
        {
            id: 2,
            img: "https://styles.redditmedia.com/t5_356bu/styles/communityIcon_ski6pyqvm4t11.png",
            name: "Alibi",
            checked: false
        }
    ]
    const { showMessageBox, setShowMessageBox } = props
    const [minMessageBox, setMinMessageBox] = useState(false)
    const [listFriend, setListFriend] = useState(userFound)
    const [dataUserFound, setDataUserFound] = useImmer([])
    const [isStartChat, setIsStartChat] = useState(false)
    const [chatValue, setChatValue] = useState('')
    const [searchValue, setSearchValue] = useState('')
    const [recentChatArr, setRecentChatsArr] = useImmer([])
    const [currentUserChatting, setCurrentUserChatting] = useState({})

    useEffect(() => {
        if (searchValue) {
            const uf = listFriend.find((e) => { return e.name.toLowerCase().includes(searchValue.toLowerCase()) })
            if (uf) {
                if (!dataUserFound.find((e) => { return e.id === uf.id })) {
                    setDataUserFound(draft => { draft.push(uf) })
                }
            } else {
                setDataUserFound([])
            }
        } else {
            setDataUserFound([])

        }
    }, [searchValue])


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
                if (uf.id === id) {
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
                    <span >
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
            if (!recentChatArr.find((e) => { return e.id === uf.id })) {
                draft.push(uf)
            }
        })
        setCurrentUserChatting(uf)
        setDataUserFound(draft => {
            draft.splice(draft.findIndex(e => e.id === uf.id), 1);
        })
    }
    const handleAddNewChat = () => {
        setIsStartChat(false)
        setCurrentUserChatting('')
        setSearchValue('')
    }
    const handleTabchater = (uf) => {
        setCurrentUserChatting(uf)
        setIsStartChat(true)
    }
    const handleStartChat = (type) => {
        if (type === "direct") {
            return (
                <div className="contain_chat_recent">
                    {recentChatArr && recentChatArr.length > 0 && recentChatArr.map((uf) => {
                        return (
                            <div
                                className={`chaters ${currentUserChatting.id === uf.id && 'active'}`}
                                key={uf.id}
                                onClick={() => handleTabchater(uf)}
                            >
                                <img src={uf.img} />
                                <span>{uf.name}</span>
                            </div>
                        )

                    })}
                </div>
            )
        } else if (type === 'chat') {
            return (
                <>
                    <div className="chat_header">
                        <span>{currentUserChatting.name}</span>
                        <div className="chat_header">
                            <div className="header_nav">
                                <TbWindowMinimize onClick={() => handleMsgBox("min")} />
                                <AiOutlineClose onClick={() => setShowMessageBox(false)} />
                            </div>
                        </div>
                    </div>
                    <div className="chat_container started">
                        <div className="boxchat"></div>
                        <div className="inputChat">
                            <span className="camera">
                                <FiCamera />
                            </span>
                            <input
                                type="text"
                                value={chatValue}
                                onChange={e => setChatValue(e.target.value)}
                            />
                            <span className={`send ${chatValue && "active"}`}>
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
                                            {dataUserFound && dataUserFound.length > 0 && dataUserFound.map((uf) => {
                                                return (
                                                    <div className="user_found" key={uf.id} onClick={() => handleOnChangeCheck(uf.id)}>
                                                        <img src={uf.img} />
                                                        <span >{uf.name}</span>
                                                        <input
                                                            type="radio"
                                                            checked={uf.checked}
                                                            onChange={() => handleOnChangeCheck(uf.id)}
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