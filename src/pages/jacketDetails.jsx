import { useParams } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useSelector, useDispatch } from "react-redux"
import { addToCart } from '../features/cart/cart'
import { addToWishlist } from '../features/wishlist/wishlistSlice'
import { fetchJackets } from "../features/jackets/jacketSLice"
import { useEffect } from "react"

const JacketDetail = () =>{
    const ID = useParams()

    const dispatch = useDispatch()
    useEffect(() =>{
        dispatch(fetchJackets())
    },[])
    const jackets = useSelector((state) => state.jackets.jackets)
    const detail = jackets.find((item) => item._id == ID.id)
    // console.log(detail)

    return(
        <>
            <Header/>
            <div className="container py-4">
                        <div className='row'>
                            <div className='col'>
                                <img src={detail.imageUrl} alt='img'></img>
                            </div>
                            <div className='col'>
                                <h1>{detail.name}</h1>
                                <p>{detail.description}</p>
                                <p>Material:   {detail.material}</p>
                                <p>Rating: {detail.ratings}</p>
                                <p>Brand: {detail.brand}</p>
                                <p>Insulation Type: {detail.insulationType}</p>
                                <p>Category: {detail.category}</p>
                                <p>Price: $ {detail.price}</p>
                                <p>Colors: {detail.color.join(', ')}</p>
                                <p>Water Resistance: {detail.waterResistance ? "Yes":"NO"}</p>
                                <p>{detail.stock > 5 ? "" : "Only a few Left! Hurry Up"}</p>
                            </div>
                        </div>
                        <button onClick={() => dispatch(addToWishlist(detail))} className='btn btn-dark me-5'>Add to Wishlist</button>
                        <button onClick={() => dispatch(addToCart(detail))} className='btn btn-info ms-5'>Buy Now</button>
                       </div>
            <Footer/>
        </>
    )   
}


export default JacketDetail