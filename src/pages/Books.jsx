import Header from "../components/Header";
import Footer from "../components/Footer";
import { fetchBooks } from "../features/books/bookSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addToWishlist } from "../features/wishlist/wishlistSlice";
import { addToCart } from "../features/cart/cart";
import { useNavigate } from "react-router-dom";
import './some.css';

const Books = () => {
  const dispatch = useDispatch();
  const { books, status, error } = useSelector((state) => state.books);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const genres = [
    'Fiction', "Autobiography", 'Non-fiction', 'Mystery', 'Thriller', 
    'Science Fiction', 'Fantasy', 'Romance', 'Historical', "Business", 
    'Biography', 'Self-help', 'Other'
  ];
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  useEffect(() => {
    if (books.length > 0) {
      setFilteredBooks(books);
    }
  }, [books]);

  const handleChange = (e) => {
    setSelectedGenre(e.target.value);
    if (e.target.value === 'All') {
      setFilteredBooks(books);
    } else {
      const sortedBooks = books.filter((book) => book.genre.includes(e.target.value));
      setFilteredBooks(sortedBooks);
    }
  };

  const handleWish = (val) => {
    dispatch(addToWishlist(val));
  };

  const handleCart = (item) => {
    dispatch(addToCart(item));
  };

  const handlePrice = (val) => {
    if (val === " ") {
      setFilteredBooks(books);
    } else if (val === "asc") {
      setFilteredBooks([...books].sort((a, b) => a.price - b.price));
    } else {
      setFilteredBooks([...books].sort((a, b) => b.price - a.price));
    }
  };

  return (
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
                {/* Filter Dropdown */}
                <div className="mb-4">
                  <label htmlFor="genre" className="form-label">Sort by Genre:</label>
                  <select
                    id="genre"
                    value={selectedGenre}
                    onChange={(e) => handleChange(e)}
                    className="form-select"
                  >
                    <option value="All">All</option>
                    {genres.map((genre) => (
                      <option key={genre} value={genre}>{genre}</option>
                    ))}
                  </select>
                </div>
              </li>
              <li>
                <div>
                  <label className="form-label">Order By Price</label>
                  <select onChange={(e) => handlePrice(e.target.value)} className="form-select">
                    <option value=" ">Default</option>
                    <option value="asc">Ascending</option>
                    <option value="dsc">Descending</option>
                  </select>
                </div>
              </li>
            </ul>
          </div>

          {/* Main Books Content */}
          <div className="container py-4" style={{ flex: 1 }}>
            <h1 className="mb-4">Books</h1>

            {/* Loading Indicator */}
            {status === "loading" && (
              <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
                <div className="loader"></div>
              </div>
            )}

            {/* Error Handling */}
            {error && <p className="text-danger">An error occurred. Please try again later.</p>}

            {/* Book Cards */}
            <div className="row g-4">
              {filteredBooks.length === 0 && status !== "loading" && (
                <p className="text-muted">No books of that genre at the moment, try again later.</p>
              )}

              {filteredBooks.map((b) => (
                <div key={b.id} className="col-md-4">
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
                        onClick={() => navigate(`/book/${b._id}`)}
                        alt={b.title}
                        style={{
                          maxHeight: "100%",
                          maxWidth: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>

                    <div className="card-body">
                      <Link to={`/book/${b._id}`} className="btn text-decoration-none">
                        <h5 className="card-title">{b.title}</h5>
                      </Link>
                      <p className="card-text">Author: {b.author}</p>
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
  );
};

export default Books;