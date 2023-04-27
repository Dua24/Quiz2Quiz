import { useState, useEffect } from "react";
import "./header.scss"
import logo from "../../assets/logo/reddit-logo.png"
import logoTitle from "../../assets/logo/reddit-title.png"
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SearchInput from "./SearchInput";
import PriBtn from "../Button/PriButton"
import Dropdown from 'react-bootstrap/Dropdown';
import { BsQrCodeScan, BsLightbulb } from "react-icons/bs";
import { CiUser, CiDark, CiLogin } from 'react-icons/ci'
import { SlArrowDown } from 'react-icons/sl'
import { AiOutlineMessage } from 'react-icons/ai'
import { IoNotificationsOutline } from "react-icons/io5";
import SwitchMode from "./SwitchMode/SwitchMode";
import { Link, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import ModalQR from "./Modals/ModalQR";
import ModalSignInUp from "./Modals/ModalSignInUp";
import { MdOutlineLanguage } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'
import { useContext } from "react";
import { AuthContext } from "../Context/Context";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../services/apiServices";
import { doLogout } from "../../redux/action/userAction";
import { toast } from "react-toastify";
import { pressDarkMode } from "../../redux/action/darkModeAction";
import ModalProfile from "./Modals/ModalPofile";
const Header = (props) => {
    const { showMessageBox, setShowMessageBox } = props
    const [showModalQR, setShowModalQR] = useState(false)
    const { setShowModalSignInUp } = useContext(AuthContext);
    const dispatch = useDispatch()
    const { account, isAuthenticated } = useSelector(state => state.user)
    const { status } = useSelector(state => state.darkMode)
    const [darkMode, setDarkMode] = useState(status.dark);
    const navigate = useNavigate()
    useEffect(() => {
        document.body.classList.toggle('dark', darkMode);
    }, [darkMode]);

    const toggleMode = () => {
        dispatch(pressDarkMode(!darkMode))
        setDarkMode(!darkMode);
    }
    const handleLogOut = async () => {
        const res = await logout(account.email)
        if (res && res.EC === 0) {
            dispatch(doLogout())
            toast.info("Logout successfully", {
                position: "top-center",
            })
            navigate("/")
        } else {
            toast.error("CO Loi khi log out...")
        }

    }
    const handleMoveUserPage = () => {
        navigate(`/participant/${account.id}`)
    }
    return (
        <div className="header-container">
            <Container fluid>
                <Navbar expand="lg">
                    <Navbar.Brand className=" col-2">
                        <Link className="logo" to="/">
                            <img src={logo} width="33" height="33" className="d-inline-block align-top" alt="" />
                            <img src={logoTitle} width="60" className="d-inline-block align-top" alt="" />

                        </Link>

                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav col-10">
                        <Nav.Item className="col-6">
                            <SearchInput />
                        </Nav.Item>
                        {!isAuthenticated ?
                            <>
                                <Nav.Item className="col-5">
                                    <Nav.Link style={{ display: "flex", justifyContent: "flex-end", gap: '15px' }}>
                                        <div onClick={() => setShowModalQR(true)} >
                                            <PriBtn type="spri" text="Get app" icons={<BsQrCodeScan />} />
                                        </div>
                                        <div onClick={() => setShowModalSignInUp(true)}>
                                            <PriBtn type="pri" text="Log in" />
                                        </div>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="col-1">
                                    <Dropdown className="drop" autoClose="outside">
                                        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                                            <CiUser style={{ fontSize: '22px' }} /> <SlArrowDown style={{ fontSize: '10px' }} />
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu variant="dark">
                                            <Dropdown.Item
                                                onClick={toggleMode}
                                            >

                                                {!darkMode ?
                                                    <> <CiDark className="iconDd" />
                                                        Dark Mode
                                                    </>
                                                    :
                                                    <>
                                                        <BsLightbulb className="iconDd" />
                                                        Light Mode</>
                                                }

                                                <SwitchMode toggled={darkMode} />
                                            </Dropdown.Item>
                                            <Dropdown.Divider />

                                            <Dropdown.Item onClick={() => setShowModalSignInUp(true)}>
                                                <CiLogin className="iconDd" />
                                                Log in / Sign up
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Nav.Item>
                            </>
                            :
                            <>
                                <div className="col-2"></div>
                                <div className="col-4 contain_user_actions">
                                    <span className="user_actions" onClick={() => setShowMessageBox(!showMessageBox)}>
                                        <AiOutlineMessage />
                                    </span>
                                    <span className="user_actions">
                                        <IoNotificationsOutline />
                                    </span>
                                    <Dropdown className="drop" autoClose="outside">
                                        <Dropdown.Toggle className="dropdown_toggle_language" variant="secondary">
                                            <MdOutlineLanguage />
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu variant="dark">
                                            <Dropdown.Item>
                                                English
                                            </Dropdown.Item>
                                            <Dropdown.Item>
                                                Vietnamese
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Dropdown className="drop" autoClose="outside">
                                        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                                            <img src={account.image} />
                                            <span>{account.username}</span>

                                        </Dropdown.Toggle>

                                        <Dropdown.Menu variant="dark">
                                            <Dropdown.Item
                                                onClick={toggleMode}
                                            >
                                                <CiDark className="iconDd" />
                                                Dark Mode
                                                <SwitchMode toggled={darkMode} />
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                onClick={handleMoveUserPage}
                                            >
                                                <CgProfile />
                                                Profile
                                            </Dropdown.Item>
                                            <Dropdown.Divider />

                                            <Dropdown.Item onClick={handleLogOut}>
                                                <CiLogin className="iconDd" />
                                                Log out
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </>
                        }


                    </Navbar.Collapse>
                </Navbar>
            </Container >

            <ModalQR show={showModalQR} setShow={setShowModalQR} />
        </div>
    )
}
export default Header