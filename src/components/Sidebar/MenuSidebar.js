import {
    Menu,
    MenuItem, SubMenu
} from 'react-pro-sidebar';
import { Link } from "react-router-dom";
import 'react-pro-sidebar/dist/scss/styles.scss';
import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart } from 'react-icons/fa';
const MenuSidebar = (props) => {
    const { item } = props
    return (
        <Menu iconShape="circle " className="menuSidebar">
            <span className="title">{item.title}</span>
            {item && item.components.length > 0 && item.components.map((menuItem, index) => {
                if (menuItem.child && menuItem.child.length > 0) {
                    return (
                        <SubMenu
                            title={menuItem.label}
                            icon={menuItem.icon}
                            key={index}
                        >
                            {menuItem.child.map((child, indexc) => {
                                return (
                                    <MenuItem key={indexc}>
                                        <Link to="/" />
                                        {child}
                                    </MenuItem>
                                )
                            })}
                            <div style={{
                                borderBottom: '1px solid #1c1c1c14',
                                padding: '7px 0',
                                width: '80%'
                            }} >

                            </div>
                        </SubMenu>
                    )
                } else {
                    return (
                        <MenuItem
                            key={index}
                            icon={menuItem.icon}
                        >
                            <Link to={menuItem.link} />
                            {menuItem.label}
                        </MenuItem>
                    )
                }


            })}

        </Menu >
    )
}

export default MenuSidebar

{/* <Menu iconShape="circle">
                    <span>Header</span>
                    <MenuItem
                        icon={<FaTachometerAlt />}
                    >
                        <Link to="/admins" />
                        Item
                    </MenuItem>
                    <MenuItem icon={<FaGem />}>Item</MenuItem>
                </Menu>
                <Menu iconShape="circle">
                    <span>Header</span>

                    <MenuItem
                        icon={<FaTachometerAlt />}
                    >
                        <Link to="/admins" />
                        Item
                    </MenuItem>
                    <MenuItem icon={<FaGem />}>Item</MenuItem>
                    <MenuItem
                        icon={<FaTachometerAlt />}
                    >
                        <Link to="/admins" />
                        Item
                    </MenuItem>
                    <MenuItem icon={<FaGem />}>Item</MenuItem>
                    <MenuItem
                        icon={<FaTachometerAlt />}
                    >
                        <Link to="/admins" />
                        Item
                    </MenuItem>
                    <MenuItem icon={<FaGem />}>Item</MenuItem>
                </Menu> */}
