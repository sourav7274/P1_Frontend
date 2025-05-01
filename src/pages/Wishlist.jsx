import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  addtoCartFWish,
  deleteItemFWishlist,
} from "../features/user/userSlice";

const Wishlist = () => {
  const { user } = useSelector((state) => state.user);
  const wishlist = user?.wishlist;
  const dispatch = useDispatch();

  const handleClick = (abc) => {
    dispatch(deleteItemFWishlist({ id: user._id, data: { proID: abc } }));
  };

  const handleCart = (item) => {
    dispatch(
      addtoCartFWish({
        id: user._id,
        data: { ...item, quantity: item.quantity },
      })
    );
  };

  return (
    <>
      <Header />
      <div className="d-flex flex-column min-vh-100 bg-light">
        <div className="container mt-5 flex-grow-1">
          {wishlist && wishlist.length === 0 ? (
            <div className="text-center">
              <h3>No Items in Wishlist</h3>
              <Link
                className="btn mt-3"
                to="/home"
                style={{ color: "white", background: "black" }}
                onMouseEnter={(e) => {
                  e.target.style.color = "white";
                  e.target.style.backgroundColor = "grey";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "white";
                  e.target.style.backgroundColor = "black";
                }}
              >
                Shop Now
              </Link>
            </div>
          ) : (
            <div className="row">
              {wishlist?.map((item) => (
                <div key={item._id} className="col-md-4 col-sm-6 mb-4">
                  <div className="card h-100 shadow-sm">
                    <div className="card-body d-flex flex-column justify-content-between">
                      <h5 className="card-title">
                        {item.proID.name || item.proID.title}
                      </h5>
                      <p className="card-text mb-3">
                        Quantity: {item.quantity}
                      </p>
                      <div className="d-flex justify-content-between mt-auto">
                        <button
                          onClick={() => handleClick(item.proID._id)}
                          className="btn btn-outline-danger w-50 me-2"
                        >
                          Remove
                        </button>
                        <button
                          onClick={() => handleCart(item)}
                          className="btn btn-dark w-50"
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Wishlist;
