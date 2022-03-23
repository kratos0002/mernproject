import React from 'react'
import playStore from "../../../images/playstore.png"
import appStore from "../../../images/Appstore.png"
import "./Footer.css"


const Footer = () => {
  return (
      <footer id="footer">

        <div className="leftFooter">
              <h4>Download our App</h4>
              <p>Download App for Android and iOS mobile phone</p>
              <img src = {playStore} alt="playstore" />
              <img src = {appStore} alt="appstore" />
            </div>
        <div className="midFooter">
            <h1>Nileos</h1>
            <p>Get the best shizz in town</p>
            <p>Copyright 2022 &copy;kratos0002</p> 
        </div>

        <div className="rightFooter">
            <h4>Follow us</h4>
            <a href='http://twitter.com' target="_blank" rel="noreferrer">Twitter</a>
        </div>
    </footer>
    
  )
}

export default Footer