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
          <select
            id="sortPriceAsc"
            onChange={(e) => handleChange(e.target.value)}
            className="form-select"
          >
            <option value=" ">Default</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
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
        <button className="btn btn-dark" type="button" disabled>
          <span className="spinner-grow spinner-grow-sm me-2" aria-hidden="true"></span>
          <span role="status">Loading...</span>
        </button>
      )}

      {/* Error Handling */}
      {error && <div className="text-danger">Error: {error}</div>}

      {/* Jacket Cards */}
      <div className="row">
        {filterJack.map((b) => (
          <div className="col-4 my-3" key={b.id}>
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
              <img
                onClick={() => navigate(`/jackets/${b._id}`)}
                src={b.coverImageUrl}
                alt="jacket"
                className="card-img-top"
              />
              <div className="card-body">
                <Link className="btn text-decoration-none" to="/">
                  <h5 className="card-title">{b.name}</h5>
                </Link>
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
      {filterJack.length === 0 && (
                  status === "loading" ? <p className="text-muted">Jackets are loading, please wait</p>  : 
                  <p className="text-muted">No books of that genre at the moment, try again later.</p>
                )}

    </div>
  </div>

  {/* Footer */}
  <Footer />
</div>

    );
};


export default Jackets