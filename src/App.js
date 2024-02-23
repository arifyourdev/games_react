import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./pages/home/Home";
import Inplay from "./pages/inplay/Inplay";
import Sport from "./pages/sport/Sport";
import MultiMarket from "./pages/multi-market/MultiMarket";
import Login from "./pages/registration/Login";
import Registeration from "./pages/registration/Registeration";
import Account from "./pages/account/Account";
import MyProfile from "./pages/account/MyProfile";
import MatchDetails from "./pages/inplay/MatchDetails";
import Test from "./pages/Test";
   
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home/>} />
        <Route path="/inplay" element={<Inplay/>} />
        <Route path="/sports" element={<Sport/>} />
        <Route path="/multi-markets" element={<MultiMarket/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Registeration/>} />
        <Route path="/account" element={<Account/>} />
        <Route path="/account/myprofile" element={<MyProfile/>} />
        <Route path="/match-details/:sportId/:eventId" element={<MatchDetails/>} />
        <Route path="/test" element={<Test/>} />
       </Routes>
    </BrowserRouter>
  );
}

export default App;
