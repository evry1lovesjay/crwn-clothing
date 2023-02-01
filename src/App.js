import {Routes, Route, Navigate} from "react-router-dom";

import {useContext} from "react";

import Navigation from "./routes/Navigation/navigation.component";

import Home from "./routes/home/home.component"

import Authentication from './routes/authentication/authentication.component';

import Shop from "./routes/shop/shop.component";

import Checkout from './routes/checkout/checkout.component';

import { UserContext} from "./contexts/user.context";


const App = () => {

  const {currentUser} = useContext(UserContext);

  return (
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<Home />} />
            <Route path="shop/*" element={<Shop />} />
            <Route path="auth" element={ currentUser ? <Navigate to="/" /> : < Authentication />} />
            <Route path="checkout" element={< Checkout />} />
          </Route>
        </Routes>
      );
};

export default App;
