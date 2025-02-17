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

    const brands =[
      'North Face', 'Columbia', 'Patagonia', 'Adidas', 'Nike', 
      "Levi's", 'Zara', 'H&M', 'Uniqlo', 'Marmot',
      'Puma', 'Reebok', 'Under Armour', 'Wrangler', 'Carhartt'
  ]

  console.log(jackets)
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
    const handleBrands = (val) =>{
      if(val == " ")
      {
        setFilter(jackets)
      }
      else
      {
        setFilter([...jackets].filter((item) => item.brand == val))
      }
    }

    return (
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
        <div>
          <label htmlFor="sortPriceAsc" className="form-label">Order By  Price: </label>
          <br/>
          <input name="price" onChange={(e) => handleChange(e.target.value)} type="radio" id="asc" value=" " /> Default
          <br/>
          <input name="price" onChange={(e) => handleChange(e.target.value)} className="my-3" type="radio" id="priceI" value="asc"/> Ascending
          <br/>
          <input name="price" onChange={(e) => handleChange(e.target.value)} type="radio" id="priceI" value="dsc"/> Descending
        </div>
        </li>
        <li>
        <div className="mt-4">
          <label htmlFor="sortPriceDesc" className="form-label">Sort by Brand: </label>
          <select
            id="sortPriceDesc"
            onChange={(e) => handleBrands(e.target.value)}
            className="form-select"
          >
            <option value=" ">All Brands</option>
            {brands.map((br) => <optioN value={br}>{br}</optioN>)}
          </select>
        </div>
        </li>
      </ul>
    </div>

    {/* Main Jackets Content */}
    <div className="container flex-grow-1 py-4" style={{ paddingBottom: '80px' }}>
      <h1>Jackets</h1>

      {/* Loading Indicator */}
      {status === "loading" && (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
          <div className="loader"></div>
        </div>
      )}

      {/* Error Handling */}
      {error && <p className="text-danger">An error occurred. Please try again later.</p>}

      <div className="row g-4">
        {filterJack.length === 0 && status !== "loading" && (
          <p className="text-muted">No jackets of that category at the moment, try again later.</p>
        )}

        {filterJack.map((b) => (
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
                  onClick={() => navigate(`/jackets/${b._id}`)}
                  alt={b.title}
                  style={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="card-body">
                <Link to={`/jackets/${b._id}`} className="btn text-decoration-none">
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

    );
};


export default Jackets