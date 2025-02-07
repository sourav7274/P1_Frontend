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

    const handlePrice = (val) =>{
      if(val == " ") setFilter(phones)
      else if (val == "asc") setFilter([...phones].sort((a,b) => a.price - b.price))  
      else setFilter([...phones].sort((a,b) => b.price - a.price))  
    }

    return(
        <>
        <div className="d-flex flex-column min-vh-100">
          {/* Header */}
          <Header />
      
          {/* Main Content with Sidebar */}
          <div className="d-flex">
            {/* Sidebar */}
            <div className="bg-light border" style={{ width: '250px', minHeight: '100vh' }}>
              <h5 className="p-3">Sidebar</h5>
              <ul className="list-unstyled p-3">
                <li>
                <div className="mb-3">
                  <label htmlFor="sortByColor" className="form-label">Sort By Color:</label>
                  <select
                    id="sortByColor"
                    value={color}
                    onChange={(e) => handleChange(e.target.value)}
                    className="form-select"
                  >
                    <option value="All">All Colors</option>
                    {colorOps.map((col, index) => (
                      <option key={index} value={col}>{col}</option>
                    ))}
                  </select>
                </div>
                </li>
                <li>
                  <div>
                    <label className="form-label">Order by Price</label>
                    <br/>
                    <input name="price" onChange={(e) => handlePrice(e.target.value)} type="radio" id="asc" value=" " /> Default
                    <br/>
                    <input name="price" onChange={(e) => handlePrice(e.target.value)} className="my-3" type="radio" id="priceI" value="asc"/> Ascending
                    <br/>
                    <input name="price" onChange={(e) => handlePrice(e.target.value)} type="radio" id="priceI" value="dsc"/> Descending
                  </div>
                </li>
              </ul>
            </div>
      
            {/* Main Content */}
            <div className="container flex-grow-1 py-4">
              <h1>Phones</h1>
      
              {/* Loading Indicator */}
              {status === "loading" && (
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
                  <div className="loader"></div>
                </div>
              )}
      
              {/* Error Handling */}
              {error && <p className="text-danger">An error occurred. Please try again later.</p>}
      
              {/* Phone Cards */}
              <div className="row g-4">
                {filterPhone.length === 0 && status !== "loading" && (
                  <p className="text-muted">No phones of that category at the moment, try again later.</p>
                )}
      
                {filterPhone.map((b) => (
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
                          onClick={() => navigate(`/phones/${b._id}`)}
                          alt={b.title}
                          style={{
                            maxHeight: "100%",
                            maxWidth: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <div className="card-body">
                        <Link to={`/phones/${b._id}`} className="btn text-decoration-none">
                          <h5 className="card-title">{b.name}</h5>
                        </Link>
                        <p className="card-text">Brand: {b.brand}</p>
                        <p className="card-text">Price: $ {b.price}</p>
                        <div className="d-flex justify-content-between">
                          <button onClick={() => handleCart(b)} className="btn btn-primary">Add to cart</button>
                          <button onClick={() => handleWish(b)} className="btn btn-outline-primary">Save to Wishlist</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
      
          {/* Footer */}
          <Footer />
        </div>
      </>
      
      
    )
}

export default Books