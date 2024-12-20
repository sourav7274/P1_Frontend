import Header from "../components/Header"
import Footer from "../components/Footer"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { fetchGames } from '../features/games/gameSlice'
import { Link } from "react-router-dom"
import { addToWishlist } from "../features/wishlist/wishlistSlice"
import { useNavigate } from "react-router-dom"
import { addToCart } from "../features/cart/cart"

const Games = () =>{
    const {games,status, error }= useSelector(state => state.games)
    const [filteredGames,setfilterGames] = useState([])
    const [cat,setCat] = useState("All")
    const category = ["Action","Adventure","Role-Playing Game (RPG)","Sports","Racing","Simulation","Strategy","Puzzle",
                    "Shooter","Fighting","Platformer","Open World","Survival","Horror","Card","MMORPG"]
    const dispatch = useDispatch()
    // console.log(games)
    const navigate = useNavigate()
    useEffect(() => {
        if (games.length > 0 )
        {
            setfilterGames(games)
        }
    },[games])

    const handleChange = (e) =>{
        console.log(e.target.value)
        console.log(filteredGames)
        setCat(e.target.value)
        if(e.target.value === "All")
        {
            setfilterGames(games)
        }
        else
        {
            const filtGames = games.filter((game) => game.category.includes(e.target.value))
            setfilterGames(filtGames)
        }
    }
    useEffect(() => {
        dispatch(fetchGames())
    },[dispatch])
    const handleWish = (val) =>{
        dispatch(addToWishlist(val))
    }

    const handleCart = (item) =>{
        dispatch(addToCart(item))
    }

    const handleCLick = (val) =>{
        navigate(`/games/${val}`)
    }


    return(
        <>
        <div className="d-flex flex-column min-vh-100">
        <Header/>
                <div className="container py-2">
                    <h1>Games</h1>
                        {status === "loading" && <>
                            <button className="btn btn-dark" type="button" disabled>
                            <span className="spinner-grow spinner-grow-sm me-4" aria-hidden="true"></span>
                            <span role="status">Loading...</span>
                            </button>
                        </>}
                        {error && console.log(error)}
                        <div className="mb-4">
                        <label>Sort by Category:</label>
                        <select value={cat} onChange={(e) => handleChange(e)} className="form-select">
                            <option value="All">All</option>
                            {category.map((cat) => <option value={cat}>{cat}</option>)}
                        </select>
                        </div>
                    <ul>
                        <div className="row">
                        {filteredGames.length === 0 && <p>No Games of that category, try again later</p> }
                        {filteredGames.map(b => (
                                <>  
                                    <div className="col-4 my-2">
                                        <div className="card" 
                                            style={{border: '1px solid #ddd', borderRadius: '5px', transition: 'transform 0.3s ease-in-out'}} 
                                            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} 
                                            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                            >
                                        <img src={b.coverImageUrl} onClick={() => handleCLick(b._id)} alt="book.png"/>
                                            <div className="card-body">
                                            <Link to="/" className="btn"> <h5 className="card-title">{b.title}</h5></Link>
                                            <p>Meta-Critic Score: {b.metaCriticRating}</p>
                                                <div className="d-flex justify-content-between">
                                                    <button onClick={() => handleCart(b)} className="btn btn-primary">Add to cart</button>
                                                    <button onClick={() => handleWish(b)} className="btn btn-primary">Save to Wishlist</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </> )) }
                        </div>
                </ul> 
                </div>
            <Footer/>
        </div>
        </>
    )
}

export default Games