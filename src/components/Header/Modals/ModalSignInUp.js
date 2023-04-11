import { useContext, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FcGoogle } from 'react-icons/fc'
import { BsApple } from 'react-icons/bs'
import PriButton from '../../Button/PriButton';
import { AuthContext } from '../../Context/Context';
import { toast } from 'react-toastify';
const ModalSignInUp = (props) => {
    const { show, setShow } = props
    const { setIsAuthUser } = useContext(AuthContext);
    const [isVerified, setIsVerified] = useState(false)
    const [verifiedInput, setVerifiedInput] = useState(false)
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [typeModal, setTypeModal] = useState("login")
    const [disabledBtn, setDisabledBtn] = useState(true)


    useEffect(() => {
        handleDisableButton()
    }, [username, password, email])

    const handleCloseModal = () => {
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
            if (e.target.name === 'username') {
                setUsername(e.target.value)
                handleVerifyInput(e.target.value, 'name')
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
            if (email.length > 0) {
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
    const handleSubmit = () => {
        if (disabledBtn) return
        if (typeModal === "login") {
            setDisabledBtn(true)
            setIsAuthUser(true)
            setShow(false)
            toast.success("Login successfully", {
                position: "top-center",
            })
        } else if (typeModal === "continue") {
            setDisabledBtn(true)
            setTypeModal("signup")
        } else if (typeModal === "signup") {
            setDisabledBtn(true)
            setIsAuthUser(true)
            setShow(false)
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
                <form>
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
                                    className={`form-control ${setClassNameVerified()}`}
                                    name="username"
                                    value={username}
                                    onChange={(e) => handleOnChangeInput(e)}

                                />
                                <label>Username</label>
                                {textNoVerified("name")}

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
        </Modal>
    )
}
export default ModalSignInUp