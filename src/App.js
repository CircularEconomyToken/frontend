import logo from './logo.svg';
import './App.css';
import Footer from './components/Footer';
import Home from './pages/index';
import Menu from './pages/menu';
import InfoSection from './components/InfoSection';
import { homeObjFour, homeObjOne, homeObjThree, homeObjTwo } from './components/InfoSection/Data';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ConnectPage from './pages/connect';

function App() {
  return (
    <div className="App">
    <Router>
      <Menu/>
      <Routes>
        <Route path = "/" element = {<Home/>} exact/>
        <Route path = "/connectWallet" element = {<ConnectPage/>} exact/>
        <Route path = "/about" element = {<InfoSection  { ...homeObjOne }/>} exact/>
        <Route path = "/discover" element = {<InfoSection  { ...homeObjTwo }/>} exact/>
        <Route path = "/services" element = {<InfoSection  { ...homeObjThree }/>} exact/>
        <Route path = "/signup" element = {<InfoSection  { ...homeObjFour }/>} exact/>
      </Routes>
      <Footer/>
    </Router>
    </div>
  );
}

export default App;
