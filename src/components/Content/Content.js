import "./Content.scss"
import { useState, useContext, useRef } from "react"
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
import ModalImg from "../Header/Modals/ModalImg"
import ReactLoading from 'react-loading';
const Content = (props) => {
    const { isAuthUser, posts, setPosts, user } = useContext(AuthContext);
    const [inputPostValue, setInputPostValue] = useState('')
    const [disabledBtnPost, setDisabledBtnPost] = useState(true)
    const [attchPost, setAttchPost] = useState()
    const inputRef = useRef()
    const [showModalImg, setShowModalImg] = useState(false)
    useEffect(() => {
        if (inputPostValue) {
            setDisabledBtnPost(false)
        } else {
            setDisabledBtnPost(true)
        }
    }, [inputPostValue])


    const handleCreatePost = () => {
        if (disabledBtnPost) return
        let type = "text"
        if (attchPost) {
            type = "img"
        }
        setPosts(draft => {
            draft.unshift({
                id: uuidv4(),
                num_Evaluate: 0,
                owner: {
                    id: user.id,
                    name: `r/${user.name_user}`,
                    img: user.img_user,
                },
                post_time: '1 seconds',
                post_detail: inputPostValue,
                img_detail: attchPost || '',
                numComment: 0,
                type: type,
                deletable: true
            })
        })
        toast.success("Post successfully", {
            autoClose: 2000
        })
        setInputPostValue("")
        setDisabledBtnPost(true)
        setAttchPost()
    }
    const handleImgCreatePost = () => {
        inputRef.current.click()
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        e.target.value = null;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setAttchPost(reader.result);
            setDisabledBtnPost(false)
        };
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
                                    <img src={user.img_user} />
                                    <span></span>
                                </div>
                                <div className="input_post">
                                    <input
                                        value={inputPostValue}
                                        onChange={(e) => setInputPostValue(e.target.value)}
                                        placeholder="Create post" />
                                    {attchPost
                                        &&
                                        <span className="nameAttch" onClick={() => setShowModalImg(true)}>
                                            Image
                                        </span>}
                                </div>
                                <div className="options_post">


                                    <input
                                        type="file"
                                        hidden
                                        ref={inputRef}
                                        onChange={(e) => handleFileChange(e)}
                                    />
                                    <span onClick={() => handleImgCreatePost()}>
                                        <FiImage />
                                    </span>
                                    <span>
                                        <AiOutlineLink />
                                    </span>
                                    <span onClick={() => handleCreatePost()}>
                                        <PriButton disabled={disabledBtnPost} type="pri" text="Post" />
                                    </span>
                                </div>

                            </div>


                        }
                        <FilterPost posts={posts} setPosts={setPosts} />
                        {posts ?
                            <Posts posts={posts} setPosts={setPosts} />
                            :
                            <ReactLoading className="loadwait" type={"spin"} color="#1e88e5" />}

                    </div>
                    <div className="sub-posts">
                        <SubPosts />
                    </div>
                </div>
            </div>
            <ModalImg show={showModalImg} setShow={setShowModalImg} src={attchPost} />
        </div>
    )
}

export default Content