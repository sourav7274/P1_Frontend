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
    console.log(games)
    const navigate = useNavigate()
    useEffect(() => {
        if (games.length > 0 )
        {
            setfilterGames(games)
        }
    },[games])

    const handleChange = (e) =>{
        console.log(e)
        console.log(filteredGames)
        setCat(e)
        if(e === "All")
        {
            setfilterGames(games)
        }
        else
        {
            const filtGames = games.filter((game) => game.category.includes(e))
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

    const handlePrice = (val) => {
        if (val === " ") { 
            setfilterGames(filteredGames);
        } 
        if (val === "asc") {
            setfilterGames([...filteredGames].sort((a, b) => a.price - b.price));
        } if(val == "dsc") { 
            setfilterGames([...filteredGames].sort((a, b) => b.price - a.price));
        }
    };
    

    return(
        <>
        <div className="d-flex flex-column min-vh-100">
      
          <Header />
      
          <div className="d-flex">
       
            <div className="bg-light border" style={{ width: '250px', minHeight: '100vh' }}>
              <h5 className="p-3">Sidebar</h5>
              <ul className="list-unstyled p-3">
                <li> <div className="mb-4">
                  <label htmlFor="category" className="form-label">Sort by Category:</label>
                  <select
                    id="category"
                    value={cat}
                    onChange={(e) => handleChange(e.target.value)}
                    className="form-select"
                  >
                    <option value="All">All</option>
                    {category.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div></li>
                <li>
                    <div>
                        <label className="form-label">Sort By Price: </label><br/>
                        <input onClick={(e) => handlePrice(e.target.value)} className="me-2 mt-3" type="radio" name="priceS" value=" " />Default<br/>
                        <input onClick={(e) => handlePrice(e.target.value)} className="me-2 mt-3" type="radio" name="priceS" value="asc" />Ascending<br/>
                        <input onClick={(e) => handlePrice(e.target.value)} className="me-2 mt-3" type="radio" name="priceS" value="dsc" />Descending
                    </div>
                </li>
              </ul>
            </div>
      
          
            <div className="p-4" style={{ flex: 1 }}>
              <div className="container">
                <h1 className="mb-4">Games</h1>
      
            
                {status === "loading" && (
                  <button className="btn btn-dark" type="button" disabled>
                    <span className="spinner-grow spinner-grow-sm me-2" aria-hidden="true"></span>
                    <span role="status">Loading...</span>
                  </button>
                )}
      
                
                {error && <p className="text-danger">An error occurred. Please try again later.</p>}      
          
                <div className="row g-4">
                  {filteredGames.length === 0 && (
                  status === "loading" ? <p className="text-muted">Games are loading, please wait</p>  : 
                  <p className="text-muted">No games of that category at the moment, try again later.</p>
                )}
      
                  {filteredGames.map((b) => (
                    <div key={b._id} className="col-md-4">
                      <div
                        className="card h-100"
                        style={{
                          border: '1px solid #ddd',
                          borderRadius: '5px',
                          transition: 'transform 0.3s ease-in-out',
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      >
                       <div
                          style={{
                            height: "250px",
                            overflow: "hidden",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <img
                            src={b.imageUrl}
                            onClick={() => handleCLick(b._id)}
                            alt={b.title}
                            style={{
                              maxHeight: "100%",
                              maxWidth: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>

                        <div className="card-body">
                          <Link to="/" className="btn text-decoration-none">
                            <h5 className="card-title">{b.name}</h5>
                          </Link>
                          <p className="mb-2">Meta-Critic Score: {b.metaCriticRating}</p>
                          <p className="mb-2">{b.price == 0 ? "Free to Play" : "$ " + b.price }</p>
                          <div className="d-flex justify-content-between">
                            <button onClick={() => handleCart(b)} className="btn btn-primary">
                              Add to Cart
                            </button>
                            <button onClick={() => handleWish(b)} className="btn btn-outline-primary">
                              Save to Wishlist
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
      
          <Footer />
        </div>
      </>
      
    )
}

export default Games