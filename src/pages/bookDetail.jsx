import Header from '../components/Header'
import Footer from '../components/Footer'
import { useSelector,useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchBooks } from '../features/books/bookSlice'
import { useParams } from "react-router-dom"
import { addToCart } from '../features/cart/cart'
import { addToWishlist } from '../features/wishlist/wishlistSlice'

const GameDetail = () =>{

    const ID = useParams()
    const dispatch = useDispatch()
    useEffect(() =>{
        dispatch(fetchBooks())
    },[dispatch])
    const books = useSelector(state => state.books.books)
    const detail = books.find((item) => item._id == ID.id)

    console.log(detail)
    return(
        <>
           <div className="d-flex flex-column min-vh-100">
           <Header/>
           <div className="container py-4">
            <div className='row'>
                <div className='col'>
                    <img src={detail.imageUrl} alt='img'></img>
                </div>
                <div className='col'>
                    <h1>{detail.title}</h1>
                    <p>{detail.description}</p>
                    <p>{detail.language}</p>
                    <p>{detail.genre.join(', ')}</p>
                    <p>First Published On - { new Date(detail.publishedYear).toLocaleDateString()}</p>
                    <p>Rating - {detail.rating}</p>
                    <h3>${detail.price}</h3>
                </div>
            </div>
            <button onClick={() => dispatch(addToWishlist(detail))} className='btn btn-dark me-5'>Add to Wishlist</button>
            <button onClick={() => dispatch(addToCart(detail))} className='btn btn-info ms-5'>Buy Now</button>
           </div>
           
           <Footer/>
           </div>
        </>
    )   
}


export default GameDetail