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
const DetailPost = () => {
    const navigate = useNavigate()
    const data = [
        {
            id: 1,
            num_Evaluate: 76,
            imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
            name: 'r/AskReddit1',
            info: 'u/purple_rasberries1',
            post_time: '7 seconds',
            post_detail: 'What video game have you played the most?',
            numComment: 56,
            type: 'text'
        },
        {
            id: 2,
            num_Evaluate: 22,
            imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
            name: 'r/AskReddit2',
            info: 'u/purple_rasberries2',
            post_time: '12 hours',
            post_detail: 'Countries with the most firearms in Civil hands',
            img_detail: 'https://preview.redd.it/zye4bxyokapa1.jpg?width=640&crop=smart&auto=webp&v=enabled&s=d322e29fe507cd52537e3ee5ced13b5d0514ae70',
            numComment: 112,
            type: 'img'

        },
        {
            id: 3,
            num_Evaluate: 17,
            imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
            name: 'r/AskReddit3',
            info: 'u/purple_rasberries3',
            post_time: '3 days',
            post_detail: 'What video game have you played the most?',
            vid_detail: video,
            numComment: 72,
            type: 'vid'

        },
        {
            id: 4,
            num_Evaluate: 78,
            imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
            name: 'r/AskReddit4',
            info: 'u/purple_rasberries4',
            post_time: '23 minutes',
            post_detail: 'I wanted to get my noodle wet',
            img_detail: 'https://external-preview.redd.it/mv8HWsjJivXRwnw0zn7yNPvis5GhRjUo6HlF08naVu4.jpg?width=640&crop=smart&auto=webp&v=enabled&s=9aa5a572afaa64ea53fd030b76969e8fa7d03a89',
            numComment: 26,
            type: 'img'
        },
        {
            id: 5,
            num_Evaluate: 46,
            imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
            name: 'r/AskReddit5',
            info: 'u/purple_rasberries5',
            post_time: '2 hours',
            post_detail: 'What video game have you played the most?',
            img_detail: 'https://i.redd.it/noinecoyi7pa1.png',
            numComment: 834,
            type: 'img'

        },
        {
            id: 6,
            num_Evaluate: 19,
            imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
            name: 'r/AskReddit5',
            info: 'u/purple_rasberries5',
            post_time: '9 minutes',
            post_detail: '"I wanted to get my noodle wet"',
            img_detail: 'https://preview.redd.it/hzfsxw2awcpa1.jpg?width=640&crop=smart&auto=webp&v=enabled&s=1cef44ea5c4857aab112a6f9c20242e2893ca737',
            numComment: 126,
            type: 'img'
        },
    ]
    const dataComment = {
        1: {
            id: 1,
            num_Evaluate: 76,
            imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
            name: 'r/AskReddit1',
            cmt_time: '7 seconds',
            cmt_detail: 'What video game have you played a most?',
            reply: [
                {
                    id: 11,
                    num_Evaluate: 76,
                    imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
                    name: 'r/AskReddit1',
                    cmt_time: '7 seconds',
                    cmt_detail: 'What video game have you played the most?1',
                }, {
                    id: 12,
                    num_Evaluate: 76,
                    imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
                    name: 'r/AskReddit1',
                    cmt_time: '7 seconds',
                    cmt_detail: 'What video game have you played the most?2',
                }, {
                    id: 13,
                    num_Evaluate: 76,
                    imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
                    name: 'r/AskReddit1',
                    cmt_time: '7 seconds',
                    cmt_detail: 'What video game have you played the most?3',
                }, {
                    id: 14,
                    num_Evaluate: 76,
                    imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
                    name: 'r/AskReddit1',
                    cmt_time: '7 seconds',
                    cmt_detail: 'What video game have you played the most?4',
                }, {
                    id: 15,
                    num_Evaluate: 76,
                    imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
                    name: 'r/AskReddit1',
                    cmt_time: '7 seconds',
                    cmt_detail: 'What video game have you played the most?5',
                }]

        },
        2: {
            id: 2,
            num_Evaluate: 76,
            imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
            name: 'r/AskReddit1',
            cmt_time: '7 seconds',
            cmt_detail: 'What video game have you played the most?',
            reply: [
                {
                    id: 21,
                    num_Evaluate: 76,
                    imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
                    name: 'r/AskReddit1',
                    cmt_time: '7 seconds',
                    cmt_detail: 'What video game have you played the most?1',
                },
                {
                    id: 22,
                    num_Evaluate: 76,
                    imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
                    name: 'r/AskReddit1',
                    cmt_time: '7 seconds',
                    cmt_detail: 'What video game have you played the most?1',
                }, {
                    id: 23,
                    num_Evaluate: 76,
                    imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
                    name: 'r/AskReddit1',
                    cmt_time: '7 seconds',
                    cmt_detail: 'What video game have you played the most?1',
                },]
        }
    }
    const { id } = useParams()
    const [posts, setPosts] = useImmer(data)
    const [comments, setComments] = useImmer(dataComment)
    const [showCmtArea, setShowCmtArea] = useState(false)
    const [valueEditorCmt, setValueEditorCmt] = useState('');
    const [currentPost, setCurrentPost] = useState(id)
    const post = posts.find(postt => {
        return postt.id === +id
    })
    const [showModalSignInUp, setShowModalSignInUp] = useState(false)
    const handleShowLoginModal = (e) => {
        e.stopPropagation()
        setShowModalSignInUp(true)
    }
    useEffect(() => {
        // 👇️ scroll to top on page load
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);
    const handleClickAddCmt = (value) => {
        const newIdCmt = uuidv4()
        const newCmt = {
            id: newIdCmt,
            num_Evaluate: 0,
            imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
            name: 'r/AskReddit1',
            cmt_time: '1 seconds',
            cmt_detail: value,
            reply: []
        }
        toast.success("Add comments successfully", {
            autoClose: 2000
        })
        setComments(draft => {
            setValueEditorCmt('')
            draft[newIdCmt] = newCmt
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
                    <PostItem post={post ? post : {}} setPosts={setPosts} typeParent="item" />
                    <div className="subPost">
                        <EditorPost
                            handleClickAddCmt={handleClickAddCmt}
                            valueEditorCmt={valueEditorCmt}
                            setValueEditorCmt={setValueEditorCmt}
                        />
                        <Comments
                            dataComment={dataComment}
                            comments={comments}
                            setComments={setComments}
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
                                    <img src={post.imgUser} />
                                </span>
                                <div className="g2">
                                    <span className="name">{post.name}</span>
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
                            <div className="joinBtn" onClick={(e) => handleShowLoginModal(e)}>
                                <PriButton type="pri" text="JOIN" />
                            </div>
                        </div>
                    </div>
                    <div className="side2">
                        <div className="text_slide">Similar to this post</div>
                        <div className='contain_postSimilar'>
                            {data && data.length > 0 && data.map((post, i) => {
                                return (
                                    <div
                                        key={i}
                                        className={`content_post ${String(currentPost) === String(post.id) && 'active'}`}
                                        onClick={() => { handleNavigate(post.id) }}
                                    >
                                        <div className="header_post">
                                            <span className="g1">
                                                <img src={post.imgUser} />
                                            </span>
                                            <div className="g2">
                                                <span className="name">{post.name}</span>
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