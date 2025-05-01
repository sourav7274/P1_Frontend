import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchGames } from "../features/games/gameSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import {
  addToCart,
  addToWishlist,
  getUserByID,
} from "../features/user/userSlice";
import { motion, AnimatePresence } from "framer-motion";

const Games = () => {
  const { games, status, error } = useSelector((state) => state.games);
  const [filteredGames, setfilterGames] = useState([]);
  const { user } = useSelector((state) => state.user);
  const [cat, setCat] = useState("All");
  const gcategory = [
    "Action",
    "Adventure",
    "Role-Playing Game (RPG)",
    "Sports",
    "Racing",
    "Simulation",
    "Strategy",
    "Puzzle",
    "Shooter",
    "Fighting",
    "Platformer",
    "Open World",
    "Survival",
    "Horror",
    "Card",
    "MMORPG",
  ];
  const dispatch = useDispatch();
  // console.log(games);
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
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

  const triggerToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // Auto-hide after 3 seconds
  };

  useEffect(() => {
    if (games.length > 0) {
      setfilterGames(games);
    }
  }, [games]);

  const handleChange = (e) => {
    // console.log(e);
    // console.log(filteredGames);
    setCat(e);
    if (e === "All") {
      setfilterGames(games);
    } else {
      const filtGames = games.filter((game) => game.gcategory.includes(e));
      setfilterGames(filtGames);
    }
  };
  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  const handleWish = (val) => {
    dispatch(
      addToWishlist({ id: user._id, data: { proID: val._id, quantity: 1 } })
    );
    triggerToast(`<b>${val.title}</b> was Added to Wishlist!`);
  };

  const handleCart = (item) => {
    dispatch(
      addToCart({ id: user?._id, data: { proID: item._id, quantity: 1 } })
    );
    triggerToast(`<b>${item.title}</b> was Added to Cart!`);
  };

  const handleCLick = (val) => {
    navigate(`/games/${val}`);
  };

  const handlePrice = (val) => {
    if (val === " ") {
      setfilterGames(filteredGames);
    }
    if (val === "asc") {
      setfilterGames([...filteredGames].sort((a, b) => a.price - b.price));
    }
    if (val == "dsc") {
      setfilterGames([...filteredGames].sort((a, b) => b.price - a.price));
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

  const paginatedGames = filteredGames.slice(
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
                  <label htmlFor="gcategory" className="form-label">
                    Sort by gcategory:
                  </label>
                  <select
                    id="gcategory"
                    value={cat}
                    onChange={(e) => handleChange(e.target.value)}
                    className="form-select"
                  >
                    <option value="All">All</option>
                    {gcategory.map((cat) => (
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
              <h1 className="mb-4">Games</h1>

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
                {paginatedGames.length === 0 && status !== "loading" && (
                  <p className="text-muted">
                    No games of that category at the moment, try again later.
                  </p>
                )}

                {paginatedGames.map((b, index) => (
                  <div key={b._id} className="col-md-4">
                    <motion.div
                      variants={divVariant}
                      initial="initial"
                      whileInView={"animate"}
                      viewport={{
                        once: true,
                      }}
                      custom={index}
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
                        <motion.img
                          whileHover={{
                            scale: 1.1,
                            z: 2,
                          }}
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
                          to={`/games/${b._id}`}
                          className="btn text-decoration-none"
                        >
                          <h5 className="card-title">{b.title}</h5>
                        </Link>
                        <p className="card-text">Developer: {b.studio}</p>
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
                  disabled={currentPage * itemsPerPage >= games.length}
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

export default Games;
