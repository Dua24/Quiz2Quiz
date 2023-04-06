import { useImmer } from "use-immer"
import Rate from "../Rate"
import "./DetailPost.scss"
import { BiMessage } from 'react-icons/bi'
import { BsThreeDots, BsTrash3 } from 'react-icons/bs'
import { useState, useRef, useContext } from "react"
import "../Posts/PostItem.scss"
import _ from 'lodash'
import ReactQuill from 'react-quill';
import PriButton from "../../Button/PriButton"
import { v4 as uuidv4 } from 'uuid'
import { toast } from "react-toastify"
import { FaRegTrashAlt } from 'react-icons/fa'
import { AuthContext } from "../../Context/Context"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
const Comments = (props) => {
    const { showCmtArea, handleShowReplyArea, setShowCmtArea, idPost, post } = props
    const { setPosts, user, isAuthUser, setShowModalSignInUp } = useContext(AuthContext);
    const navigate = useNavigate()
    const [clickMoreCmts, setCLickMoreCmts] = useState(false)
    const [currentRepClicked, setCurrentRepClicked] = useState({})
    const [value, setValue] = useState('');
    const editorRef = useRef()
    const comments = post.comments ? post.comments : {}


    useEffect(() => {
        if (value.includes('<br>') && value.length === 11) {
            setValue('')
        }
    }, [value])

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
        if (value.includes('<br>') && value.length === 11 || !value) return
        if (!isAuthUser) {
            setShowModalSignInUp(true)
            return
        }
        const newIdReply = uuidv4()
        const newReply = {
            id: newIdReply,
            imgUser: user.img_user,
            owner: {
                id: user.id,
                name: `r/${user.name_user}`,
                img: user.img_user
            },
            reply_time: '7 seconds',
            reply_detail: valueReply,
            deletable: true
        }
        setPosts(draft => {
            draft.forEach((e) => {
                if (String(e.id) === String(idPost)) {
                    e.comments[idCmt].reply.unshift(newReply)
                    setShowCmtArea('')
                    setValue('')
                    toast.success("Add reply comment successfully!!", {
                        autoClose: 2000
                    })
                }
            })

        }
        )
    }

    const handleDeleteReplycmt = (type, idReply, idCmt) => {
        setPosts(draft => {
            if (type === "reply") {
                draft.forEach((e) => {
                    if (String(e.id) === String(idPost)) {
                        const arr = e.comments[idCmt].reply.filter((item) => {
                            return item.id !== idReply
                        })
                        e.comments[idCmt].reply = arr
                    }
                })
            }
        })
        toast.success("Delete reply comment successfully!!", {
            autoClose: 2000
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

    const handleDeleteComment = (e, cmtId) => {
        setPosts(draft => {
            draft.forEach((e, i) => {
                if (String(e.id) === String(idPost)) {
                    delete e.comments[cmtId]
                    e.numComment--
                }
            })
        })
        toast.success("Delete comment successfully", {
            autoClose: 2000
        })
    }
    return (
        <div className="comments-container" >
            {
                Object.entries(comments).map(([idCmt, cmt]) => {
                    return (
                        <div className="contain_fcmt" key={idCmt}>
                            <div className="line_level"></div>
                            <div className="f_cmt" key={idCmt}>
                                <div className="f_cmter">
                                    <img src={cmt.owner.img} />
                                </div>
                                <div className="f-cmt_content">
                                    <div className="info">
                                        <div className="header_post">
                                            <div className="g2">
                                                <span
                                                    className="name"
                                                    onClick={() => navigate(`/participant/${cmt.owner.id}`)}
                                                >
                                                    {cmt.owner.name}
                                                </span>
                                                <span className='dot'>•</span>
                                                <span className="post_time">{cmt.cmt_time}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="detail">
                                        {cmt.cmt_detail}
                                    </div>
                                    <div className="actions">
                                        <Rate
                                            data={cmt}
                                            setData={setPosts}
                                            type="comment"
                                            idReply={cmt.id}
                                            idPost={idPost}
                                        />
                                        <span onClick={() => handleShowReplyArea(cmt.id)}>
                                            <BiMessage />
                                            Reply
                                        </span>
                                        <span>
                                            Share
                                        </span>
                                        {cmt.deletable &&
                                            <span className="delete" onClick={(e) => handleDeleteComment(e, cmt.id)}>
                                                <FaRegTrashAlt />
                                                Delete
                                            </span>}
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
                                        <PriButton disabled={!value} type="pri" text="Post" />
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
                                                        <img src={reply.owner.img} />
                                                    </div>
                                                    <div className="f-cmt_content">
                                                        <div className="info">
                                                            <div className="header_post">
                                                                <div className="g2">
                                                                    <span
                                                                        className="name"
                                                                        onClick={() => navigate(`/participant/${reply.owner.id}`)}
                                                                    >
                                                                        {reply.owner.name}

                                                                    </span>
                                                                    <span className='dot'>•</span>
                                                                    <span className="post_time">{reply.reply_time}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="detail">
                                                            {reply.reply_detail}
                                                        </div>
                                                        <div className="actions">
                                                            <span>
                                                                Share
                                                            </span>
                                                            <span>
                                                                <BsThreeDots />
                                                            </span>
                                                            {reply.deletable &&
                                                                <span className="delete" onClick={() => handleDeleteReplycmt("reply", reply.id, cmt.id)}>
                                                                    <BsTrash3 />
                                                                    Delete
                                                                </span>
                                                            }

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