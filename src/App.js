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
const App = () => {
  const data = [
    {
      id: 1,
      num_Evaluate: 76,
      post_time: '7 seconds',
      post_detail: 'What video game have you played the most?s',
      type: 'text',
      owner: {
        id: 1,
        name: "User1",
        img: "https://styles.redditmedia.com/t5_37tpy/styles/communityIcon_zfurwgcu3mf51.jpeg?format=pjpg&s=d95700d0b5e8110bcd717f01f87014cd7b6cd5f7"
      },
      numComment: 2,
      comments: {
        1: {
          id: 1,
          num_Evaluate: 76,
          owner: {
            id: 3,
            name: "User3",
            img: "https://a.thumbs.redditmedia.com/kIpBoUR8zJLMQlF8azhN-kSBsjVUidHjvZNLuHDONm8.png"
          },
          cmt_time: '7 seconds',
          cmt_detail: 'What video game have you played a most?',
          reply: [
            {
              id: 11,
              owner: {
                id: 1,
                name: "User1",
                img: "https://styles.redditmedia.com/t5_37tpy/styles/communityIcon_zfurwgcu3mf51.jpeg?format=pjpg&s=d95700d0b5e8110bcd717f01f87014cd7b6cd5f7"
              },
              reply_time: '7 seconds',
              reply_detail: 'What video game have you played the most?1',
            }, {
              id: 12,
              owner: {
                id: 3,
                name: "User3",
                img: "https://a.thumbs.redditmedia.com/kIpBoUR8zJLMQlF8azhN-kSBsjVUidHjvZNLuHDONm8.png"
              },
              reply_time: '7 seconds',
              reply_detail: 'What video game have you played the most?2',
            }, {
              id: 13,
              owner: {
                id: 4,
                name: "User4",
                img: "https://styles.redditmedia.com/t5_2qs0q/styles/communityIcon_kxcmzy9bt1381.jpg?format=pjpg&s=16025192cd7824a5f93aaa0ed9eb4f149761e18e"
              },
              reply_time: '7 seconds',
              reply_detail: 'What video game have you played the most?3',
            }, {
              id: 14,
              owner: {
                id: 3,
                name: "User3",
                img: "https://a.thumbs.redditmedia.com/kIpBoUR8zJLMQlF8azhN-kSBsjVUidHjvZNLuHDONm8.png"
              },
              reply_time: '7 seconds',
              reply_detail: 'What video game have you played the most?4',
            }, {
              id: 15,
              owner: {
                id: 2,
                name: "User2",
                img: "https://b.thumbs.redditmedia.com/voAwqXNBDO4JwIODmO4HXXkUJbnVo_mL_bENHeagDNo.png"
              },
              reply_time: '7 seconds',
              reply_detail: 'What video game have you played the most?5',
            }]

        },
        2: {
          id: 2,
          num_Evaluate: 76,
          owner: {
            id: 5,
            name: "User5",
            img: "https://b.thumbs.redditmedia.com/I4lV7klrQvDF9lfeY7uyjwyHNhs9BIsydDy4O7W1_Tg.png"
          },
          cmt_time: '7 seconds',
          cmt_detail: 'What video game have you played the most?',
          reply: [
            {
              id: 21,
              owner: {
                id: 4,
                name: "User4",
                img: "https://styles.redditmedia.com/t5_2qs0q/styles/communityIcon_kxcmzy9bt1381.jpg?format=pjpg&s=16025192cd7824a5f93aaa0ed9eb4f149761e18e"
              },
              reply_time: '7 seconds',
              reply_detail: 'What video game have you played the most?1',
            },
            {
              id: 22,
              owner: {
                id: 3,
                name: "User3",
                img: "https://a.thumbs.redditmedia.com/kIpBoUR8zJLMQlF8azhN-kSBsjVUidHjvZNLuHDONm8.png"
              },
              reply_time: '7 seconds',
              reply_detail: 'What video game have you played the most?1',
            }, {
              id: 23,
              owner: {
                id: 2,
                name: "User2",
                img: "https://b.thumbs.redditmedia.com/voAwqXNBDO4JwIODmO4HXXkUJbnVo_mL_bENHeagDNo.png"
              },
              reply_time: '7 seconds',
              reply_detail: 'What video game have you played the most?1',
            },]
        }
      }
    },
    {
      id: 2,
      num_Evaluate: 22,
      post_time: '12 hours',
      post_detail: 'Countries with the most firearms in Civil hands',
      img_detail: 'https://preview.redd.it/zye4bxyokapa1.jpg?width=640&crop=smart&auto=webp&v=enabled&s=d322e29fe507cd52537e3ee5ced13b5d0514ae70',
      numComment: 112,
      owner: {
        id: 2,
        name: "User2",
        img: "https://b.thumbs.redditmedia.com/voAwqXNBDO4JwIODmO4HXXkUJbnVo_mL_bENHeagDNo.png"
      },
      type: 'img'

    },
    {
      id: 3,
      num_Evaluate: 17,
      post_time: '3 days',
      post_detail: 'Choi game khog???',
      vid_detail: video,
      numComment: 72,
      owner: {
        id: 3,
        name: "User3",
        img: "https://a.thumbs.redditmedia.com/kIpBoUR8zJLMQlF8azhN-kSBsjVUidHjvZNLuHDONm8.png"
      },
      type: 'vid'

    },
    {
      id: 4,
      num_Evaluate: 78,
      post_time: '23 minutes',
      post_detail: 'I wanted to get my noodle wet',
      img_detail: 'https://external-preview.redd.it/mv8HWsjJivXRwnw0zn7yNPvis5GhRjUo6HlF08naVu4.jpg?width=640&crop=smart&auto=webp&v=enabled&s=9aa5a572afaa64ea53fd030b76969e8fa7d03a89',
      numComment: 26,
      owner: {
        id: 4,
        name: "User4",
        img: "https://styles.redditmedia.com/t5_2qs0q/styles/communityIcon_kxcmzy9bt1381.jpg?format=pjpg&s=16025192cd7824a5f93aaa0ed9eb4f149761e18e"
      },

      type: 'img'
    },
    {
      id: 5,
      num_Evaluate: 46,
      post_time: '2 hours',
      post_detail: 'What video game have you played the most?',
      img_detail: 'https://i.redd.it/noinecoyi7pa1.png',
      numComment: 834,
      owner: {
        id: 5,
        name: "User5",
        img: "https://b.thumbs.redditmedia.com/I4lV7klrQvDF9lfeY7uyjwyHNhs9BIsydDy4O7W1_Tg.png"
      },
      type: 'img'

    },
    {
      id: 6,
      num_Evaluate: 19,
      post_time: '9 minutes',
      post_detail: '"I wanted to get my noodle wet"',
      img_detail: 'https://preview.redd.it/hzfsxw2awcpa1.jpg?width=640&crop=smart&auto=webp&v=enabled&s=1cef44ea5c4857aab112a6f9c20242e2893ca737',
      numComment: 126,
      owner: {
        id: 6,
        name: "User5",
        img: "https://styles.redditmedia.com/t5_2qh0f/styles/communityIcon_0wn0ynky4gc51.png"
      },
      type: 'img'
    },
  ]
  const user = {
    id: 109,
    name_user: "ndnguyen",
    img_user: "https://b.thumbs.redditmedia.com/4ADRnu2cwKIkpQt0N-g36-iq6EfTNFVV1RComMcEZiU.png",
  }


  const [isAuthUser, setIsAuthUser] = useState(false)
  const [posts, setPosts] = useImmer()
  const [showMessageBox, setShowMessageBox] = useState(false)
  const [showModalSignInUp, setShowModalSignInUp] = useState(false)

  useEffect(() => {
    fetchListPosts()
  }, [])

  const fetchListPosts = async () => {
    const res = await getAllPosts()
    console.log(res)
    if (res && res.EC === 0) {

      res.DT.forEach((e) => {
        e['post_time'] = handleDurationPostPosted(e.createdAt)
      })
      setPosts(res.DT)
    }
  }


  const handleDurationPostPosted = (timeCreateAt) => {
    const start = moment(timeCreateAt);
    const now = moment();
    console.log("db", timeCreateAt)
    console.log("now", now)
    const duration = moment.duration(now.diff(start));

    let durationText;
    if (duration.asSeconds() < 60) {
      durationText = `${Math.ceil(duration.asSeconds())} seconds`;
    } else if (duration.asMinutes() < 60) {
      durationText = `${duration.minutes()} minutes`;
    } else {
      durationText = `${duration.hours()} hours, ${duration.minutes()} minutes`;
    }
    return durationText
  }

  console.log("posts>>> ", posts)

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);





  return (
    <AuthContext.Provider value={{
      isAuthUser, setIsAuthUser,
      posts, setPosts,
      showModalSignInUp, setShowModalSignInUp,
      user,
      data
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
            <Outlet params={{ isAuthUser }} />
            <ScrollButton />
            {isAuthUser && <Message showMessageBox={showMessageBox} setShowMessageBox={setShowMessageBox} />}

          </div>
        </div>
      </div>
      <ModalSignInUp show={showModalSignInUp} setShow={setShowModalSignInUp} setIsAuthUser={setIsAuthUser} />
    </AuthContext.Provider>

  )
}

export default App;
