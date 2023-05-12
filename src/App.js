import './App.scss';
import React, { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import Header from './components/Header/Header';
import SideBar from './components/Sidebar/Sidebar';
import ScrollButton from './components/Button/Back2Top';
import Message from './components/Header/Message/Message';
import { useState, useContext, createContext } from 'react';
import { AuthContext } from './components/Context/Context';
import { useImmer } from 'use-immer';
import video from "./assets/video/video.mp4"
import ModalSignInUp from './components/Header/Modals/ModalSignInUp';
import "./globalSass.scss"
import { getAllPosts } from './services/apiServices';
import moment from 'moment';
import { useSelector } from 'react-redux';
import _ from 'lodash'
const App = () => {
  const data = []
  const user = {}

  const { isAuthenticated, account } = useSelector(state => state.user)
  const [posts, setPosts] = useImmer()
  const [showMessageBox, setShowMessageBox] = useState(false)
  const [showModalSignInUp, setShowModalSignInUp] = useState(false)

  useEffect(() => {
    fetchListPosts()
  }, [])

  const fetchListPosts = async () => {
    const res = await getAllPosts()
    if (res && res.EC === 0) {
      res.DT.forEach((e) => {
        e['post_time'] = handleDurationPostPosted(e.createdAt)
      })
      setPosts(_.sortBy(res.DT, ['post_time']))
    } else {
      setPosts([])
    }
  }

  const handleDurationPostPosted = (timeCreateAt) => {
    const start = moment(timeCreateAt);
    const now = moment();
    const duration = moment.duration(now.diff(start));

    let durationText;
    if (duration.asSeconds() < 60) {
      durationText = `${Math.ceil(duration.asSeconds())} seconds`;
    } else if (duration.asMinutes() < 60) {
      durationText = `${duration.minutes()} minutes`;
    } else {
      durationText = `${duration.hours()} hours`;
    }
    return durationText
  }


  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);




  return (
    <AuthContext.Provider value={{
      posts, setPosts,
      showModalSignInUp, setShowModalSignInUp,
      account,
      data,
      fetchListPosts
    }}>
      <div className="App">
        <div className="header">
          <Header
            setShowMessageBox={setShowMessageBox}
          />
        </div>
        <div className="content ">
          <div className="sidebar">
            <SideBar />
          </div>
          <div className="main-content" style={{ textAlign: 'left' }}>
            <Outlet />
            <ScrollButton />
            {isAuthenticated && <Message showMessageBox={showMessageBox} setShowMessageBox={setShowMessageBox} />}

          </div>
        </div>
      </div>
      <ModalSignInUp show={showModalSignInUp} setShow={setShowModalSignInUp} />
    </AuthContext.Provider>

  )
}

export default App;
