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
import { deleteComment, deleteReply, postReply } from "../../../services/apiServices"
import { useSelector } from "react-redux"
const Comments = (props) => {
    const { showCmtArea, handleShowReplyArea, setShowCmtArea, idPost, post, fetchDetailPost } = props
    const { isAuthenticated, account } = useSelector(state => state.user)

    const { setPosts, user, isAuthUser, setShowModalSignInUp, fetchListPosts } = useContext(AuthContext);
    const navigate = useNavigate()
    const [clickMoreCmts, setCLickMoreCmts] = useState(false)
    const [currentRepClicked, setCurrentRepClicked] = useState({})
    const [value, setValue] = useState('');
    const editorRef = useRef()
    const comments = post.comments ? post.comments : []

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
    const handleShowMoreCmt = (objj, id, idCmt) => {
        const obj = Object.assign({}, objj);
        if (Object.keys(obj).length > 2) {
            if (!clickMoreCmts) {
                if (id === obj[1]._id) {
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
                if (idCmt === currentRepClicked.idCmt && id === obj[Object.keys(obj).length - 1]._id) {
                    return <span
                        className="moreCmts"
                        onClick={() => handleClickShowHideCmts("hide", idCmt)}
                    >
                        Hide replies
                    </span>
                } else if (idCmt !== currentRepClicked.idCmt && id === obj[1]._id) {
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

    const handleReplyCmt = async (idCmt, valueReply) => {
        if (value.includes('<br>') && value.length === 11 || !value) return
        if (!isAuthenticated) {
            setShowModalSignInUp(true)
            return
        }
        const res = await postReply(valueReply, account.id, idCmt)
        if (res && res.EC == 0) {
            setShowCmtArea('')
            setValue('')
            toast.success("Add reply comment successfully!!")
            await fetchDetailPost()
        }
        // const newIdReply = uuidv4()
        // const newReply = {
        //     id: newIdReply,
        //     imgUser: user.img_user,
        //     owner: {
        //         id: user.id,
        //         name: `r/${user.name_user}`,
        //         img: user.img_user
        //     },
        //     reply_time: '7 seconds',
        //     reply_detail: valueReply,
        //     deletable: true
        // }
        // setPosts(draft => {
        //     draft.forEach((e) => {
        //         if (String(e.id) === String(idPost)) {
        //             e.comments[idCmt].reply.unshift(newReply)

        //         }
        //     })

        // }
        // )
    }

    const handleDeleteReplycmt = async (type, idReply, idCmt) => {
        const res = await deleteReply(idReply)
        if (res && res.EC === 0) {
            toast.success("Delete reply comment successfully!!")
            await fetchDetailPost()
            await fetchListPosts()
        }
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

    const handleDeleteComment = async (e, cmtId) => {
        e.stopPropagation();
        const res = await deleteComment(cmtId)
        console.log(res)
        if (res && res.EC == 0) {
            toast.success("Delete comment successfully")
            await fetchDetailPost()
            await fetchListPosts()
        }
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
                                    <img src={cmt.owner.image || 'https://external-preview.redd.it/5kh5OreeLd85QsqYO1Xz_4XSLYwZntfjqou-8fyBFoE.png?auto=webp&s=dbdabd04c399ce9c761ff899f5d38656d1de87c2'} />
                                </div>
                                <div className="f-cmt_content">
                                    <div className="info">
                                        <div className="header_post">
                                            <div className="g2">
                                                <span
                                                    className="name"
                                                    onClick={() => navigate(`/participant/${cmt.owner._id}`)}
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
                                        {/* <Rate
                                            data={cmt}
                                            setData={setPosts}
                                            type="comment"
                                            idReply={cmt.id}
                                            idPost={idPost}
                                        /> */}
                                        <span onClick={() => handleShowReplyArea(cmt._id)}>
                                            <BiMessage />
                                            Reply
                                        </span>
                                        <span>
                                            Share
                                        </span>
                                        {cmt.owner._id === account.id &&
                                            <span className="delete" onClick={(e) => handleDeleteComment(e, cmt._id)}>
                                                <FaRegTrashAlt />
                                                Delete
                                            </span>}
                                    </div>
                                </div>
                            </div>
                            {showCmtArea === cmt._id &&
                                <div className="hh" style={{ position: 'relative' }}>
                                    <ReactQuill
                                        placeholder='Typing for reply'
                                        ref={editorRef}
                                        theme="snow"
                                        value={value}
                                        onChange={setValue}
                                    />
                                    <span
                                        className="cl"
                                        onClick={() => setShowCmtArea('')}
                                        style={{
                                            position: 'absolute',
                                            top: '5px',
                                            right: ' 150px'
                                        }}>
                                        <PriButton type="spri" text="Close" />
                                    </span>
                                    <span
                                        onClick={() => handleReplyCmt(cmt._id, editorRef.current.editor.root.innerText)}
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
                                {cmt.replies && cmt.replies.length > 0 && limitCmtObj(cmt.replies, idCmt).map((reply, idReply1) => {
                                    return (
                                        <div key={idReply1}>
                                            <div className="contain_fcmt lv2">
                                                <div className="line_level"></div>
                                                <div className="f_cmt">
                                                    <div className="f_cmter">
                                                        <img src={reply.owner.image} />
                                                    </div>
                                                    <div className="f-cmt_content">
                                                        <div className="info">
                                                            <div className="header_post">
                                                                <div className="g2">
                                                                    <span
                                                                        className="name"
                                                                        onClick={() => navigate(`/participant/${reply.owner._id}`)}
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
                                                            {reply.owner._id === account.id &&
                                                                <span className="delete" onClick={() => handleDeleteReplycmt("reply", reply._id, cmt._id)}>
                                                                    <BsTrash3 />
                                                                    Delete
                                                                </span>
                                                            }

                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            {handleShowMoreCmt(cmt.replies, reply._id, idCmt)}
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