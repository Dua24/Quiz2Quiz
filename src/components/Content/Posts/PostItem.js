import { useNavigate, useParams } from "react-router-dom"
import PriButton from '../../Button/PriButton'
import { TfiComments } from 'react-icons/tfi'
import { RiShareForwardLine } from 'react-icons/ri'
import { CiSaveDown2 } from 'react-icons/ci'
import "./PostItem.scss"
import Rate from "../Rate"
const PostItem = (props) => {
    const navigate = useNavigate()
    const { post, setPosts } = props


    return (
        <div
            className="contain-posts"
            key={post.id}

        >
            <div className="post_item">
                <Rate
                    setPosts={setPosts}
                    post={post}
                    type="post"
                />
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