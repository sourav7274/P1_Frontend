import Header from "../components/Header";
import Footer from "../components/Footer";
import { fetchBooks } from "../features/books/bookSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addToWishlist } from "../features/wishlist/wishlistSlice";
import { addToCart } from "../features/cart/cart";
import { useNavigate } from "react-router-dom";
import "./some.css";
import Toast from "../components/Toast";
import { motion } from "framer-motion";

const Books = () => {
  const dispatch = useDispatch();
  const { books, status, error } = useSelector((state) => state.books);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [toastMesage, setToast] = useState("");
  const [toastDiis, setTDis] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const genres = [
    "Fiction",
    "Autobiography",
    "Non-fiction",
    "Mystery",
    "Thriller",
    "Science Fiction",
    "Fantasy",
    "Romance",
    "Historical",
    "Business",
    "Biography",
    "Self-help",
    "Other",
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
    if (e.target.value === "All") {
      setFilteredBooks(books);
    } else {
      const sortedBooks = books.filter((book) =>
        book.genre.includes(e.target.value)
      );
      setFilteredBooks(sortedBooks);
    }
  };

  const handleWish = (val) => {
    dispatch(addToWishlist(val));
    triggerToast(`<b>${val.title}</b> has been added to your cart`);
    setTDis(true);
  };

  const handleCart = (item) => {
    dispatch(addToCart(item));
    triggerToast(`<b>${item.title}</b> has been added to your cart`);
    setTDis(true);
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

  const triggerToast = (message) => {
    setToast(message);
    setTDis(true);
    setTimeout(() => setTDis(false), 3000);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const divVariant = {
    initial: {
      opacity: 0,
      y: 50,
    },
    animate: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
      },
    }),
  };

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        {/* Header */}
        <Header />

        {/* Main Content with Sidebar */}
        <div className="d-flex">
          {/* Sidebar */}
          <div
            className="bg-light border"
            style={{ width: "250px", minHeight: "100vh" }}
          >
            <h5 className="p-3">Sidebar</h5>
            <ul className="list-unstyled p-3">
              <li>
                {/* Filter Dropdown */}
                <div className="mb-4">
                  <label htmlFor="genre" className="form-label">
                    Sort by Genre:
                  </label>
                  <select
                    id="genre"
                    value={selectedGenre}
                    onChange={(e) => handleChange(e)}
                    className="form-select"
                  >
                    <option value="All">All</option>
                    {genres.map((genre) => (
                      <option key={genre} value={genre}>
                        {genre}
                      </option>
                    ))}
                  </select>
                </div>
              </li>
              <li>
                <div>
                  <label className="form-label">Order By Price</label>
                  <br />
                  <input
                    name="price"
                    onChange={(e) => handlePrice(e.target.value)}
                    type="radio"
                    id="asc"
                    value=" "
                  />{" "}
                  Default
                  <br />
                  <input
                    name="price"
                    onChange={(e) => handlePrice(e.target.value)}
                    className="my-3"
                    type="radio"
                    id="priceI"
                    value="asc"
                  />{" "}
                  Ascending
                  <br />
                  <input
                    name="price"
                    onChange={(e) => handlePrice(e.target.value)}
                    type="radio"
                    id="priceI"
                    value="dsc"
                  />{" "}
                  Descending
                </div>
              </li>
            </ul>
          </div>

          {/* Main Books Content */}
          <div className="container py-4" style={{ flex: 1 }}>
            <h1 className="mb-4">Books</h1>

            {/* Loading Indicator */}
            {status === "loading" && (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "50vh" }}
              >
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}

            {/* Error Handling */}
            {error && (
              <p className="text-danger">
                An error occurred. Please try again later.
              </p>
            )}

            {/* Book Cards */}
            <div className="row g-4">
              {paginatedBooks.length === 0 && status !== "loading" && (
                <p className="text-muted">
                  No books of that genre at the moment, try again later.
                </p>
              )}

              {paginatedBooks.map((b, index) => (
                <div key={b.id} className="col-md-4">
                  <motion.div
                    initial="initial"
                    whileInView={"animate"}
                    custom={index}
                    variants={divVariant}
                    viewport={{ once: true }}
                    className="card h-100"
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: "5px",
                      transition: "transform 0.3s ease-in-out",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
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
                      <Link
                        to={`/book/${b._id}`}
                        className="btn text-decoration-none"
                      >
                        <h5 className="card-title">{b.title}</h5>
                      </Link>
                      <p className="card-text">Author: {b.author}</p>
                      <p className="card-text">Price: $ {b.price}</p>
                      <div className="d-flex justify-content-between">
                        <button
                          onClick={() => handleCart(b)}
                          className="btn btn-primary"
                        >
                          Add to cart
                        </button>
                        <button
                          onClick={() => handleWish(b)}
                          className="btn btn-outline-primary"
                        >
                          Save to Wishlist
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
            <div className="d-flex justify-content-between mt-4">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="btn btn-secondary"
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage * itemsPerPage >= books.length}
                className="btn btn-secondary"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
      {toastDiis && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "10px",
            zIndex: "1050",
          }}
        >
          <Toast message={toastMesage} setTDis={setTDis} />
        </div>
      )}
    </>
  );
};

export default Books;
