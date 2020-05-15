import {BrowserRouter, Switch, Route} from "react-router-dom";
import React from 'react';
import './style/App.css';
import LandingPage from "./pages/landingPage/LandingPage";
import WalletPage from "./pages/walletPage/WalletPage";
import LoginPage from "./pages/loginPage/LoginPage";

function App() {
  return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route exact path="/wallet" component={WalletPage}/>
            <Route exact path="/wallet/login" component={LoginPage}/>
          <Route><h1>ERROR 404</h1></Route>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
