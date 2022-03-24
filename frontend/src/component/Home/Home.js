import React, { Fragment } from 'react'
import "./Home.css"
import Product from "./Product.js"
import Metadata from '../layout/MetaData'


const product = {
    name: "Blue tee",
    images:[{url:"https://i.ibb.co/DRST11n/1.webp"}],
    price:"3000",
    _id:"vishal"
}

const Home = () => {
  return <Fragment>

      <Metadata title="NILEOS" />

      <div className='banner'>
          <p>Welcome to Nileos</p>
          <h1>Find Amazing products at good prices</h1>

          <a href="#container">
              <button>
                  Scroll 
              </button>
              
              
            </a>
          </div>
          <h2 className='homeHeading'>Featured Products</h2>

          <div className='container' id ="container">
              <Product product ={product} />
              <Product product ={product} />
              <Product product ={product} />
              <Product product ={product} />
              <Product product ={product} />
              <Product product ={product} />
              <Product product ={product} />
              <Product product ={product} />
          </div>

  </Fragment>
}

export default Home