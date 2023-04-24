import { useContext, useEffect, useRef, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FcGoogle } from 'react-icons/fc'
import { BsApple } from 'react-icons/bs'
import PriButton from '../../Button/PriButton';
import { AuthContext } from '../../Context/Context';
import { toast } from 'react-toastify';
import { checkEmailExist, login, register } from '../../../services/apiServices';
import md5 from 'md5';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../../redux/action/userAction';
import ModalLoading from './ModalLoading';
const ModalSignInUp = (props) => {
    const { show, setShow } = props
    const [isVerified, setIsVerified] = useState(false)
    const [verifiedInput, setVerifiedInput] = useState(false)
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [typeModal, setTypeModal] = useState("login")
    const [disabledBtn, setDisabledBtn] = useState(true)
    const refInput = useRef()
    const dispatch = useDispatch()
    const [showloading, setShowloading] = useState(false)
    useEffect(() => {
        handleDisableButton()
    }, [username, password, email])

    useEffect(() => {
        refInput?.current?.focus()
    }, [show, typeModal])


    const formSubmit = (e) => {
        e.preventDefault()
        handleSubmit()
    }

    const handleCloseModal = () => {
        setTypeModal('login')
        setShow(false)
        setEmail('')
        setUsername('')
        setPassword('')
        setVerifiedInput(false)
        setIsVerified(false)
    }
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleOnChangeInput = (e) => {
        if (typeModal === 'login') {
            if (e.target.name === 'email') {
                setEmail(e.target.value)
                handleVerifyInput(e.target.value, 'email')
            }
            if (e.target.name === 'password') {
                e.target.type = 'password'
                setPassword(e.target.value)
            }
        } else if (typeModal === 'continue') {
            if (e.target.name === 'email') {
                setEmail(e.target.value)
                handleVerifyInput(e.target.value, 'email')
            }
        } else if (typeModal === 'signup') {
            if (e.target.name === 'username') {
                setUsername(e.target.value)
                handleVerifyInput(e.target.value, 'name')
            }
            if (e.target.name === 'password') {
                e.target.type = 'password'
                setPassword(e.target.value)
            }


        }

    }
    const handleVerifyInput = (value, type) => {
        setIsVerified(true)
        if (isVerified) {
            if (type === 'name') {
                if (value && value.length >= 3 && value.length < 20) {
                    setVerifiedInput(true)

                } else {
                    setVerifiedInput(false)
                }

            } else {
                if (validateEmail(value)) {
                    setVerifiedInput(true)
                } else {
                    setVerifiedInput(false)
                }
            }
        }
    }


    const handleChangeTypeModal = () => {
        setEmail('')
        setUsername('')
        setPassword('')
        setIsVerified(false)
        setVerifiedInput(false)
        if (typeModal === "login") {
            setTypeModal('continue')
        } else if (typeModal === "continue" || typeModal === "signup") {
            setTypeModal('login')
        }
    }

    const handleDisableButton = () => {
        if (typeModal === "login") {
            if (verifiedInput && password.length > 0) {
                setDisabledBtn(false)
            } else {
                setDisabledBtn(true)
            }
        } else if (typeModal === "continue") {
            if (verifiedInput && email.length > 0) {
                setDisabledBtn(false)

            } else {
                setDisabledBtn(true)

            }
        } else if (typeModal === 'signup') {
            if (verifiedInput && password.length > 0) {
                setDisabledBtn(false)
            } else {
                setDisabledBtn(true)
            }
        }
    }

    const setClassNameVerified = () => {
        if (!isVerified) return ''
        if (verifiedInput) {
            return 'Verified'
        } else {
            return "noVerified"
        }
    }
    const textNoVerified = (type) => {
        if (isVerified) {
            if (!verifiedInput) {
                if (type === "name") {
                    return (
                        <span className="err">Username must be between 3 and 20 characters</span>
                    )
                } else if (type === "email") {
                    return (
                        <span className="err">Invalid email</span>
                    )

                }


            }
        }

    }
    const handleSubmit = async () => {
        if (showloading) {
            return
        }
        const start = performance.now()
        setShowloading(true)
        if (disabledBtn) return
        if (typeModal === "login") {
            const res = await login(email, md5(password))
            console.log("res ", res)
            const end = performance.now()
            setShowloading(true)
            setTimeout(() => {
                setShowloading(false)
            }, (end - start))
            if (res.EC === 0) {
                setDisabledBtn(true)
                dispatch(doLogin(res.DT))
                toast.info("Login successfully", {
                    position: "top-center",
                })
                handleCloseModal()

            } else {
                toast.error(res.DT, {
                    position: "top-center",
                })
            }
        } else if (typeModal === "continue") {
            const res = await checkEmailExist(email)
            const end = performance.now()
            setShowloading(true)
            setTimeout(() => {
                setShowloading(false)
            }, (end - start))
            if (res && res.EC == 0) {
                setTypeModal("signup")
            } else {
                toast.error(res.DT, {
                    position: "top-center",
                })

            }
            setDisabledBtn(true)
        } else if (typeModal === "signup") {
            const res = await register(email, md5(password), username)
            const end = performance.now()
            setShowloading(true)
            setTimeout(() => {
                setShowloading(false)
            }, (end - start))
            if (res.EC === 0) {
                setDisabledBtn(true)
                toast.success("Register successfully", {
                    position: "top-center",
                })
            } else {
                toast.error(res.DT, {
                    position: "top-center",
                })
            }
            handleCloseModal()

        }

    }

    return (
        <Modal
            show={show}
            onHide={handleCloseModal}
            className="modalSignInUp"
        >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>

                <div className="header">
                    {typeModal !== 'signup' ?
                        <>
                            <h2> {typeModal === 'login' ? 'Log in' : 'Sign up'}</h2>
                            <p>By continuing, you agree are setting up a Reddit account
                                and agree to our
                                <a href="https://www.redditinc.com/policies/user-agreement"> User Agreement </a>
                                and
                                <a href="https://www.reddit.com/policies/privacy-policy"> Privacy Policy </a>.
                            </p>
                        </>
                        :
                        <>
                            <h2>Choose your username</h2>
                            <p>Your username is how other community members will see you. This name will be used to credit you for things you share on Reddit. What should we call you?</p>
                        </>
                    }

                </div>
                <form onSubmit={formSubmit}>
                    {typeModal !== 'signup' &&
                        <div className="sso">
                            <div className="sso-btn">
                                <FcGoogle className="icon" />
                                <span>Continue with Google</span>
                            </div>
                            <div className="sso-btn">
                                <BsApple className="icon" />
                                <span>Continue with Apple</span>
                            </div>
                            <div className="divide">
                                <span className="line"></span>
                                <span className="text">or</span>
                                <span className="line"></span>
                            </div>
                        </div>
                    }


                    {typeModal === "login" &&
                        <>
                            <div className='form-floating mb-3 '>
                                <input
                                    spellCheck={false}
                                    type='text'
                                    className={`form-control `}
                                    name="email"
                                    value={email}
                                    onChange={(e) => handleOnChangeInput(e)}
                                    ref={refInput}

                                />
                                <label>Email</label>
                                {textNoVerified('email')}

                            </div>
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    autoComplete="off"
                                    name="password"
                                    value={password}
                                    onChange={(e) => handleOnChangeInput(e)}
                                />
                                <label>Password</label>
                            </div>
                        </>
                    }
                    {typeModal === "continue" &&
                        <div className='form-floating mb-3 '>
                            <input
                                spellCheck={false}
                                type='text'
                                className={`form-control `}
                                name="email"
                                ref={refInput}
                                value={email}
                                onChange={(e) => handleOnChangeInput(e)}

                            />
                            <label>Email</label>
                            {textNoVerified('email')}
                        </div>}

                    {typeModal === "signup" &&
                        <>
                            <div className='form-floating mb-3 '>
                                <input
                                    spellCheck={false}
                                    type='text'
                                    className={`form-control ${setClassNameVerified()}`}
                                    name="username"
                                    value={username}
                                    ref={refInput}
                                    onChange={(e) => handleOnChangeInput(e)}

                                />
                                <label>Choose a username</label>
                                {textNoVerified('name')}

                            </div>
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    autoComplete="off"
                                    name="password"
                                    value={password}
                                    onChange={(e) => handleOnChangeInput(e)}
                                />
                                <label>Password</label>
                            </div>
                        </>
                    }
                    <div className="forgot_info">
                        {typeModal === 'login' && <div>Forget your <span>username</span> or <span>password</span> ?</div>}
                    </div>
                    <button style={{ visibility: "hidden" }} type="submit"></button>
                    {typeModal === "login" ?

                        <div className="btn_submit" onClick={handleSubmit}>
                            <PriButton disabled={disabledBtn} type="signinup" text={typeModal === "login" ? 'Log in' : "Continue"} />
                        </div>

                        :

                        <div className="btn_submit" onClick={handleSubmit}>
                            <PriButton disabled={disabledBtn} type="signinup" text={typeModal === "continue" ? 'Continue' : "Sign up"} />
                        </div>

                    }


                    <div className="bottomText">
                        {typeModal === 'login' ?
                            <div>New to RedRed?<span onClick={handleChangeTypeModal}> Sign Up </span></div>
                            :
                            <div>Already a redditor? <span onClick={handleChangeTypeModal}> Log in </span></div>
                        }

                    </div>
                </form>
            </Modal.Body>
            <ModalLoading show={showloading} setShow={setShowloading} />
        </Modal>
    )
}
export default ModalSignInUp