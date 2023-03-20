import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FcGoogle } from 'react-icons/fc'
import { BsApple } from 'react-icons/bs'
import PriButton from '../../Button/PriButton';
import { version } from 'react-dom';
const ModalSignInUp = (props) => {
    const { show, setShow } = props
    const [isVerified, setIsVerified] = useState(false)
    const [verifiedInput, setVerifiedInput] = useState()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")




    const handleOnChangeInput = (e) => {
        if (e.target.name === 'email') {
            setEmail(e.target.value)
            handleVerifyInput(e.target.value)
        }
        if (e.target.name === 'password') {
            e.target.type = 'password'
            setPassword(e.target.value)
        }
    }

    const handleVerifyInput = (value) => {
        setIsVerified(true)
        if (isVerified) {
            if (value && value.length > 3 && value.length < 20) {
                setVerifiedInput(true)
            } else {
                setVerifiedInput(false)
            }
        }
    }

    const setClassNameVerified = () => {
        if (!isVerified) return ''
        if (verifiedInput) {
            console.log("1")
            return 'Verified'
        } else {
            console.log("2")

            return "noVerified"
        }
    }
    const textNoVerified = () => {
        if (isVerified) {
            if (!verifiedInput) {
                return (
                    <span className="err">Username must be between 3 and 20 characters</span>
                )

            }
        }

    }

    return (
        <Modal
            show={show}
            onHide={() => setShow(false)}
            className="modalSignInUp"
        >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <div className="header">
                    <h2>Log in</h2>
                    <p>By continuing, you agree are setting up a Reddit account
                        and agree to our
                        <a href="https://www.redditinc.com/policies/user-agreement"> User Agreement </a>
                        and
                        <a href="https://www.reddit.com/policies/privacy-policy"> Privacy Policy </a>.
                    </p>
                </div>
                <form>
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
                    <div className='form-floating mb-3 '>
                        <input
                            type='text'
                            className={`form-control ${setClassNameVerified()}`}
                            name="email"
                            value={email}
                            onChange={(e) => handleOnChangeInput(e)}

                        />
                        <label>Username</label>
                        {textNoVerified()}

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
                    <div className="forgot_info">
                        Forget your <span>username</span> or <span>password</span> ?
                    </div>
                    <div className="btn_submit">
                        <PriButton type="signinup" text='log in' />
                    </div>
                    <div className="bottomText">
                        New to RedRed?<span> Sign Up </span>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}
export default ModalSignInUp