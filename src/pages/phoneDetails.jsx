import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, addToWishlist } from "../features/user/userSlice";
import { useEffect } from "react";
import { useState } from "react";
import Toast from "../components/Toast";
const JacketDetail = () => {
  const ID = useParams();
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const handleDecrease = () => setQuantity(quantity - 1);
  const handleIncrease = () => setQuantity(quantity + 1);
  const phones = useSelector((state) => state.phone.phones);
  const detail = phones.find((item) => item._id == ID.id);
  // console.log(detail)
  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };
  const triggerToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // Auto-hide after 3 seconds
  };
  const handleWish = () => {
    dispatch(
      addToWishlist({ id: user._id, data: { proID: detail._id, quantity: 1 } })
    );
    setQuantity(0);
    triggerToast(`<b>${detail.title}</b> was Added to Wishlist!`);
  };

  const handleCart = () => {
    dispatch(
      addToCart({ id: user._id, data: { proID: detail._id, quantity: 1 } })
    );
    setQuantity(0);
    triggerToast(`<b>${detail.title}</b> was Added to Cart!`);
  };
  return (
    <>
      <Header />
      <div className="container py-4">
        <div className="row">
          <div className="col-md-6">
            <div
              style={{
                width: "100%",
                aspectRatio: "16/9", //
                overflow: "hidden",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
            >
              <img
                src={selectedImage || detail.imageUrl}
                alt={detail.title || "Game Image"}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
            <div className="d-flex flex-wrap mt-3">
              {detail.images && detail.images.length > 0 ? (
                detail.images.map((image, index) => (
                  <div
                    key={index}
                    className="me-4"
                    style={{
                      width: "120px",
                      aspectRatio: "4/3",
                      overflow: "hidden",
                      borderRadius: "4px",
                      border:
                        selectedImage === image
                          ? "2px solid #0d6efd"
                          : "1px solid #ddd",
                      marginTop: "20px",
                      marginRight: "8px",
                      marginBottom: "8px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleImageSelect(image)}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                ))
              ) : (
                <p>No additional images available</p>
              )}
            </div>
          </div>

          <div className="col">
            <h1>{detail.title}</h1>
            <p>Brand: {detail.brand}</p>
            <p>Model: {detail.model}</p>
            <p>OS: {detail.os}</p>
            <p>Weight: {detail.weight}</p>
            <p>Rating: {detail.ratings}</p>
            <p>Camera: {detail.camera}</p>
            <p>Display Size: {detail.displaySize}</p>
            <p>Ram: {detail.ram} GB</p>
            <p>Price: $ {detail.price}</p>
            <p>Colors: {detail.color.join(", ")}</p>
            <p>
              Released On: {new Date(detail.releaseDate).toLocaleDateString()}
            </p>
            <h3>Quantity: {quantity}</h3>
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
              <button
                onClick={() => handleWish()}
                className="btn btn-dark me-5"
              >
                Add to Wishlist
              </button>
              <button
                onClick={() => handleCart()}
                className="btn btn-info ms-5"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <p>{detail.stock > 5 ? "" : "Only a few Left! Hurry Up"}</p> */}
      <Footer />
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
