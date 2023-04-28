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
import { useSelector } from "react-redux"
import { postPost } from "../../services/apiServices"
const Content = (props) => {
    const { posts, setPosts, fetchListPosts } = useContext(AuthContext);
    const [inputPostValue, setInputPostValue] = useState('')
    const { isAuthenticated, account } = useSelector(state => state.user)
    const [disabledBtnPost, setDisabledBtnPost] = useState(true)
    const [attchPost, setAttchPost] = useState('')
    const inputRef = useRef()
    const [showModalImg, setShowModalImg] = useState(false)
    const [previewImg, setPreviewImg] = useState()
    useEffect(() => {
        if (inputPostValue) {
            setDisabledBtnPost(false)
        } else {
            setDisabledBtnPost(true)
        }
    }, [inputPostValue])


    const handleCreatePost = async () => {
        if (disabledBtnPost) return
        let type = "text"
        if (attchPost) {
            type = "img"
        }
        const res = await postPost(inputPostValue, type, account.id, attchPost)
        if (res && res.EC === 0) {
            toast.success("Post successfully", {
                autoClose: 2000
            })
            fetchListPosts()
            setInputPostValue("")
            setDisabledBtnPost(true)
            setAttchPost('')
        }
    }
    const handleImgCreatePost = () => {
        inputRef.current.click()
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        e.target.value = null;
        setAttchPost(file);
        setDisabledBtnPost(false)
        file2Base64(file)
    }
    const file2Base64 = (attchPost) => {
        if (attchPost) {
            const reader = new FileReader();
            reader.readAsDataURL(attchPost);
            reader.onload = () => {
                setPreviewImg(reader.result)
            };
        }
    }

    return (

        <div className="content-container">
            {!isAuthenticated &&
                <div className="header-content">
                    <Trending />
                </div>}

            <div className="body-content">

                <div className="posts">

                    <div className="main-posts">

                        {isAuthenticated &&
                            <div className="create_post">
                                <div className="logo_post">
                                    <img src={account.image} />
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
            <ModalImg show={showModalImg} setShow={setShowModalImg} src={previewImg} />
        </div>
    )
}

export default Content