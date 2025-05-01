import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchGames } from "../features/games/gameSlice";
import { useParams } from "react-router-dom";
import { addToCart, addToWishlist } from "../features/user/userSlice";

const GameDetail = () => {
  const { id } = useParams(); // Destructure 'id' directly
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(""); // Fallback to an empty string
  const [quantity, setQuantity] = useState(1);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  const handleDecrease = () => setQuantity(quantity - 1);
  const handleIncrease = () => setQuantity(quantity +1);

  const games = useSelector((state) => state.games.games);
  const detail = games?.find((item) => item._id === id);

  useEffect(() => {
    if (detail?.imageUrl) setSelectedImage(detail.imageUrl);
  }, [detail]);

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  const handleWish = () => {
    dispatch(
      addToWishlist({ id: user._id, data: { proID: detail._id, quantity } })
    );
    setQuantity(0);
    // triggerToast(`<b>${val.title}</b> was Added to Wishlist!`);
  };

  const handleCart = () => {
    dispatch(
      addToCart({ id: user._id, data: { proID: detail._id, quantity } })
    );
    setQuantity(0);
    // triggerToast(`<b>${item.title}</b> was Added to Cart!`);
  };

  if (!detail) {
    return (
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <div className="container py-4 text-center">
          <h2>Game Not Found</h2>
          <p>
            It seems the game you are looking for doesn't exist or has been
            removed.
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <div className="container py-4">
          <div className="row">
            <div className="col-md-6">
              <img
                className="img-fluid rounded border mb-3"
                src={selectedImage || "placeholder-image-url.jpg"} // Add a fallback image URL
                alt={detail.title || "Game Image"}
              />
              <div className="d-flex flex-wrap mt-3">
                {detail.images && detail.images.length > 0 ? (
                  detail.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className={`img-thumbnail me-2 mb-2 ${
                        selectedImage === image ? "border border-primary" : ""
                      }`}
                      style={{
                        cursor: "pointer",
                        width: "200px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                      onClick={() => handleImageSelect(image)}
                    />
                  ))
                ) : (
                  <p>No additional images available</p>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <h1>{detail.title}</h1>
              <p>
                {" "}
                <b>
                  {detail.multiplayer
                    ? "Co-op / PVP"
                    : "Single Player Campaign"}
                </b>
              </p>
              <div className="row">
                <div className="col">
                  <p>Meta Critic Rating - {detail.metaCriticRating || "N/A"}</p>
                </div>
                <div className="col">
                  <p>User Rating - {detail.userRating || "N/A"}</p>
                </div>
              </div>
              <p>
                Completion Time -{" "}
                {detail.completionTime == 0
                  ? "Endless"
                  : "Approx  " + detail.completionTime + " " + "hrs"}
              </p>
              <p>Publisher - {detail.publisher || "N/A"}</p>
              <p>
                Release Date -{" "}
                {new Date(detail.releaseDate).toLocaleDateString() || "N/A"}
              </p>
              <p>Studio - {detail.studio || "N/A"}</p>
              <p>Platform - {detail.platform || "N/A"}</p>
              <p>PG Rating - {detail.pgRating || "N/A"}</p>
              <h3>
                {detail.price == 0 ? "Free To Play" : "$ " + detail.price}
              </h3>
              <label className="form-label">Quantity: {quantity}</label>
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-outline-secondary"
                  onClick={handleDecrease}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <div className="mx-2 px-3 py-2 border rounded">{quantity}</div>
                <button
                  className="btn btn-outline-secondary"
                  onClick={handleIncrease}
                >
                  +
                </button>
              </div>
              <div className="d-flex flex-wrap gap-2 mt-4">
                <button onClick={() => handleWish()} className="btn btn-dark">
                  Add to Wishlist
                </button>
                <button onClick={() => handleCart()} className="btn btn-info">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default GameDetail;
