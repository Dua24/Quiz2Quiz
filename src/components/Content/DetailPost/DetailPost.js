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
import { getPost, postComment } from "../../../services/apiServices"
import { useSelector } from "react-redux"
import moment from "moment/moment"
const DetailPost = () => {
    const navigate = useNavigate()
    const { posts, setPosts, fetchListPosts } = useContext(AuthContext);
    const { isAuthenticated, account } = useSelector(state => state.user)
    const { id } = useParams()
    const [showCmtArea, setShowCmtArea] = useState(false)
    const [valueEditorCmt, setValueEditorCmt] = useState('');
    const [currentPost, setCurrentPost] = useState(id)
    const [post, setPost] = useImmer({})
    const [showModalSignInUp, setShowModalSignInUp] = useState(false)
    const handleClickBtnView = (e, participantId) => {
        e.stopPropagation()
        navigate(`/participant/${participantId}`)
    }
    console.log(">> ", post)
    useEffect(() => {
        // 👇️ scroll to top on page load
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);


    useEffect(() => {
        fetchDetailPost()
    }, [id])
    const fetchDetailPost = async () => {
        const res = await getPost(id)
        if (res.EC === 0) {
            setPost(res.DT)
        } else {
            setPost({})
        }
    }
    const handleClickAddCmt = async (value) => {
        if (valueEditorCmt.includes('<br>') && valueEditorCmt.length === 11 || !valueEditorCmt) return
        if (!isAuthenticated) {
            setShowModalSignInUp(true)
            return
        }
        // const newCmt = {
        //     cmt_detail: value,
        //     num_Evaluate: 0,
        //     owner: {
        //         id: user.id,
        //         name: `r/${user.name_user}`,
        //         img: user.img_user
        //     },
        //     cmt_time: '2 seconds',
        //     reply: [],
        //     deletable: true
        // }
        const res = await postComment(value, 0, account.id, post._id)
        if (res.EC === 0) {
            toast.success("Add comments successfully")
            await fetchDetailPost()
            await fetchListPosts()
            setValueEditorCmt('')
        }

        // setPosts(draft => {
        //     setValueEditorCmt('')
        //     draft.forEach((e) => {
        //         if (String(e.id) === String(id)) {
        //             // if (e.comments) {
        //             //     e.comments[newIdCmt] = newCmt
        //             // } else {
        //             //     e.comments = {}
        //             //     e.comments[newIdCmt] = newCmt
        //             // }
        //             e.numComment++
        //         }
        //     })
        // })

    }

    const handleShowReplyArea = (idCmt) => {
        setShowCmtArea(idCmt)
    }

    const handleNavigate = async (postId) => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        navigate(`/posts/${postId}`)
    }
    if (_.isEmpty(post)) return
    return (
        <div className="container_detailPost_main">
            <div className="seeAllPost" onClick={() => navigate("/")}>
                <FaArrowCircleLeft />
                See all posts
            </div>
            <div className="contain_DetailPost">
                <div className="main_detail">
                    <PostItem
                        post={post ? post : {}}
                        setPosts={setPosts}
                        typeParent="item"
                        fetchDetailPost={fetchDetailPost}
                    />
                    <div className="subPost">
                        <EditorPost
                            handleClickAddCmt={handleClickAddCmt}
                            valueEditorCmt={valueEditorCmt}
                            setValueEditorCmt={setValueEditorCmt}
                        />
                        <Comments
                            post={post}
                            idPost={id}
                            setPosts={setPosts}
                            handleShowReplyArea={handleShowReplyArea}
                            showCmtArea={showCmtArea}
                            setShowCmtArea={setShowCmtArea}
                            fetchDetailPost={fetchDetailPost}

                        />
                    </div>
                </div>
                <div className="side">
                    <div className="side1">
                        <div className="text_slide">About participant</div>
                        <div className="contain_contentSlide1">
                            <div className="_info">
                                <span className="g1">
                                    <img src={post?.owner?.image} />
                                </span>
                                <div className="g2">
                                    <span
                                        className="name">{post?.owner?.name}</span>
                                </div>
                            </div>
                            <div className="_descr">A place for you guy luv.</div>
                            <div className="_timeCreated">
                                <BiHomeSmile style={{ fontSize: '17px' }} />
                                <span style={{ display: 'flex', gap: '4px' }}>
                                    Created
                                    <span className="date_detail">{moment(post.owner.createdAt).format('DD/MM/YYYY')}</span>
                                </span>
                            </div>
                            <div className="divide"></div>
                            <div className="_socialRate">
                                <div className="g1" >
                                    <span className="text" >User</span>
                                </div>
                                <div className="g2" >
                                    <span className="g2_detail" >
                                        {post.owner.Online
                                            ?
                                            <IoIosRadioButtonOff className="online" />
                                            :
                                            <IoIosRadioButtonOff className="offline" />

                                        }
                                    </span>
                                    {post.owner.Online
                                        ?
                                        <span className='text'>Online</span>

                                        :
                                        <span className='text'>Offline</span>


                                    }

                                </div>
                            </div>
                            <div className="divide"></div>
                            <div className="joinBtn" onClick={(e) => handleClickBtnView(e, post?.owner?._id)}>
                                <PriButton type="pri" text="VIEW" />
                            </div>
                        </div>
                    </div>
                    <div className="side2">
                        <div className="text_slide">Posts exist now</div>
                        <div className='contain_postSimilar'>
                            {posts && posts.length > 0 && posts.map((post, i) => {
                                return (
                                    <div
                                        key={i}
                                        className={`content_post ${currentPost === post._id && 'active'}`}
                                        onClick={() => { handleNavigate(post._id) }}
                                    >
                                        <div className="header_post">
                                            <span className="g1">
                                                <img src={post?.owner?.image} />
                                            </span>
                                            <div className="g2">
                                                <span className="name">{post?.owner?.name}</span>
                                            </div>
                                            {String(id) === String(post._id) &&
                                                <div className="current_post">Current</div>
                                            }

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