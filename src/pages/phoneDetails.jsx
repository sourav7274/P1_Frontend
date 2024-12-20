import { useParams } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useSelector, useDispatch } from "react-redux"
import { addToCart } from '../features/cart/cart'
import { addToWishlist } from '../features/wishlist/wishlistSlice'
import { fetchPhones } from "../features/phones/phoneSlice"
import { useEffect } from "react"


const JacketDetail = () =>{
    const ID = useParams()

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchPhones())
    },[])
    const phones = useSelector((state) => state.phone.phones)
    const detail = phones.find((item) => item._id == ID.id)
    console.log(detail)

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
                                <p>Brand: {detail.brand}</p>
                                <p>Model: {detail.model}</p>
                                <p>OS: {detail.os}</p>
                                <p>Weight:   {detail.weight}</p>
                                <p>Rating: {detail.ratings}</p>
                                <p>Camera: {detail.camera}</p>
                                <p>Display Size: {detail.displaySize}</p>
                                <p>Ram: {detail.ram} GB</p>
                                <p>Price: $ {detail.price}</p>
                                <p>Colors: {detail.color.join(', ')}</p>
                                <p>Released On: {new Date(detail.releaseDate).toLocaleDateString()}</p>
                               
                            </div>
                        </div>
                        <button onClick={() => dispatch(addToWishlist(detail))} className='btn btn-dark me-5'>Add to Wishlist</button>
                        <button onClick={() => dispatch(addToCart(detail))} className='btn btn-info ms-5'>Buy Now</button>
                       </div>
                       {/* <p>{detail.stock > 5 ? "" : "Only a few Left! Hurry Up"}</p> */}
            <Footer/>
        </>
    )   
}


export default JacketDetail