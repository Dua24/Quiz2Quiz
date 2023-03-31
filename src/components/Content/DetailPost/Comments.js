import { useImmer } from "use-immer"
import Rate from "../Rate"
import "./DetailPost.scss"
import { BiMessage } from 'react-icons/bi'
import { BsThreeDots, BsTrash3 } from 'react-icons/bs'
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
            if (_.isArray(objComments) && !_.isEmpty(objComments)) {
                if (objComments.length <= limtiCmts) {
                    return objComments
                } else {
                    return objComments.slice(0, limtiCmts)
                }
            }
        } else {
            if (idCmt === currentRepClicked.idCmt) {
                return objComments.slice(0)
            } else {
                return objComments.slice(0, limtiCmts)
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
    const handleShowMoreCmt = (obj, id, idCmt) => {
        if (obj.length > 2) {
            if (!clickMoreCmts) {
                if (String(id) === String(obj[1].id)) {
                    return <span
                        className="moreCmts"
                        onClick={() => handleClickShowHideCmts("show", idCmt)}
                    >
                        {Object.keys(obj).length - 2}
                        more replies
                    </span>
                } else {
                    return <></>
                }

            } else {
                if (idCmt === currentRepClicked.idCmt && String(id) === String(obj[obj.length - 1].id)) {
                    return <span
                        className="moreCmts"
                        onClick={() => handleClickShowHideCmts("hide", idCmt)}
                    >
                        Hide replies
                    </span>
                } else if (idCmt !== currentRepClicked.idCmt && String(id) === String(obj[1].id)) {
                    return <span
                        className="moreCmts"
                        onClick={() => handleClickShowHideCmts("show", idCmt)}
                    >
                        {Object.keys(obj).length - 2}
                        more replies
                    </span>
                } else {
                    return <></>

                }
            }
        } else {
            return <></>
        }



    }

    const handleReplyCmt = (idCmt, valueReply) => {
        const newIdReply = uuidv4()
        const newReply = {
            id: newIdReply,
            num_Evaluate: 76,
            imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
            name: 'r/AskReddit1',
            cmt_time: '7 seconds',
            cmt_detail: valueReply,
        }
        setComments(draft => {
            draft[idCmt].reply.push(newReply)

            setShowCmtArea('')
            setValue('')
            toast.success("Add reply comment successfully!!")
        })
    }

    const handleDelete = (type, idReply, idCmt) => {

        setComments(draft => {
            if (type === "reply") {
                const arr = draft[idCmt].reply.filter((item) => {
                    return item.id !== idReply
                })
                draft[idCmt].reply = arr
            }
        })
    }
    console.log(comments)
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
                                        onClick={() => setShowCmtArea('')}
                                        style={{
                                            position: 'absolute',
                                            top: '5px',
                                            right: ' 150px'
                                        }}>
                                        <PriButton type="spri" text="Close" />
                                    </span>
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
                                {cmt.reply && cmt.reply.length > 0 && limitCmtObj(cmt.reply, idCmt).map((reply, idReply1) => {
                                    return (
                                        <div key={idReply1}>
                                            <div className="contain_fcmt lv2">
                                                <div className="line_level"></div>
                                                <div className="f_cmt">
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
                                                            <span onClick={() => handleDelete("reply", reply.id, cmt.id)}>
                                                                <BsTrash3 />
                                                                Delete
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

                                            </div>
                                            {handleShowMoreCmt(cmt.reply, reply.id, idCmt)}
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