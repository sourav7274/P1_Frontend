import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchBooks } from "../features/books/bookSlice";
import { useParams } from "react-router-dom";
import { addToCart, addToWishlist } from "../features/user/userSlice";
import { useState } from "react";
const BookDetail = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const books = useSelector((state) => state.books.books);
  const detail = books.find((item) => item._id === id);

  const handleWish = () => {
    dispatch(
      addToWishlist({ id: user._id, data: { proID: detail._id, quantity } })
    );
    setQuantity(0);
  };
  const handleDecrease = () => setQuantity(quantity - 1);
  const handleIncrease = () => setQuantity(quantity + 1);
  const handleCart = () => {
    dispatch(
      addToCart({ id: user._id, data: { proID: detail._id, quantity } })
    );
    setQuantity(0);
  };

  if (!detail) return <div className="text-center mt-5">Loading...</div>;

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Header />

        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-md-5 text-center mb-4 mb-md-0">
              <img
                src={detail.imageUrl}
                alt={detail.title}
                className="img-fluid rounded"
                style={{
                  maxHeight: "400px",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            <div className="col-md-7">
              <h2 className="fw-bold">{detail.title}</h2>
              <p className="text-muted">{detail.description}</p>
              <p>
                <strong>Language:</strong> {detail.language}
              </p>
              <p>
                <strong>Genre:</strong> {detail.genre.join(", ")}
              </p>
              <p>
                <strong>First Published:</strong>{" "}
                {new Date(detail.publishedYear).toLocaleDateString()}
              </p>
              <p>
                <strong>Rating:</strong> {detail.rating}
              </p>
              <h4 className="text-success fw-semibold">${detail.price}</h4>
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
              <div className="mt-4">
                <button
                  onClick={handleWish}
                  className="btn btn-outline-dark me-3"
                >
                  Add to Wishlist
                </button>
                <button onClick={handleCart} className="btn btn-primary">
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

export default BookDetail;
