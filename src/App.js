import logo from './logo.svg';
import './App.css';
import Footer from './components/Footer';
import Home from './pages/index';
import Menu from './pages/menu';
import InfoSection from './components/InfoSection';
import { homeObjFour, homeObjOne, homeObjThree, homeObjTwo } from './components/InfoSection/Data';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ConnectPage from './pages/connect';
import HistoryCard from './components/History';
import MakeOrder from './components/History/MakeOrder';
import BrowseOrders from './components/BrowseOrders';
import MakeOffer from './components/BrowseOrders/MakeOffer';
import UpdateOrder from './components/History/UpdateOrder';
import OfferHistoryCard from './components/OfferHistory';
import ViewOffers from './components/History/ViewOffers';
import InfoPage from './components/ExtraInfoPages/InfoPage';
import Shipment from './components/Shipment';

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
        <Route path = "/history" element = {<HistoryCard/>} exact/>
        <Route path = "/makeOrder" element = {<MakeOrder/>} exact/>
        <Route path = "/browseOrders" element = {<BrowseOrders/>} exact/>
        <Route path = "/makeOffer" element = {<MakeOffer/>} exact/>
        <Route path = "/makeOffer/:address/:id" element = {<MakeOffer/>}/>
        <Route path = "/updateOrder" element = {<UpdateOrder/>} exact/>
        <Route path = "/updateOrder/:id" element = {<UpdateOrder/>}/>
        <Route path = "/offerHistory" element = {<OfferHistoryCard/>} exact/>
        <Route path = "/viewOffers/:id" element = {<ViewOffers/>}/>
        <Route path = "/info" element = {<InfoPage/>} exact/>
        <Route path = "/shipment/:orderOwnerAddress/:orderId/:offerId" element = {<Shipment/>} exact/>
      </Routes>
      <Footer/>
    </Router>
    </div>
  );
}

export default App;
