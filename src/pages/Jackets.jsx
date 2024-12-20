import Header from "../components/Header"
import Footer from "../components/Footer"
import { fetchJackets } from "../features/jackets/jacketSLice"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { addToWishlist } from "../features/wishlist/wishlistSlice"
import { addToCart } from "../features/cart/cart"
import { useNavigate } from "react-router-dom"


const Jackets = () => {
    const dispatch = useDispatch();
    const [sort, setSort] = useState(" ");
    const [filterJack, setFilter] = useState([]);
    const { jackets, status, error } = useSelector(state => state.jackets);
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchJackets());
    }, [dispatch]);

    useEffect(() => {
        if (jackets.length > 0) {
            setFilter(jackets);
        }
    }, [jackets]);

    const handleChange = (val) => {
        setSort(val);
        if (val === " ") {
            setFilter(jackets);
    
        } else if (val === "asc") {
            setFilter([...jackets].sort((a, b) => a.price - b.price));
        } else {
            setFilter([...jackets].sort((a, b) => b.price - a.price));
        }
    };

    const handleWish = (wish) => {
        dispatch(addToWishlist(wish));
    };

      const handleCart = (item) =>{
            dispatch(addToCart(item))
        }

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <div className="container flex-grow-1" style={{ paddingBottom: '80px' }}>
                <h1>Jackets</h1>
                {status === "loading" && (
                    <button className="btn btn-dark" type="button" disabled>
                        <span className="spinner-grow spinner-grow-sm me-4" aria-hidden="true"></span>
                        <span role="status">Loading...</span>
                    </button>
                )}
                {error && <div className="text-danger">Error: {error}</div>}
                <div className="row">
                    <div className="row mb-5">
                        <div className="col">
                            <label>Sort by Price: </label>
                            <select onChange={(e) => handleChange(e.target.value)} className="form-select">
                                <option value=" ">Default</option>
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>
                        <div className="col">
                        <label>Sort by Price: </label>
                            <select onChange={(e) => handleChange(e.target.value)} className="form-select">
                                <option value=" ">Default</option>
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>
                    </div>
                   
                    {filterJack.map(b => (
                        <div className="col-4 my-3" key={b.id}>
                            <div className="card" style={{
                                border: '1px solid #ddd',
                                borderRadius: '5px',
                                transition: 'transform 0.3s ease-in-out'
                            }} 
                                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                                <img onClick={() => navigate(`/jackets/${b._id}`) } src={b.coverImageUrl} alt="jacket.png" />
                                <div className="card-body">
                                    <Link className="btn" to="/"><h5 className="card-title">{b.name}</h5></Link>
                                    <p>Price: {b.price}</p>
                                    <div className="d-flex justify-content-between">
                                        <button onClick={() => handleCart(b)} className="btn btn-primary">Add to cart</button>
                                        <button onClick={() => handleWish(b)} className="btn btn-primary">Save to Wishlist</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};


export default Jackets