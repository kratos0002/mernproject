import React, { Fragment, useEffect } from 'react'
import "./Home.css"
import Product from "./Product.js"
import Metadata from '../layout/MetaData'
import {getProduct} from "../../actions/productActions"
import {useSelector, useDispatch} from 'react-redux'
import Loader from '../layout/Loader/Loader'
import { useAlert } from 'react-alert'

const Home = () => {

const alert = useAlert()
const dispatch = useDispatch()
const {loading, error, products, productsCount} = useSelector(state=>state.products)


useEffect(()=>{

if(error){
    return alert.error(error)

}
    dispatch(getProduct())
},[dispatch,error], alert)




  return (

  <Fragment>

      {loading ? <Loader />:
          <Fragment>

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
                {products && products.map(product=>(
                    <Product product = {product} />
                ))}
    
              </div>
    
      </Fragment>}




  </Fragment>
  
  )
}

export default Home