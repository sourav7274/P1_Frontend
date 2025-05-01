import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, addToWishlist } from "../features/user/userSlice";
import { fetchJackets } from "../features/jackets/jacketSLice";
import { useEffect, useState } from "react";
import Toast from "../components/Toast";

const JacketDetail = () => {
  const { id } = useParams(); // Destructure 'id' directly
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(""); // Fallback to an empty string
  const { user } = useSelector((state) => state.user);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  useEffect(() => {
    dispatch(fetchJackets());
  }, [dispatch]);
  const [quantity, setQuantity] = useState(1);
  const jackets = useSelector((state) => state.jackets.jackets);
  const detail = jackets?.find((item) => item._id === id);

  useEffect(() => {
    if (detail?.imageUrl) setSelectedImage(detail.imageUrl);
  }, [detail]);

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };
  const handleDecrease = () => setQuantity(quantity - 1);
  const handleIncrease = () => setQuantity(quantity + 1);
  const handleWish = () => {
    dispatch(
      addToWishlist({ id: user._id, data: { proID: detail._id, quantity } })
    );
    setQuantity(0);
    triggerToast(`<b>${detail.title}</b> was Added to Wishlist!`);
  };

  const handleCart = () => {
    dispatch(
      addToCart({ id: user._id, data: { proID: detail._id, quantity } })
    );
    setQuantity(0);
    triggerToast(`<b>${detail.title}</b> was Added to Cart!`);
  };
  const triggerToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // Auto-hide after 3 seconds
  };
  if (!detail) {
    return (
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <div className="container py-4 text-center">
          <h2>Jacket Not Found</h2>
          <p>
            It seems the jacket you are looking for doesn't exist or has been
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

        <div className="container py-5 flex-grow-1">
          <div className="row g-5">
            {/* IMAGE SECTION */}
            <div className="col-lg-6">
              <img
                className="img-fluid rounded shadow-sm border mb-4"
                src={selectedImage || "placeholder-image-url.jpg"}
                alt={detail.title || "Jacket Image"}
                style={{ objectFit: "cover", width: "100%", height: "auto" }}
              />

              {/* THUMBNAILS */}
              <div className="d-flex flex-wrap">
                {detail.images?.length > 0 ? (
                  detail.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className={`img-thumbnail m-1 ${
                        selectedImage === image ? "border-primary border-2" : ""
                      }`}
                      style={{
                        cursor: "pointer",
                        width: "120px",
                        height: "80px",
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

            {/* DETAILS SECTION */}
            <div className="col-lg-6">
              <h2 className="mb-3">{detail.title}</h2>
              <p className="text-muted mb-4">{detail.description}</p>

              <ul className="list-unstyled">
                <li>
                  <strong>Material:</strong> {detail.material}
                </li>
                <li>
                  <strong>Rating:</strong> {detail.ratings}
                </li>
                <li>
                  <strong>Brand:</strong> {detail.bbrand}
                </li>
                <li>
                  <strong>Insulation Type:</strong> {detail.insulationType}
                </li>
                <li>
                  <strong>Category:</strong> {detail.category}
                </li>
                <li>
                  <strong>Colors:</strong> {detail.color.join(", ")}
                </li>
                <li>
                  <strong>Water Resistance:</strong>{" "}
                  {detail.waterResistance ? "Yes" : "No"}
                </li>
                <li>
                  <strong>Price:</strong> ${detail.price}
                </li>
              </ul>

              {detail.stock <= 5 && (
                <p className="text-danger fw-bold">
                  Only a few left! Hurry Up!
                </p>
              )}

              {/* QUANTITY CONTROLS */}
              <div className="d-flex align-items-center my-3">
                <h5 className="me-3 mb-0">Quantity:</h5>
                <button
                  className="btn btn-outline-secondary"
                  onClick={handleDecrease}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="mx-3 px-3 py-2 border rounded">
                  {quantity}
                </span>
                <button
                  className="btn btn-outline-secondary"
                  onClick={handleIncrease}
                >
                  +
                </button>
              </div>

              {/* ACTION BUTTONS */}
              <div className="d-flex gap-3 mt-4">
                <button onClick={handleWish} className="btn btn-outline-dark">
                  🤍 Add to Wishlist
                </button>
                <button
                  onClick={handleCart}
                  className="btn btn-info text-white"
                >
                  🛒 Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>

      {/* TOAST */}
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

export default JacketDetail;
