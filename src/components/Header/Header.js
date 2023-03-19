import { useState } from "react";
import "./header.scss"
import logo from "../../assets/logo/reddit-logo.png"
import logoTitle from "../../assets/logo/reddit-title.png"
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SearchInput from "./SearchInput";
import PriBtn from "../Button/PriButton"
import Dropdown from 'react-bootstrap/Dropdown';
import { BsQrCodeScan, BsFileEarmarkRuled } from "react-icons/bs";
import { CiUser, CiDark, CiLogin } from 'react-icons/ci'
import { SlArrowDown } from 'react-icons/sl'
import { FiHelpCircle } from 'react-icons/fi'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { TbSpeakerphone } from 'react-icons/tb'
import SwitchMode from "./SwitchMode/SwitchMode";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';

const Header = () => {
    const [toggleModeDark, setToggleModeDark] = useState(false)

    return (
        <div className="header-container">
            <Container fluid>

                <Navbar bg="light" expand="lg">
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
                        <Nav.Item className="col-5">
                            <Nav.Link href="#link" style={{ display: "flex", justifyContent: "flex-end", gap: '15px' }}>
                                <PriBtn type="apri" text="Get app" icons={<BsQrCodeScan />} />
                                <PriBtn type="pri" text="Log in" />
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="col-1">
                            <Dropdown className="drop" autoClose="outside">
                                <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                                    <CiUser style={{ fontSize: '22px' }} /> <SlArrowDown style={{ fontSize: '10px' }} />
                                </Dropdown.Toggle>

                                <Dropdown.Menu variant="dark">
                                    <Dropdown.Item
                                        onClick={() => setToggleModeDark(!toggleModeDark)}
                                    >
                                        <CiDark className="iconDd" />
                                        Dark Mode
                                        <SwitchMode toggled={toggleModeDark} />
                                    </Dropdown.Item>

                                    <Dropdown.Item href="#/action-2">
                                        <FiHelpCircle className="iconDd" />
                                        Help Center
                                    </Dropdown.Item>

                                    <Dropdown.Item href="#/action-3">
                                        <AiOutlineInfoCircle className="iconDd" />
                                        More
                                        <SlArrowDown style={{ fontSize: '10px' }} />
                                    </Dropdown.Item>

                                    <Dropdown.Item href="#/action-3">
                                        <BsFileEarmarkRuled className="iconDd" />
                                        Term & Policies
                                        <SlArrowDown style={{ fontSize: '10px' }} />
                                    </Dropdown.Item>

                                    <Dropdown.Item href="#/action-3">
                                        <TbSpeakerphone className="iconDd" />
                                        Advertise on RedRed
                                    </Dropdown.Item>

                                    <Dropdown.Divider />

                                    <Dropdown.Item href="#/action-4">
                                        <CiLogin className="iconDd" />
                                        Log in / Sign up
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav.Item>

                    </Navbar.Collapse>
                </Navbar>
            </Container >
        </div>
    )
}
export default Header