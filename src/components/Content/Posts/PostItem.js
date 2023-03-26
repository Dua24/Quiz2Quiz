import { useNavigate, useParams } from "react-router-dom"
import { RxThickArrowDown, RxThickArrowUp } from 'react-icons/rx'
import PriButton from '../../Button/PriButton'
import { TfiComments } from 'react-icons/tfi'
import { RiShareForwardLine } from 'react-icons/ri'
import { CiSaveDown2 } from 'react-icons/ci'
import { useState } from "react"
import "./PostItem.scss"
const PostItem = (props) => {
    const navigate = useNavigate()
    const { post, i, setPosts } = props
    const [isLike, setIsLike] = useState(false)
    const [isDislike, setIsDislike] = useState(false)

    const { id } = useParams()

    const handleLikeCount = (type, id) => {
        setPosts(draft => {
            const p = draft.find((p) => { return p.id === id })
            if (!p['EvaluateType']) {
                if (type === 'like') {
                    p.num_Evaluate += 1
                    p['EvaluateType'] = 'like'
                    setIsLike(true)
                    setIsDislike(false)
                } else {
                    p.num_Evaluate -= 1
                    p['EvaluateType'] = 'dislike'
                    setIsDislike(true)
                    setIsLike(false)

                }
            } else {
                if (type === 'like') {
                    if (!isLike) {
                        p.num_Evaluate += 2
                        p['EvaluateType'] = 'like'
                        setIsLike(true)
                        setIsDislike(false)
                    }
                } else if (type === "dislike") {
                    if (!isDislike) {
                        p.num_Evaluate -= 2
                        p['EvaluateType'] = 'dislike'
                        setIsDislike(true)
                        setIsLike(false)
                    }
                }
            }

        })

    }
    const handleActiveClassEvaluate = (type, evaluated) => {
        if (evaluated === type) {
            return 'active'
        } else {
            return ''
        }
    }
    return (
        <div
            className="contain-posts"
            key={i}

        >
            <div className="post_item">
                <div className="rate">
                    <span
                        onClick={() => handleLikeCount('like', post.id)}
                        className={`like ${handleActiveClassEvaluate('like', post.EvaluateType)}`}
                    >
                        <RxThickArrowUp />
                    </span>
                    <span className="num_Evaluate">{post.num_Evaluate}</span>
                    <span
                        className={`dislike ${handleActiveClassEvaluate('dislike', post.EvaluateType)}`}
                        onClick={() => handleLikeCount('dislike', post.id)}

                    >
                        <RxThickArrowDown />
                    </span>
                </div>
                <div
                    className="content_post"
                    onClick={() => navigate(`/posts/${post.id}`)}
                >
                    <div className="header_post">
                        <span className="g1">
                            <img src={post.imgUser} />
                        </span>
                        <div className="g2">
                            <span className="name">{post.name}</span>
                            <span className='dot'>•</span>
                            <span className="preText">Posted by</span>
                            <span className="info">{post.info}</span>
                            <span className="post_time">{post.post_time} ago</span>
                        </div>
                        <PriButton type="pri" text="Join" />
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostItem