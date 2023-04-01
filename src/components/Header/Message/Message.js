import "./Message.scss"
import { CiMinimize1, CiSearch } from 'react-icons/ci'
import { AiOutlineClose } from 'react-icons/ai'
import { TbWindowMinimize } from 'react-icons/tb'
import { MdPersonAddAlt } from 'react-icons/md'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
const Message = (props) => {
    const { showMessageBox, setShowMessageBox } = props
    return (
        <div className="message_container">
            <div className="direct_chat">
                {/* <span className="text_direct">All the direct chats that you're in will show up here</span> */}
                <div className="contain_chat_recent">
                    <div className="chaters">
                        <img src="https://www.redditstatic.com/avatars/avatar_default_20_FFD635.png" />
                        <span>DuyNguyen</span>
                    </div>
                    <div className="chaters">
                        <img src="https://www.redditstatic.com/avatars/avatar_default_20_FFD635.png" />
                        <span>DuyNguyen</span>
                    </div>
                    <div className="chaters">
                        <img src="https://www.redditstatic.com/avatars/avatar_default_20_FFD635.png" />
                        <span>DuyNguyen</span>
                    </div>
                    <div className="chaters">
                        <img src="https://www.redditstatic.com/avatars/avatar_default_20_FFD635.png" />
                        <span>DuyNguyen</span>
                    </div>
                </div>
                <div className="createChat_btn">
                    <MdPersonAddAlt />
                    Create chat
                </div>
            </div>
            <div className="chat">
                <div className="chat_header">
                    <span>New Chat</span>
                    <div className="header_nav">
                        <TbWindowMinimize />
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
                            />
                        </InputGroup>
                        <div className="user_found_container">
                            <span className="not_exist">User doesn't exist</span>
                            {/* <div className="user_found">
                                <img src="https://www.redditstatic.com/avatars/avatar_default_20_FFD635.png" />
                                <span >Duy nguyen</span>
                            </div>
                            <div className="user_found">
                                <img src="https://www.redditstatic.com/avatars/avatar_default_20_FFD635.png" />
                                <span >Duy nguyen</span>
                            </div>
                            <div className="user_found">
                                <img src="https://www.redditstatic.com/avatars/avatar_default_20_FFD635.png" />
                                <span >Duy nguyen</span>
                            </div>
                            <div className="user_found">
                                <img src="https://www.redditstatic.com/avatars/avatar_default_20_FFD635.png" />
                                <span >Duy nguyen</span>
                            </div> */}
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )

}

export default Message