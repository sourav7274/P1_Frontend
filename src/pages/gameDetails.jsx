import Header from '../components/Header'
import Footer from '../components/Footer'
import { useSelector,useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchGames } from "../features/games/gameSlice"
import { useParams } from "react-router-dom"
import { addToCart } from '../features/cart/cart'
import { addToWishlist } from '../features/wishlist/wishlistSlice'

const GameDetail = () =>{

    const ID = useParams()
    const dispatch = useDispatch()
    useEffect(() =>{
        dispatch(fetchGames())
    },[dispatch])
    const games = useSelector(state => state.games.games)
    const detail = games.find((item) => item._id == ID.id)

    // console.log(detail)
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
                    {/* <p>{detail.description}</p> */}
                    <p>{detail.multiplayer ==  false ?"Single Player Campaign" : "Co op/PVP" }</p>
                    <div className='row'>
                        <div className='col'>
                            <p>Meta Critic Rating - {detail.metaCriticRating}</p>
                        </div>
                        <div className='col'>
                            <p>User Rating - {detail.userRating}</p>
                        </div> 
                    </div>
                    <p>Completion Time - Approx {detail.completionTime
                    } hrs</p>
                    <p>Publisher - {detail.publisher}</p>
                    <p>Release Date - {detail.releaseDate
                    }</p>
                    <p>Publisher - {detail.publisher}</p>
                    <p>Studio - {detail.studio}</p>
                    <p>Platform - {detail.platform}</p>
                    <p>PG Rating - {detail.pgRating}</p>
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