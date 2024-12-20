import Header from "../components/Header"
import Footer from "../components/Footer"
import { fetchPhones } from "../features/phones/phoneSlice"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { addToWishlist } from "../features/wishlist/wishlistSlice"
import { addToCart } from "../features/cart/cart"
import { useNavigate } from "react-router-dom"

const Books = () =>{
    const [color,setColor] = useState("All")
    const [filterPhone,setFilter] = useState([])
    const colorOps = [    "Black",   "White",    "Silver",   "Gold",  "Rose Gold",   "Blue",    "Red",   "Green",  "Purple",  "Pink",  "Gray", "Yellow",   "Orange",
        "Teal"
      ]
    const navigate = useNavigate()  
    const dispatch = useDispatch()
    const {phones,status,error }= useSelector(state => state.phone)
    console.log(phones)
    useEffect(() => {
        dispatch(fetchPhones())
    },[dispatch])

    useEffect(() => {
        if (phones.length>0)
        {
            setFilter(phones)
        }
    },[phones])

    const handleChange = (val) =>{
        setColor(val)
        if(val === "All" )
        {
            setFilter(phones)
        }
        else
        {
            setFilter(phones.filter((phone) => phone.color.includes(val)))
        }
    }
    const handleWish = (wish) =>{
        dispatch(addToWishlist(wish))
    }
    const handleCart = (item) =>{
        dispatch(addToCart(item))
    }
    return(
        <>
           <div className="d-flex flex-column min-vh-100">
           <Header/>
            <div className="container py-2">
                <h1>Phones</h1>
                {status === "loading" && <>
                <button className="btn btn-dark" type="button" disabled>
                <span className="spinner-grow spinner-grow-sm me-4" aria-hidden="true"></span>
                <span role="status">Loading...</span>
                </button>
                </>}
                {error === "loading" && console.log(error) }
                <ul className="list-group">
                  <div className="row">
                  <label>Sort By Color:</label>
                    <select value={color} onChange={(e) => handleChange(e.target.value)} className="form-select">
                        <option value="All">All Colors</option>
                        {colorOps.map((col) => <option value={col}>{col}</option>)}
                    </select>
                    {filterPhone.length === 0 && <p>No Phones available in that color, try again later..</p> }
                  {filterPhone.map(b => (
                        <>  
                            <div className="col-4 my-2">
                                <div className="card" 
                                     style={{border: '1px solid #ddd', borderRadius: '5px', transition: 'transform 0.3s ease-in-out'}} 
                                     onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} 
                                     onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                                    <img onClick={() => dispatch(navigate(`/phones/${b._id}`))} src={b.coverImageUrl} alt="book.png"/>
                                    <div className="card-body">
                                        <Link className="btn" to="/"><h5 className="card-title">{b.name}</h5></Link>
                                        <p>Brand: {b.brand}</p>
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

export default Books