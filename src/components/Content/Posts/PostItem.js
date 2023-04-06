import { useNavigate, useParams } from "react-router-dom"
import PriButton from '../../Button/PriButton'
import { TfiComments } from 'react-icons/tfi'
import { RiShareForwardLine } from 'react-icons/ri'
import { CiSaveDown2 } from 'react-icons/ci'
import "./PostItem.scss"
import Rate from "../Rate"
import ModalSignInUp from "../../Header/Modals/ModalSignInUp"
import { useState } from "react"
import { useContext } from "react"
import { AuthContext } from "../../Context/Context"
import { FaRegTrashAlt } from 'react-icons/fa'
import { toast } from "react-toastify"
const PostItem = (props) => {
    const navigate = useNavigate()
    const { isAuthUser, showModalSignInUp, setShowModalSignInUp, setIsAuthUser, setPosts } = useContext(AuthContext);
    const { post } = props
    const { id } = useParams
    const handleShowLoginModal = (e) => {
        e.stopPropagation()
        setShowModalSignInUp(true)
    }

    const handleMoveDetailPost = (postId) => {
        // if (!isAuthUser) {
        //     setShowModalSignInUp(true)
        //     return
        // }
        navigate(`/posts/${postId}`)
    }

    const handleDeletePost = (e, postId) => {
        navigate('/')
        e.stopPropagation()
        setPosts(draft => {
            draft.forEach((e, i) => {
                if (e.id === postId) {
                    draft.splice(i, 1)
                }
            })
        })
        toast.success("Delete post successfully", {
            autoClose: 2000
        })
    }

    const handleNavigateParticipant = (e, participantId) => {
        e.stopPropagation()
        navigate(`/participant/${participantId}`)
    }

    return (
        <div
            className="contain-posts"
            key={post.id}

        >
            <div className="post_item">
                <Rate
                    setData={setPosts}
                    data={post}
                    type="post"
                />
                <div
                    className="content_post"
                    onClick={() => handleMoveDetailPost(post.id)}
                >
                    <div className="header_post">
                        <span className="g1">
                            <img src={post.owner.img} />
                        </span>
                        <div className="g2">
                            <span className="name" onClick={(e) => handleNavigateParticipant(e, post.owner.id)}>{post.owner.name}</span>
                            <span className='dot'>•</span>
                            <span className="post_time">{post.post_time} ago</span>
                        </div>
                        {props.typeParent === "list" && !isAuthUser &&
                            <span
                                className="btnJoin"
                                onClick={(e) => handleShowLoginModal(e)}
                            >
                                <PriButton type="pri" text="Join" />
                            </span>}
                    </div>
                    <div className="body_post">
                        <div className="post_detail">
                            <h3>{post.post_detail}</h3>
                            {post.type === 'img' && <img src={post.img_detail} />}
                            {post.type === 'vid' && <video autoPlay muted loop controls>
                                <source src={post.vid_detail} type="video/mp4" />
                            </video>}
                            <div>

                            </div>
                        </div>


                    </div>
                    <div className="footer_post">
                        <div className="item">
                            <TfiComments />
                            <span className="numComment text_after">{post.numComment}</span>
                            <span className="text_after">Comments</span>
                        </div>
                        <div className="item">
                            <RiShareForwardLine />
                            <span className="text_after">Share</span>
                        </div>
                        <div className="item">
                            <CiSaveDown2 />
                            <span className="text_after">Save</span>
                        </div>
                        {post.deletable &&
                            <div className="item delete" onClick={(e) => handleDeletePost(e, post.id)}>
                                <FaRegTrashAlt />
                                <span className="text_after">Delete</span>
                            </div>}

                    </div>
                </div>
            </div>

        </div>
    )
}

export default PostItem