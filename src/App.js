import './App.scss';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import SideBar from './components/Sidebar/Sidebar';

const App = () => {
  return (
    <div className="App">
      <div className="header">
        <Header />
      </div>
      <div className="content ">
        <div className="sidebar">
          <SideBar />
        </div>
        <div className="main-content" style={{ textAlign: 'left' }}>
          <Outlet />
          aaaaaaaaaaaaaaaaaaaaa
        </div>
      </div>
    </div>
  )
}

export default App;
