import { useContext, useEffect, useState } from "react";
import "./Participant.scss"
import { AuthContext } from "../Context/Context";
import PriButton from "../Button/PriButton"
import { useParams } from "react-router-dom";
import FilterPost from "../Content/Posts/FilterPost";
import Posts from "../Content/Posts/Posts";
import { getPostsByUser, getUser } from "../../services/apiServices";
import { useSelector } from "react-redux";
import { IoIosRadioButtonOff } from "react-icons/io";
const Participant = () => {
    const { id } = useParams()
    const [user, setUser] = useState({})
    const [postsByUser, setPostByUser] = useState([])
    useEffect(() => {
        // 👇️ scroll to top on page load
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    useEffect(() => {
        fetchUser(id)
        fetchPostsByUser(id)
    }, [])

    const fetchUser = async (id) => {
        const res = await getUser(id)
        if (res.EC === 0) {
            setUser(res.DT)
        }
    }
    const fetchPostsByUser = async (id) => {
        const res = await getPostsByUser(id)
        if (res.EC == 0) {
            setPostByUser(res.DT)
        }
    }
    return (
        <div className="participant_container">
            <div className="board"></div>
            <div className="user_info">
                <div className="info_detail">
                    <img src={user.image} />
                    <div className="contain_name">
                        <h1>{user.name}</h1>
                        <span className="g2_detail" >
                            {user.Online
                                ?
                                <>
                                    <IoIosRadioButtonOff className="online" />
                                </>

                                :
                                <>
                                    <IoIosRadioButtonOff className="offline" />
                                </>

                            }
                        </span>
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
                    <FilterPost posts={postsByUser} setPosts={setPostByUser} />
                    <Posts posts={postsByUser} setPosts={setPostByUser} />
                </div>
                <div className="side"></div>
            </div>
        </div>
    )
}

export default Participant