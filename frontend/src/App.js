import WebFont from "webfontloader"
import './App.css';
import Header from "./component/layout/Header/Header"
import Footer from "./component/layout/Footer/Footer.js"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import {React, useEffect} from "react";
import Home from "./component/Home/Home.js"
import Loader from "./component/layout/Loader/Loader";






function App() {

  
  useEffect(()=>{

    WebFont.load({
      google:{
        families:['Roboto']
      }
  
    })
  
  },[])


  return (
    <Router>
      <Header/>
      <Routes>
      <Route path="/" element ={<Home />} />
      </Routes>
      <Footer />

    </Router>


  );
}

export default App;
