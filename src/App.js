import './App.scss';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import SideBar from './components/Sidebar/Sidebar';
import ScrollButton from './components/Button/Back2Top';
import Message from './components/Header/Message/Message';
import { useState } from 'react';

const App = () => {
  const [showMessageBox, setShowMessageBox] = useState(false)
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
  return (
    <div className="App">
      <div className="header">
        <Header showMessageBox={showMessageBox} setShowMessageBox={setShowMessageBox} />
      </div>
      <div className="content ">
        <div className="sidebar">
          <SideBar />
        </div>
        <div className="main-content" style={{ textAlign: 'left' }}>
          <Outlet />
          <ScrollButton />
          {<Message showMessageBox={showMessageBox} setShowMessageBox={setShowMessageBox} />}

        </div>
      </div>
    </div>
  )
}

export default App;
