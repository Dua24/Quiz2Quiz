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
import { useSelector } from "react-redux"
import { deletePost } from "../../../services/apiServices"
const PostItem = (props) => {
    const navigate = useNavigate()
    const { setShowModalSignInUp, setPosts, fetchListPosts } = useContext(AuthContext);
    const { post, fetchDetailPost } = props
    const { id } = useParams
    const { isAuthenticated, account } = useSelector(state => state.user)


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

    const handleDeletePost = async (e, postId) => {
        e.stopPropagation()
        const res = await deletePost(postId)
        if (res && res.EC === 0) {
            fetchListPosts()
            toast.success("Delete post successfully")
        }
        navigate(`/`)
    }

    const handleNavigateParticipant = (e, participantId) => {
        e.stopPropagation()
        navigate(`/participant/${participantId}`)
    }
    return (
        <div
            className="contain-posts"
            key={post._id}

        >
            <div className="post_item">
                <Rate
                    setData={setPosts}
                    data={post}
                    type="post"
                    fetchListPosts={fetchListPosts}
                    fetchDetailPost={fetchDetailPost ? fetchDetailPost : () => { }}
                />
                <div
                    className="content_post"
                    onClick={() => handleMoveDetailPost(post._id)}
                >
                    <div className="header_post">
                        <span className="g1">
                            <img src={post.owner.image} />
                        </span>
                        <div className="g2">
                            <span className="name" onClick={(e) => handleNavigateParticipant(e, post.owner._id)}>{post.owner.name}</span>
                            <span className='dot'>•</span>
                            <span className="post_time">{post.post_time} ago</span>
                        </div>
                        {props.typeParent === "list" && !isAuthenticated &&
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
                            <div>

                            </div>
                        </div>


                    </div>
                    <div className="footer_post">
                        <div className="item">
                            <TfiComments />
                            <span className="numComment text_after">{post.comments.length}</span>
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
                        {post?.owner?._id === account.id &&
                            <div className="item delete" onClick={(e) => handleDeletePost(e, post._id)}>
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