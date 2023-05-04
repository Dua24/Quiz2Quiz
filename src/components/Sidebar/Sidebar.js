import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import { Link } from "react-router-dom";
import 'react-pro-sidebar/dist/scss/styles.scss';
import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import MenuSidebar from './MenuSidebar';
import { AiOutlineHome, AiOutlineBarChart } from 'react-icons/ai'
import { RiBasketballLine, RiStarSmileLine, RiMoneyDollarCircleFill } from 'react-icons/ri'
import { FiMoreHorizontal } from 'react-icons/fi'
import { BsCassette } from 'react-icons/bs'
import { IoTrendingUpSharp, IoGameControllerOutline } from "react-icons/io5";
const SideBar = (props) => {
    // const { collapsed, } = props
    const navigate = useNavigate()

    const menuItems = {
        'feeds': {
            title: 'feeds',
            components: [
                {
                    icon: <AiOutlineHome />,
                    label: 'Home',
                    link: '/'
                },
                {
                    icon: <IoTrendingUpSharp />,
                    label: 'Popular',
                    link: '/'
                },
            ]
        },
        'topics': {
            title: 'topics',
            components: [
                {
                    icon: <IoGameControllerOutline />,
                    label: 'Gaming',
                    link: '/',
                    child: ['Valheim', 'Genshin Inpact', 'Minecraft', 'Pokimane', 'Halo Infinite', 'Call of Duty: Warzone', 'Path of Exile', 'Hollow Knight: Silksong']
                },
                {
                    icon: <RiBasketballLine />,
                    label: 'Sport',
                    link: '/',
                    child: ['NFL', 'NBA', 'Megan Anderson', 'Atlanta Hawks', 'Los Angeles Lakers', 'Boston Celtics', 'Arsenal F.C.', 'Philadelphia 76ers']
                },
                {
                    icon: <AiOutlineBarChart />,
                    label: 'Business, Economics',
                    link: '/',
                    child: ['GameStop', 'Moderna', 'Pfizer', 'Johnson & Johnson', 'AstraZeneca', 'Walgreens', 'Best Buy', 'Novavax']
                },
                {
                    icon: <RiMoneyDollarCircleFill />,
                    label: 'Crypto',
                    link: '/',
                    child: ['Cardano', 'Dogecoin', 'Algorand', 'Bitcoin', 'Litecoin', 'Basic Attention Token', 'Bitcoin Cash']
                },
                {
                    icon: <BsCassette />,
                    label: 'Television',
                    link: '/',
                    child: ['The Real Housewives of Atlanta', 'The Bachelor', 'Sister Wives', '90 Day Fiance', 'Wife Swap', 'The Amazing Race Australia', 'The Real Housewives of Dallas']
                },
                {
                    icon: <RiStarSmileLine />,
                    label: 'Celebrity',
                    link: '/',
                    child: ['Kim Kardashian', 'Doja Cat', 'Iggy Azalea', 'Anya Taylor-Joy', 'Jamie Lee Curtis', 'Natalie Portman', 'Henry Cavill']
                },
                {
                    icon: <FiMoreHorizontal />,
                    label: 'More Topics',
                    link: '/',
                    child: ['Animals and Pets', 'Anime', 'Art', 'Cars and Motor Vehicles', 'Crafts and DIY', 'Culture, Race, and Ethnicity', 'Ethics and Philosophy']
                }
            ]
        }
    }

    return (
        <ProSidebar
            toggled={true}
        >
            <SidebarContent>
                <MenuSidebar item={menuItems['feeds']} />
                <MenuSidebar item={menuItems['topics']} />


            </SidebarContent>

            <SidebarFooter style={{ textAlign: 'center' }}>
                <div style={{ width: '100%', borderTop: '1px solid #ccc' }}></div>
                <div style={{ textAlign: 'center', color: '#90999b', lineHeight: '1.3', fontStyle: 'oblique', padding: '14px 0' }} >This project coded by Duy Nguyen, git's link put under message.
                    I do this project for leanring and not having any profit target. </div>
                <div
                    className="sidebar-btn-wrapper"
                >

                    <a href="https://github.com/Dua24/RedRed"><FaGithub />Duy Nguyen</a>
                </div>
            </SidebarFooter>
        </ProSidebar >
    )
}

export default SideBar