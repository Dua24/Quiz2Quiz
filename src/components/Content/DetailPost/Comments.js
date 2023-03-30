import { useImmer } from "use-immer"
import Rate from "../Rate"
import "./DetailPost.scss"
import { BiMessage } from 'react-icons/bi'
import { BsThreeDots } from 'react-icons/bs'
import { useState, useRef } from "react"
import "../Posts/PostItem.scss"
import _ from 'lodash'
import ReactQuill from 'react-quill';
import PriButton from "../../Button/PriButton"
import { v4 as uuidv4 } from 'uuid'
import { toast } from "react-toastify"

const Comments = (props) => {
    const { comments, setComments, showCmtArea, handleShowReplyArea, setShowCmtArea } = props
    const [clickMoreCmts, setCLickMoreCmts] = useState(false)
    const [currentRepClicked, setCurrentRepClicked] = useState({})
    const [value, setValue] = useState('');
    const editorRef = useRef()

    const limitCmtObj = (objComments, idCmt) => {
        const limtiCmts = 2
        if (!clickMoreCmts) {
            if (_.isObject(objComments) && !_.isEmpty(objComments)) {
                if (_.size(objComments) <= limtiCmts) {
                    return objComments
                } else {
                    return getFirstNObj(objComments, limtiCmts)
                }
            }
        } else {
            if (idCmt === currentRepClicked.idCmt) {
                return Object.keys(comments[+idCmt].reply).slice(0).reduce((result, key) => {
                    result[key] = objComments[key];
                    return result;
                }, {})
            } else {
                return getFirstNObj(objComments, limtiCmts)
            }
        }
    }

    const handleClickShowHideCmts = (type, idCmt) => {
        setCurrentRepClicked({
            idCmt
        })
        if (type === "show") {
            setCLickMoreCmts(true)

        } else {
            setCLickMoreCmts(false)
        }
    }
    console.log(comments)
    const handleShowMoreCmt = (obj, id, idCmt) => {
        if (!clickMoreCmts) {
            return Object.keys(obj).length > 2 && +id === obj[Object.keys(obj)[1]].id
                ?
                <span
                    className="moreCmts"
                    onClick={() => handleClickShowHideCmts("show", idCmt)}
                >
                    {Object.keys(obj).length - 2}
                    more replies
                </span>
                :
                <></>
        } else {
            if (idCmt !== currentRepClicked.idCmt) {
                return Object.keys(obj).length > 2 && +id === obj[Object.keys(obj)[1]].id
                    ?
                    <span
                        className="moreCmts"
                        onClick={() => handleClickShowHideCmts("show", idCmt)}
                    >
                        {Object.keys(obj).length - 2}
                        more replies
                    </span>
                    :
                    <></>
            } else {
                return id === Object.keys(obj).pop()
                    ?
                    <span
                        className="moreCmts"
                        onClick={() => handleClickShowHideCmts("hide", idCmt)}
                    >
                        Hide replies
                    </span>
                    :
                    <></>
            }

        }
    }

    const getFirstNObj = (obj, n) => {
        return Object.keys(obj) //get the keys out
            .sort() //this will ensure consistent ordering of what you will get back. If you want something in non-aphabetical order, you will need to supply a custom sorting function
            .slice(0, n) //get the first N
            .reduce(function (memo, current) { //generate a new object out of them
                memo[current] = obj[current]
                return memo;
            }, {})
    }


    const handleReplyCmt = (idCmt, valueReply) => {
        const newIdReply = uuidv4()
        const newReply = {
            id: 21,
            num_Evaluate: 76,
            imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
            name: 'r/AskReddit1',
            cmt_time: '7 seconds',
            cmt_detail: valueReply,
        }
        setComments(draft => {
            draft[idCmt].reply[newIdReply] = newReply
            setShowCmtArea('')
            setValue('')
            toast.success("Add reply comment successfully!!")
        })
    }
    // const comment = {
    //     1: {
    //         id_cmt: 1,
    //         user_avt: ,
    //         user_name: ,
    //         user_postTime: ,
    //         content: ,
    //         content_evaluate: ,
    //         reply: {
    //             1: {
    //                 id_reply: 1,
    //                 user_avt: ,
    //                 user_name: ,
    //                 user_postTime: ,
    //                 content: ,
    //                 content_evaluate: ,
    //                 reply_child: {
    //                     1: {}
    //                 }
    //             }
    //         }
    //     }
    // }
    return (
        <div className="comments-container" >
            {
                Object.entries(comments).map(([idCmt, cmt]) => {
                    return (
                        <div className="contain_fcmt" key={idCmt}>
                            <div className="line_level"></div>
                            <div className="f_cmt" key={idCmt}>
                                <div className="f_cmter">
                                    <img src={cmt.imgUser} />
                                </div>
                                <div className="f-cmt_content">
                                    <div className="info">
                                        <div className="header_post">
                                            <div className="g2">
                                                <span className="name">{cmt.name}</span>
                                                <span className='dot'>•</span>
                                                <span className="post_time">{cmt.cmt_time}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="detail">
                                        {cmt.cmt_detail}
                                    </div>
                                    <div className="actions">
                                        <Rate post={cmt} setPosts={setComments} type="comment" idReply={cmt.id} />
                                        <span onClick={() => handleShowReplyArea(cmt.id)}>
                                            <BiMessage />
                                            Reply
                                        </span>
                                        <span>
                                            Share
                                        </span>
                                        <span>
                                            <BsThreeDots />
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {showCmtArea === cmt.id &&
                                <div style={{ position: 'relative' }}>
                                    <ReactQuill
                                        placeholder='Typing for reply'
                                        ref={editorRef}
                                        theme="snow"
                                        value={value}
                                        onChange={setValue}
                                    />
                                    <span
                                        onClick={() => handleReplyCmt(cmt.id, editorRef.current.editor.root.innerText)}
                                        style={{
                                            position: 'absolute',
                                            top: '5px',
                                            right: ' 55px'
                                        }}>
                                        <PriButton type="pri" text="Post" />
                                    </span>
                                </div>
                            }
                            <div className="contain_fcmt_lv2">
                                {cmt.reply && Object.keys(cmt.reply).length > 0 && Object.entries(limitCmtObj(cmt.reply, idCmt)).map(([idReply1, reply]) => {
                                    return (
                                        <div key={idReply1}>
                                            <div className="contain_fcmt lv2">
                                                <div className="line_level"></div>
                                                <div className="f_cmt" key={idReply1}>
                                                    <div className="f_cmter">
                                                        <img src={reply.imgUser} />
                                                    </div>
                                                    <div className="f-cmt_content">
                                                        <div className="info">
                                                            <div className="header_post">
                                                                <div className="g2">
                                                                    <span className="name">{reply.name}</span>
                                                                    <span className='dot'>•</span>
                                                                    <span className="post_time">{reply.cmt_time}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="detail">
                                                            {reply.cmt_detail}
                                                        </div>
                                                        <div className="actions">
                                                            <Rate post={cmt} setPosts={setComments} type="comment" idCmt={idCmt} idReply={idReply1} />
                                                            <span>
                                                                Share
                                                            </span>
                                                            <span>
                                                                <BsThreeDots />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            {handleShowMoreCmt(cmt.reply, idReply1, idCmt)}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })
            }

        </div >
    )
}

export default Comments