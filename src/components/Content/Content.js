import "./Content.scss"
import { useState, useContext } from "react"
import Trending from "./Trending/Trending"
import SubPosts from "./Posts/SubPosts"
import FilterPost from "./Posts/FilterPost"
import Posts from "./Posts/Posts"

import { AuthContext } from "../Context/Context"
import { FiImage } from 'react-icons/fi'
import { AiOutlineLink } from 'react-icons/ai'
import PriButton from "../Button/PriButton"
import { useEffect } from "react"
import { v4 as uuidv4 } from 'uuid';
import { toast } from "react-toastify"
const Content = (props) => {

    const { isAuthUser, posts, setPosts } = useContext(AuthContext);
    const [inputPostValue, setInputPostValue] = useState('')
    const [disabledBtnPost, setDisabledBtnPost] = useState(true)




    useEffect(() => {
        if (inputPostValue) {
            setDisabledBtnPost(false)
        }
    }, [inputPostValue])


    const handleCreatePost = () => {
        setPosts(draft => {
            draft.unshift({
                id: uuidv4(),
                num_Evaluate: 0,
                imgUser: 'https://styles.redditmedia.com/t5_356bu/styles/communityIcon_ski6pyqvm4t11.png?width=256&v=enabled&s=03183a5135951f470af249880aa2744be9b65c95',
                name: 'r/ndnguyen',
                info: 'u/duynguyen',
                post_time: '1 seconds',
                post_detail: inputPostValue,
                numComment: 0,
                type: 'text'
            })
        })
        toast.success("Post successfully", {
            autoClose: 2000
        })
        setInputPostValue("")
    }

    return (

        <div className="content-container">
            {!isAuthUser &&
                <div className="header-content">
                    <Trending />
                </div>}

            <div className="body-content">

                <div className="posts">
                    <div className="main-posts">
                        {isAuthUser &&
                            <div className="create_post">
                                <div className="logo_post">
                                    <img src="https://styles.redditmedia.com/t5_356bu/styles/communityIcon_ski6pyqvm4t11.png?width=256&v=enabled&s=03183a5135951f470af249880aa2744be9b65c95" />
                                    <span></span>
                                </div>
                                <div className="input_post">
                                    <input
                                        value={inputPostValue}
                                        onChange={(e) => setInputPostValue(e.target.value)}
                                        placeholder="Create post" />
                                </div>
                                <div className="options_post">
                                    <span>
                                        <FiImage />
                                    </span>
                                    <span>
                                        <AiOutlineLink />
                                    </span>
                                    <span onClick={() => handleCreatePost()}>
                                        <PriButton disabled={disabledBtnPost} type="pri" text="Post" />
                                    </span>
                                </div>
                            </div>}
                        <FilterPost posts={posts} setPosts={setPosts} />
                        <Posts posts={posts} setPosts={setPosts} />
                    </div>
                    <div className="sub-posts">
                        <SubPosts />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Content