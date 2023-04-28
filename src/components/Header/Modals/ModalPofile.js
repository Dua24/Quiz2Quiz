import { useRef, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { checkUsernameExist, updateProfile } from '../../../services/apiServices';
import { BsCameraFill } from 'react-icons/bs'
import { doUpdate } from '../../../redux/action/userAction';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../Context/Context';
const ModalProfile = (props) => {
    const { show, setShow, fetchUser } = props;
    const { isAuthenticated, account } = useSelector(state => state.user)
    const [usernameUpdate, setUsernameUpdate] = useState(account.username)
    const [imgPreivew, setImgPreview] = useState(account.image)
    const inputRef = useRef()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [imageUpdate, setImageUpdate] = useState()
    const { fetchListPosts } = useContext(AuthContext);
    const handleUpdateBtn = async () => {
        if (usernameUpdate) {
            if (usernameUpdate !== account.username) {
                const res = await checkUsernameExist(usernameUpdate)
                if (res && res.EC == 0) {
                    if (!imageUpdate) {
                    }
                    const resUpdate = await updateProfile(account.id, usernameUpdate, imageUpdate)
                    if (resUpdate && resUpdate.EC === 0) {
                        setShow(false)
                        await fetchUser()
                        dispatch(doUpdate({ _id: account.id, email: account.email, username: usernameUpdate, image: imgPreivew }))
                        toast.success("Update Profile successfully")
                        navigate("/")
                        fetchListPosts()
                    } else {
                        toast.error("Some thing wrong")
                    }
                } else {
                    toast.error("Username is already exist !!!")
                }
            } else {
                const resUpdate = await updateProfile(account.id, usernameUpdate, imageUpdate)
                if (resUpdate && resUpdate.EC === 0) {
                    setShow(false)
                    await fetchUser()
                    dispatch(doUpdate({ _id: account.id, email: account.email, username: usernameUpdate, image: imgPreivew }))
                    toast.success("Update Profile successfully")
                    navigate("/")
                    fetchListPosts()
                } else {
                    toast.error("Some thing wrong")
                }
            }

        } else {
            toast.error("Username is required !!!")
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        e.target.value = null;
        setImageUpdate(file);
        file2Base64(file)
    }
    const file2Base64 = (attchPost) => {
        if (attchPost) {
            const reader = new FileReader();
            reader.readAsDataURL(attchPost);
            reader.onload = () => {
                setImgPreview(reader.result)
            };
        }
    }
    return (
        <Modal
            show={show}
            onHide={() => setShow(false)}
            className="modalProfile"
            size="xl"
        >
            <Modal.Body style={{ display: 'flex' }}>
                <div className="container-xl px-4 mt-4">
                    <div className="row">
                        <div className="col-xl-4">
                            <div className="card mb-4 mb-xl-0">
                                <div className="card-header">Profile Picture</div>
                                <div className="card-body text-center img">
                                    <img className="img-account-profile rounded-circle mb-2" src={imgPreivew} alt="" />
                                    <input
                                        id="updateImg"
                                        type="file"
                                        hidden
                                        ref={inputRef}
                                        onChange={(e) => handleFileChange(e)}
                                    />
                                    <label htmlFor="updateImg">
                                        <div className="showUpload">
                                            <BsCameraFill />
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-8">
                            <div className="card mb-4">
                                <div className="card-header">Account Details</div>
                                <div className="card-body">
                                    <form>
                                        <div className="mb-3">
                                            <label className="small mb-1" >Email address</label>
                                            <input disabled className="form-control" type="email" value={account.email} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="small mb-1" htmlFor="inputUsername">Username (how your name will appear to other users on the site)</label>
                                            <input
                                                className="form-control"
                                                id="inputUsername"
                                                type="text"
                                                placeholder="Enter your username"
                                                value={usernameUpdate}
                                                onChange={(e) => setUsernameUpdate(e.target.value)} />
                                        </div>

                                        <button
                                            className="btn btn-primary"
                                            type="button"
                                            onClick={() => handleUpdateBtn()}
                                        >
                                            Save changes
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}
export default ModalProfile