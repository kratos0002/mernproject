import React, { Fragment, useEffect } from 'react'
import Carousel from 'react-material-ui-carousel'
import Product from '../Home/Product'
import "./ProductDetails.css"
import {useSelector, useDispatch } from "react-redux"
import { getProductDetails } from '../../actions/productActions'
import { useParams } from 'react-router-dom'


const ProductDetails = () => {

    const dispatch = useDispatch()
    const {id} = useParams()

    const {product, loading, error} = useSelector(state=>state.productDetails)

    useEffect(()=>{
        dispatch(getProductDetails(id))
    },[dispatch])


  return (
    <Fragment>
        <div className='ProductDetails'>

            <div>
                <Carousel>
                    {product.images &&
                    product.images.map((item,i)=>(
                        <img className='CarouselImage'
                        key={item.url}
                        src={item.url}
                        alt={`${i} Slide`} />
                    ))}
                </Carousel>
            </div>

            <div>
                <div className='detailsBlock-1'>
                    <h2>{product.name}</h2>
                    <p>Product # {product._id}</p>
                    
                    </div>
            </div>



            
            </div>


    </Fragment>
  )
}

export default ProductDetails