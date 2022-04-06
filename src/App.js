import logo from './logo.svg';
import './App.css';
import Home from './pages/index';
import Menu from './pages/menu';
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
      </Routes>
    </Router>
    </div>
  );
}

export default App;
