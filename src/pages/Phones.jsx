import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchPhones } from "../features/phones/phoneSlice";
import { Link } from "react-router-dom";
import { addToWishlist } from "../features/wishlist/wishlistSlice";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../features/cart/cart";
import Toast from "../components/Toast";

const Phones = () => {
  const { phones, status, error } = useSelector((state) => state.phones);
  const [filteredPhones, setFilteredPhones] = useState([]);
  const [cat, setCat] = useState("All");
  const category = [
    "Smartphone",
    "Feature Phone",
    "Foldable",
    "Gaming Phone",
    "Rugged Phone",
  ];
  const dispatch = useDispatch();
  console.log(phones);
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const triggerToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // Auto-hide after 3 seconds
  };

  useEffect(() => {
    if (phones.length > 0) {
      setFilteredPhones(phones);
    }
  }, [phones]);

  const handleChange = (e) => {
    console.log(e);
    console.log(filteredPhones);
    setCat(e);
    if (e === "All") {
      setFilteredPhones(phones);
    } else {
      const filtPhones = phones.filter((phone) => phone.category.includes(e));
      setFilteredPhones(filtPhones);
    }
  };
  useEffect(() => {
    dispatch(fetchPhones());
  }, [dispatch]);
  const handleWish = (val) => {
    console.log(val);
    dispatch(addToWishlist(val));
    triggerToast(`<b>${val.name}</b> was Added to Wishlist!`);
  };

  const handleCart = (item) => {
    dispatch(addToCart(item));
    triggerToast(`<b>${item.name}</b> was Added to Wishlist!`);
  };

  const handleCLick = (val) => {
    navigate(`/phones/${val}`);
  };

  const handlePrice = (val) => {
    if (val === " ") {
      setFilteredPhones(filteredPhones);
    }
    if (val === "asc") {
      setFilteredPhones([...filteredPhones].sort((a, b) => a.price - b.price));
    }
    if (val == "dsc") {
      setFilteredPhones([...filteredPhones].sort((a, b) => b.price - a.price));
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const paginatedPhones = phones.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Header />

        <div className="d-flex">
          <div
            className="bg-light border"
            style={{ width: "250px", minHeight: "100vh" }}
          >
            <h5 className="p-3">Sidebar</h5>
            <ul className="list-unstyled p-3">
              <li>
                {" "}
                <div className="mb-4">
                  <label htmlFor="category" className="form-label">
                    Sort by Category:
                  </label>
                  <select
                    id="category"
                    value={cat}
                    onChange={(e) => handleChange(e.target.value)}
                    className="form-select"
                  >
                    <option value="All">All</option>
                    {category.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </li>
              <li>
                <div>
                  <label className="form-label">Sort By Price: </label>
                  <br />
                  <input
                    onClick={(e) => handlePrice(e.target.value)}
                    className="me-2 mt-3"
                    type="radio"
                    name="priceS"
                    value=" "
                  />
                  Default
                  <br />
                  <input
                    onClick={(e) => handlePrice(e.target.value)}
                    className="me-2 mt-3"
                    type="radio"
                    name="priceS"
                    value="asc"
                  />
                  Ascending
                  <br />
                  <input
                    onClick={(e) => handlePrice(e.target.value)}
                    className="me-2 mt-3"
                    type="radio"
                    name="priceS"
                    value="dsc"
                  />
                  Descending
                </div>
              </li>
            </ul>
          </div>

          <div className="p-4" style={{ flex: 1 }}>
            <div className="container">
              <h1 className="mb-4">Phones</h1>

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

              {error && (
                <p className="text-danger">
                  An error occurred. Please try again later.
                </p>
              )}

              <div className="row g-4">
                {paginatedPhones.length === 0 && status !== "loading" && (
                  <p className="text-muted">
                    No phones of that category at the moment, try again later.
                  </p>
                )}

                {paginatedPhones.map((b) => (
                  <div key={b._id} className="col-md-4">
                    <div
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
                        <Link
                          to={`/phones/${b._id}`}
                          className="btn text-decoration-none"
                        >
                          <h5 className="card-title">{b.name}</h5>
                        </Link>
                        <p className="card-text">
                          Manufacturer: {b.manufacturer}
                        </p>
                        <p className="card-text">Price: $ {b.price}</p>
                        <div className="d-flex justify-content-between">
                          <button
                            onClick={() => handleCart(b)}
                            className="btn btn-primary"
                          >
                            Add to Cart
                          </button>
                          <button
                            onClick={() => handleWish(b)}
                            className="btn btn-outline-primary"
                          >
                            Save to Wishlist
                          </button>
                        </div>
                      </div>
                    </div>
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
                  disabled={currentPage * itemsPerPage >= phones.length}
                  className="btn btn-secondary"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
      {showToast && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 1050,
          }}
        >
          <Toast message={toastMessage} />
        </div>
      )}
    </>
  );
};

export default Phones;
