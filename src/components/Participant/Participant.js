import { useContext, useEffect } from "react";
import "./Participant.scss"
import { AuthContext } from "../Context/Context";
import PriButton from "../Button/PriButton"
import { useParams } from "react-router-dom";
import FilterPost from "../Content/Posts/FilterPost";
import Posts from "../Content/Posts/Posts";
const Participant = () => {
    const { isAuthUser, user, posts, setPosts } = useContext(AuthContext);
    const { id } = useParams()


    useEffect(() => {
        // 👇️ scroll to top on page load
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);



    return (
        <div className="participant_container">
            <div className="board"></div>
            <div className="user_info">
                <div className="info_detail">
                    <img src={user.img_user} />
                    <div className="contain_name">
                        <h1>{user.name_user}</h1>
                        <span>
                            <PriButton type="pri" text="Join" />
                        </span>
                    </div>
                </div>
                <div className="label">
                    <span>Posts</span>
                </div>
            </div>
            <div className="user_newfeed_container">
                <div className="user_newfeed">
                    <FilterPost posts={posts} setPosts={setPosts} />
                    <Posts posts={posts} setPosts={setPosts} />
                </div>
                <div className="side"></div>
            </div>
        </div>
    )
}

export default Participant