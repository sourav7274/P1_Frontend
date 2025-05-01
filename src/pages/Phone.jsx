import Header from "../components/Header";
import Footer from "../components/Footer";
import { fetchPhones } from "../features/phones/phoneSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addToCart,addToWishlist } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import { motion } from "framer-motion";

const Books = () => {
  const [color, setColor] = useState("All");
  const { user } = useSelector((state) => state.user);
  const [filterPhone, setFilter] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const colorOps = [
    "Black",
    "White",
    "Silver",
    "Gold",
    "Rose Gold",
    "Blue",
    "Red",
    "Green",
    "Purple",
    "Pink",
    "Gray",
    "Yellow",
    "Orange",
    "Teal",
  ];
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { phones, status, error } = useSelector((state) => state.phone);
  // console.log(phones);
  useEffect(() => {
    dispatch(fetchPhones());
  }, [dispatch]);

  const triggerToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // Auto-hide after 3 seconds
  };
  useEffect(() => {
    if (phones.length > 0) {
      setFilter(phones);
    }
  }, [phones]);

  const handleChange = (val) => {
    setColor(val);
    if (val === "All") {
      setFilter(phones);
    } else {
      setFilter(phones.filter((phone) => phone.pcolor.includes(val)));
    }
  };
  const handleWish = (wish) => {
    dispatch(addToWishlist({id:user._id,data:{proID:wish._id,quantity:1}}));
    triggerToast(`<b>${wish.title}</b> was Added to Wishlist!`);
  };
  const handleCart = (item) => {
    dispatch(addToCart({id:user._id,data:{proID:item._id,quantity:1}}));
    triggerToast(`<b>${item.title}</b> was Added to Wishlist!`);
  };

  const handlePrice = (val) => {
    if (val == " ") setFilter(phones);
    else if (val == "asc")
      setFilter([...phones].sort((a, b) => a.price - b.price));
    else setFilter([...phones].sort((a, b) => b.price - a.price));
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
                <div className="mb-3">
                  <label htmlFor="sortByColor" className="form-label">
                    Sort By Color:
                  </label>
                  <select
                    id="sortByColor"
                    value={color}
                    onChange={(e) => handleChange(e.target.value)}
                    className="form-select"
                  >
                    <option value="All">All Colors</option>
                    {colorOps.map((col, index) => (
                      <option key={index} value={col}>
                        {col}
                      </option>
                    ))}
                  </select>
                  <p className="mt-2 text-secondary">
                    {filterPhone.length} Products{" "}
                  </p>
                </div>
              </li>
              <li>
                <div>
                  <label className="form-label">Order by Price</label>
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

          {/* Main Content */}
          <div className="container flex-grow-1 py-4">
            <h1>Phones</h1>

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

            {/* Phone Cards */}
            <div className="row g-4">
              {filterPhone.length === 0 && status !== "loading" && (
                <p className="text-muted">
                  No phones of that category at the moment, try again later.
                </p>
              )}

              {filterPhone.map((b, index) => (
                <div key={b._id} className="col-md-4">
                  <motion.div
                    variants={divVariant}
                    initial="initial"
                    whileInView={"animate"}
                    custom={index}
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
                      <Link
                        to={`/phones/${b._id}`}
                        className="btn text-decoration-none"
                      >
                        <h5 className="card-title">{b.title}</h5>
                      </Link>
                      <p className="card-text">Brand: {b.brand}</p>
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
          </div>
        </div>

        {/* Footer */}
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

export default Books;
