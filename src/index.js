import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, HashRouter } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.10.0";

// pages for this product
import Main from "views/Main/Main.js";
import MyItems from "views/MyItems/MyItems.js";

import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import Details from "views/Details/Details.js";
import Create from "views/Create/Create.js";

var hist = createBrowserHistory();

ReactDOM.render(
    <HashRouter history={hist}>
        <Switch>
          <Route exact strict path="/landing-page" component={LandingPage} />
          <Route exact strict path="/profile-page" component={ProfilePage} />
          <Route exact strict path="/login-page" component={LoginPage} />
          <Route exact strict path="/main" component={Components} />

          <Route exact strict path="/" component={Main} />
          <Route exact strict path="/my-items" component={MyItems} />
          <Route exact strict path="/details" component={Details} />
          <Route exact strict path="/create" component={Create} />
        </Switch>
    </HashRouter>
  ,
  document.getElementById("root")
);
