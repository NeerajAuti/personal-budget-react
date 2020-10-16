import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Footer from './Footer/Footer';
import Hero from './Hero/Hero';
import HomePage from './HomePage/HomePage';
import AboutPage from './AboutPage/AboutPage';
import LoginPage from './LoginPage/LoginPage';
import Menu from './Menu/Menu'

function App() {
  return (
    <Router>
     <Menu></Menu>
     <Hero></Hero>
     <div className="mainContainer">
       <Switch>
       <Route path="/about">
           <AboutPage></AboutPage>
         </Route>
         <Route path="/login">
           <LoginPage></LoginPage>
         </Route>
         <Route path="/">
           <HomePage></HomePage>
         </Route>
       </Switch>
     </div>
     <Footer></Footer>
    </Router>
  );
}

export default App;
