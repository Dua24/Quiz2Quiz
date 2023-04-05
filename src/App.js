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
const App = () => {
  const data = [
    {
      id: 1,
      num_Evaluate: 76,
      imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
      name: 'r/AskReddit1',
      info: 'u/purple_rasberries1',
      post_time: '7 seconds',
      post_detail: 'What video game have you played the most?',
      type: 'text',
      numComment: 2,
      comments: {
        1: {
          id: 1,
          num_Evaluate: 76,
          imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
          name: 'r/AskReddit1',
          cmt_time: '7 seconds',
          cmt_detail: 'What video game have you played a most?',
          reply: [
            {
              id: 11,
              imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
              name: 'r/AskReddit1',
              reply_time: '7 seconds',
              reply_detail: 'What video game have you played the most?1',
            }, {
              id: 12,
              imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
              name: 'r/AskReddit1',
              reply_time: '7 seconds',
              reply_detail: 'What video game have you played the most?2',
            }, {
              id: 13,
              imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
              name: 'r/AskReddit1',
              reply_time: '7 seconds',
              reply_detail: 'What video game have you played the most?3',
            }, {
              id: 14,
              imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
              name: 'r/AskReddit1',
              reply_time: '7 seconds',
              reply_detail: 'What video game have you played the most?4',
            }, {
              id: 15,
              imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
              name: 'r/AskReddit1',
              reply_time: '7 seconds',
              reply_detail: 'What video game have you played the most?5',
            }]

        },
        2: {
          id: 2,
          num_Evaluate: 76,
          imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
          name: 'r/AskReddit1',
          cmt_time: '7 seconds',
          cmt_detail: 'What video game have you played the most?',
          reply: [
            {
              id: 21,
              imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
              name: 'r/AskReddit1',
              reply_time: '7 seconds',
              reply_detail: 'What video game have you played the most?1',
            },
            {
              id: 22,
              imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
              name: 'r/AskReddit1',
              reply_time: '7 seconds',
              reply_detail: 'What video game have you played the most?1',
            }, {
              id: 23,
              imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
              name: 'r/AskReddit1',
              reply_time: '7 seconds',
              reply_detail: 'What video game have you played the most?1',
            },]
        }
      }
    },
    {
      id: 2,
      num_Evaluate: 22,
      imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
      name: 'r/AskReddit2',
      info: 'u/purple_rasberries2',
      post_time: '12 hours',
      post_detail: 'Countries with the most firearms in Civil hands',
      img_detail: 'https://preview.redd.it/zye4bxyokapa1.jpg?width=640&crop=smart&auto=webp&v=enabled&s=d322e29fe507cd52537e3ee5ced13b5d0514ae70',
      numComment: 112,
      type: 'img'

    },
    {
      id: 3,
      num_Evaluate: 17,
      imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
      name: 'r/AskReddit3',
      info: 'u/purple_rasberries3',
      post_time: '3 days',
      post_detail: 'Choi game khog???',
      vid_detail: video,
      numComment: 72,
      type: 'vid'

    },
    {
      id: 4,
      num_Evaluate: 78,
      imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
      name: 'r/AskReddit4',
      info: 'u/purple_rasberries4',
      post_time: '23 minutes',
      post_detail: 'I wanted to get my noodle wet',
      img_detail: 'https://external-preview.redd.it/mv8HWsjJivXRwnw0zn7yNPvis5GhRjUo6HlF08naVu4.jpg?width=640&crop=smart&auto=webp&v=enabled&s=9aa5a572afaa64ea53fd030b76969e8fa7d03a89',
      numComment: 26,
      type: 'img'
    },
    {
      id: 5,
      num_Evaluate: 46,
      imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
      name: 'r/AskReddit5',
      info: 'u/purple_rasberries5',
      post_time: '2 hours',
      post_detail: 'What video game have you played the most?',
      img_detail: 'https://i.redd.it/noinecoyi7pa1.png',
      numComment: 834,
      type: 'img'

    },
    {
      id: 6,
      num_Evaluate: 19,
      imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
      name: 'r/AskReddit5',
      info: 'u/purple_rasberries5',
      post_time: '9 minutes',
      post_detail: '"I wanted to get my noodle wet"',
      img_detail: 'https://preview.redd.it/hzfsxw2awcpa1.jpg?width=640&crop=smart&auto=webp&v=enabled&s=1cef44ea5c4857aab112a6f9c20242e2893ca737',
      numComment: 126,
      type: 'img'
    },
  ]
  const [posts, setPosts] = useImmer(data)
  const [showMessageBox, setShowMessageBox] = useState(false)
  const [isAuthUser, setIsAuthUser] = useState(false)

  console.log("posts", posts)

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
  return (
    <AuthContext.Provider value={{ isAuthUser, posts, setPosts }}>
      <div className="App">
        <div className="header">
          <Header showMessageBox={showMessageBox}
            setShowMessageBox={setShowMessageBox}
            setIsAuthUser={setIsAuthUser}
          />
        </div>
        <div className="content ">
          <div className="sidebar">
            <SideBar />
          </div>
          <div className="main-content" style={{ textAlign: 'left' }}>
            <Outlet params={{ isAuthUser }} />
            <ScrollButton />
            {<Message showMessageBox={showMessageBox} setShowMessageBox={setShowMessageBox} />}

          </div>
        </div>
      </div>
    </AuthContext.Provider>

  )
}

export default App;
