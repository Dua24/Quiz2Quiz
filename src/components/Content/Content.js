import "./Content.scss"
import { FaHotjar } from 'react-icons/fa'
import { MdNewReleases } from 'react-icons/md'
import { RiVipCrownLine, RiLayoutRowLine } from 'react-icons/ri'
import { SlOptions, SlArrowDown } from 'react-icons/sl'
import { BsGrid1X2 } from 'react-icons/bs'
import { BiChevronDown } from 'react-icons/bi'
import { RxLayout } from 'react-icons/rx'
import { AiOutlineRise } from 'react-icons/ai'
import { TfiLayoutMenuV, TfiLayoutAccordionMerged } from 'react-icons/tfi'
import Dropdown from 'react-bootstrap/Dropdown';
import Trending from "./Trending/Trending"
import SubPosts from "./Posts/SubPosts"
const Content = () => {
    return (
        <div className="content-container">
            <div className="header-content">
                <Trending />
            </div>
            <div className="body-content">

                <div className="posts">
                    <div className="main-posts">
                        <h4 className="title">Popular posts</h4>
                        <div className="filter_posts ">
                            <div className="filter_items ">
                                <span className='active'><FaHotjar /> Hot</span>
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        Everywhere <BiChevronDown style={{ fontSize: '22px' }} />
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2" className="active">Another action</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <span><MdNewReleases /> New</span>
                                <span><RiVipCrownLine /> Top</span>
                            </div>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    <SlOptions />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1"><AiOutlineRise /> Action</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            <Dropdown className="layout_option">
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    <RxLayout style={{ fontSize: '24px' }} /> <BiChevronDown style={{ fontSize: '22px' }} />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1" className="active"><RiLayoutRowLine /> Card</Dropdown.Item>
                                    <Dropdown.Item href="#/action-1"><TfiLayoutAccordionMerged /> Classic</Dropdown.Item>
                                    <Dropdown.Item href="#/action-1"><TfiLayoutMenuV /> Compact</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <span ></span>
                        </div>
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