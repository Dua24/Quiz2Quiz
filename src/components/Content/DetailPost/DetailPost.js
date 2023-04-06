import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import video from '../../../assets/video/video.mp4'
import "./DetailPost.scss"
import "../../Content/Content.scss"
import PostItem from "../Posts/PostItem"
import _ from 'lodash'
import EditorPost from "./Editor"
import Comments from "./Comments"
import { useImmer } from "use-immer"
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify';
import PriButton from "../../Button/PriButton"
import { BiHomeSmile } from 'react-icons/bi'
import { IoIosRadioButtonOff } from "react-icons/io";
import { TfiComments } from 'react-icons/tfi'
import { FaArrowCircleLeft } from 'react-icons/fa'
import ModalSignInUp from "../../Header/Modals/ModalSignInUp"
import { useContext } from "react"
import { AuthContext } from "../../Context/Context"
const DetailPost = () => {
    const navigate = useNavigate()
    const { isAuthUser, posts, setPosts, user } = useContext(AuthContext);
    const { id } = useParams()
    const [showCmtArea, setShowCmtArea] = useState(false)
    const [valueEditorCmt, setValueEditorCmt] = useState('');
    const [currentPost, setCurrentPost] = useState(id)
    const [post, setPost] = useImmer(posts.find(postt => {
        return String(postt.id) === String(id)
    }))
    const [showModalSignInUp, setShowModalSignInUp] = useState(false)
    const handleClickBtnView = (e, participantId) => {
        e.stopPropagation()
        navigate(`/participant/${participantId}`)
    }


    useEffect(() => {
        // 👇️ scroll to top on page load
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);


    const handleClickAddCmt = (value) => {
        if (valueEditorCmt.includes('<br>') && valueEditorCmt.length === 11 || !valueEditorCmt) return
        if (!isAuthUser) {
            setShowModalSignInUp(true)
            return
        }
        const newIdCmt = uuidv4()
        const newCmt = {
            id: newIdCmt,
            num_Evaluate: 0,
            owner: {
                id: user.id,
                name: `r/${user.name_user}`,
                img: user.img_user
            },
            cmt_time: '2 seconds',
            cmt_detail: value,
            reply: [],
            deletable: true
        }
        toast.success("Add comments successfully", {
            autoClose: 2000
        })
        setPosts(draft => {
            setValueEditorCmt('')
            draft.forEach((e) => {
                if (String(e.id) === String(id)) {
                    if (e.comments) {
                        e.comments[newIdCmt] = newCmt
                    } else {
                        e.comments = {}
                        e.comments[newIdCmt] = newCmt
                    }
                    e.numComment++
                }
            })
        })

    }

    const handleShowReplyArea = (idCmt) => {
        setShowCmtArea(idCmt)
    }

    const handleNavigate = (postId) => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        navigate(`/posts/${postId}`)
        setCurrentPost(postId)
    }
    return (
        <div className="container_detailPost_main">
            <div className="seeAllPost" onClick={() => navigate("/")}>
                <FaArrowCircleLeft />
                See all posts
            </div>
            <div className="contain_DetailPost">
                <div className="main_detail">
                    <PostItem
                        post={posts.find((e) => { return String(e.id) === String(id) }) ? posts.find((e) => { return String(e.id) === String(id) }) : {}}
                        setPosts={setPosts}
                        typeParent="item" />
                    <div className="subPost">
                        <EditorPost
                            handleClickAddCmt={handleClickAddCmt}
                            valueEditorCmt={valueEditorCmt}
                            setValueEditorCmt={setValueEditorCmt}
                        />
                        <Comments
                            post={posts.find((e) => { return String(e.id) === String(id) })}
                            idPost={id}
                            setPosts={setPosts}
                            handleShowReplyArea={handleShowReplyArea}
                            showCmtArea={showCmtArea}
                            setShowCmtArea={setShowCmtArea}
                        />
                    </div>
                </div>
                <div className="side">
                    <div className="side1">
                        <div className="text_slide">About community</div>
                        <div className="contain_contentSlide1">
                            <div className="_info">
                                <span className="g1">
                                    <img src={post.owner.img} />
                                </span>
                                <div className="g2">
                                    <span
                                        className="name">{post.owner.name}</span>
                                </div>
                            </div>
                            <div className="_descr">A place for pictures and photographs.</div>
                            <div className="_timeCreated">
                                <BiHomeSmile style={{ fontSize: '17px' }} />
                                <span style={{ display: 'flex', gap: '4px' }}>
                                    Created
                                    <span className="date_detail">Jan 25, 2008</span>
                                </span>
                            </div>
                            <div className="divide"></div>
                            <div className="_socialRate">
                                <div className="g1" >
                                    <span className="g1_detail" >29.9m</span>
                                    <span className="text" >Photographers</span>
                                </div>
                                <div className="g2" >
                                    <span className="g2_detail" >
                                        <IoIosRadioButtonOff className="online" />
                                        25.6k
                                    </span>

                                    <span className='text'>Online</span>
                                </div>
                            </div>
                            <div className="divide"></div>
                            <div className="joinBtn" onClick={(e) => handleClickBtnView(e, post.owner.id)}>
                                <PriButton type="pri" text="VIEW" />
                            </div>
                        </div>
                    </div>
                    <div className="side2">
                        <div className="text_slide">Similar to this post</div>
                        <div className='contain_postSimilar'>
                            {posts && posts.length > 0 && posts.map((post, i) => {
                                return (
                                    <div
                                        key={i}
                                        className={`content_post ${String(currentPost) === String(post.id) && 'active'}`}
                                        onClick={() => { handleNavigate(post.id) }}
                                    >
                                        <div className="header_post">
                                            <span className="g1">
                                                <img src={post.owner.img} />
                                            </span>
                                            <div className="g2">
                                                <span className="name">{post.owner.name}</span>
                                            </div>
                                            {String(id) === String(post.id) &&
                                                <div className="current_post">Current</div>
                                            }

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
                                                <span className="post_time">{post.post_time} ago</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

            </div >
            <ModalSignInUp show={showModalSignInUp} setShow={setShowModalSignInUp} />
        </div>
    )
}


export default DetailPost