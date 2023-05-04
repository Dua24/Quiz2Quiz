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
import ModalProfile from "../Header/Modals/ModalPofile";
import { useImmer } from "use-immer";
import moment from "moment";
import _ from "lodash";
const Participant = () => {
    const { id } = useParams()
    const [user, setUser] = useState({})
    const [postsByUser, setPostByUser] = useImmer([])
    const { isAuthenticated, account } = useSelector(state => state.user)
    const [showModalProfile, setShowModalProfile] = useState(false)
    useEffect(() => {
        // 👇️ scroll to top on page load
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    useEffect(() => {
        fetchUser()
        fetchPostsByUser()
    }, [id])

    const fetchUser = async () => {
        const res = await getUser(id)
        if (res.EC === 0) {
            setUser(res.DT)
        }
    }
    console.log("user ", user)
    const fetchPostsByUser = async () => {
        const res = await getPostsByUser(id)
        if (res.EC == 0) {
            setPostByUser(res.DT)
        }
        if (res && res.EC === 0) {
            res.DT.forEach((e) => {
                e['post_time'] = handleDurationPostPosted(e.createdAt)
            })
            setPostByUser(_.sortBy(res.DT, ['post_time']))
        } else {
            setPostByUser([])
        }
    }
    const handleDurationPostPosted = (timeCreateAt) => {
        const start = moment(timeCreateAt);
        const now = moment();
        const duration = moment.duration(now.diff(start));

        let durationText;
        if (duration.asSeconds() < 60) {
            durationText = `${Math.ceil(duration.asSeconds())} seconds`;
        } else if (duration.asMinutes() < 60) {
            durationText = `${duration.minutes()} minutes`;
        } else {
            durationText = `${duration.hours()} hours`;
        }
        return durationText
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
                        {/* <span>
                            <PriButton type="pri" text="Join" />
                        </span> */}
                    </div>
                    {id === account.id && <div className="changeProfile" onClick={() => setShowModalProfile(true)}>Change profile</div>}

                </div>
                <div className="label">
                    <span>Posts</span>
                </div>
            </div>
            <div className="user_newfeed_container">
                <div className="user_newfeed">
                    {_.isEmpty(postsByUser) ?
                        <div className="not">You haven't post anythings yet</div>
                        :
                        <>
                            <FilterPost posts={postsByUser} setPosts={setPostByUser} />
                            <Posts posts={postsByUser} setPosts={setPostByUser} fetchPostsByUser={fetchPostsByUser} />
                        </>
                    }
                </div>
                <div className="side"></div>
            </div>
            {showModalProfile && <ModalProfile show={showModalProfile} setShow={setShowModalProfile} fetchUser={fetchUser} />}
        </div>
    )
}

export default Participant