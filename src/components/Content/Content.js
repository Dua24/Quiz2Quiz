import "./Content.scss"
import { FaHotjar } from 'react-icons/fa'
import { MdNewReleases } from 'react-icons/md'
import { RiVipCrownLine } from 'react-icons/ri'
import { SlOptions, SlArrowDown } from 'react-icons/sl'
import { BsGrid1X2 } from 'react-icons/bs'
import { BiChevronDown } from 'react-icons/bi'
import { RxLayout } from 'react-icons/rx'
import Dropdown from 'react-bootstrap/Dropdown';
const Content = () => {
    return (
        <div className="content-container">
            <div className="header-content">
                <h4 className="title">Trending today</h4>
                <div className="trending row">
                    <div className="item col-3">
                        <img src="https://external-preview.redd.it/7bN4mwskb7xZr0Cj59npWyJB7CPx3QHCqy_vyD19BEs.jpg?auto=webp&v=enabled&s=0af3af81a1636555137c99cbdbc5d411fe534e4b" className="item_img" />
                        <div className="trend-info">
                            <h5>No-Confidence Vote in France</h5>
                            <p>Macron survives no-confidence votes over French pension reforma aaaa aaaaaa aa</p>
                            <div className="owner">
                                <img src="https://styles.redditmedia.com/t5_2n4vyh/styles/communityIcon_5h39ry24bx651.png?width=256&v=enabled&s=5d14f774183ef251b9a1376880a47c1ed5a23013"
                                    className="owner_img"
                                />
                                <span className="detail">r/anime_titties and more</span>
                            </div>
                        </div>
                    </div>
                    <div className="item col-3">
                        <img src="https://external-preview.redd.it/qx4ZOKWsEFh4f0ClgGKDbP0RiQQY6yKGFZulc5YlCPA.jpg?auto=webp&v=enabled&s=0f40f36b31bfa7cfd4c712a00834ca609e1d9a32" className="item_img" />
                        <div className="trend-info">
                            <h5>Twitch Layoff</h5>
                            <p>Twitch Ceo lays off 400 employees</p>
                            <div className="owner">
                                <img src="https://styles.redditmedia.com/t5_38jf0/styles/communityIcon_ldprshtow1r81.png?width=256&v=enabled&s=40e3c1141b5c1f75e4c110037736f6b22ff4519b"
                                    className="owner_img"
                                />
                                <span className="detail">r/LivestreamFail and more</span>
                            </div>
                        </div>
                    </div>
                    <div className="item col-3">
                        <img src="https://external-preview.redd.it/gLwo__j3WWx2kx9jLiiSGaNliryZQ9YYwUYI1shyBTo.jpg?auto=webp&v=enabled&s=09dd991eae887a1d851cc39e88555e6841763999" className="item_img" />
                        <div className="trend-info">
                            <h5>Oath Keepers Convicted</h5>
                            <p>Six Oath Keepers convicted in connection with January 6 US Capitol riot</p>
                            <div className="owner">
                                <img src="https://styles.redditmedia.com/t5_2n4vyh/styles/communityIcon_5h39ry24bx651.png?width=256&v=enabled&s=5d14f774183ef251b9a1376880a47c1ed5a23013"
                                    className="owner_img"
                                />
                                <span className="detail">r/news and more</span>
                            </div>
                        </div>
                    </div>
                    <div className="item col-3">
                        <img src="https://external-preview.redd.it/7bN4mwskb7xZr0Cj59npWyJB7CPx3QHCqy_vyD19BEs.jpg?auto=webp&v=enabled&s=0af3af81a1636555137c99cbdbc5d411fe534e4b" className="item_img" />
                        <div className="trend-info">
                            <h5>Andy Kaufman</h5>
                            <p>Andy Kaufman to Be Inducted Into WWE Hall of Fame</p>
                            <div className="owner">
                                <img src="https://styles.redditmedia.com/t5_2n4vyh/styles/communityIcon_5h39ry24bx651.png?width=256&v=enabled&s=5d14f774183ef251b9a1376880a47c1ed5a23013"
                                    className="owner_img"
                                />
                                <span className="detail">r/anime_titties and more</span>
                            </div>
                        </div>
                    </div>

                </div>
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
                                        Everywhere
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
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
                            <span className="options "><SlOptions /></span>
                            <span className="layout_option"><RxLayout style={{ fontSize: '24px' }} /> <BiChevronDown style={{ fontSize: '22px' }} /></span>
                        </div>
                    </div>
                    <div className="sub-posts">afdsfdf</div>
                </div>
            </div>
        </div>
    )
}

export default Content