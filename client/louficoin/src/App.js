import React from 'react';
import './style/App.css';
import LandingPage from "./pages/landingPage/LandingPage";
import {BrowserRouter, Switch, Route} from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route><h1>ERROR 404</h1></Route>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
