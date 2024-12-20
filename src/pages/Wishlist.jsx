import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromWishList } from "../features/wishlist/wishlistSlice";
import { addToCart } from "../features/cart/cart";

const Wishlist = () => {
    const { wishlist } = useSelector((state) => state.wishlist);
    const dispatch = useDispatch();

    const handleClick = (abc) => {
        dispatch(removeFromWishList(abc));
    };

    const handleCart = (item) => {
        dispatch(removeFromWishList(item._id));
        dispatch(addToCart(item));
    };

    return (
        <>
            <Header />
            <div className="d-flex flex-column min-vh-100">
                <div className="container mt-5 flex-grow-1">
                    {wishlist.length === 0 ? (
                        <div className="text-center">
                            <h3>No Items in Wishlist</h3>
                            <Link
                                className="btn mt-3"
                                to="/"
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
                        <div>
                            <ul className="list-group">
                                <div className="row">
                                    {wishlist.map((item) => (
                                        <div key={item._id} className="col-md-4 col-sm-6 mb-4">
                                            <div className="card h-100">
                                                <div className="card-body">
                                                    <h5 className="card-title">{item.name || item.title}</h5>
                                                    <p className="card-text">Quantity: {item.quantity}</p>
                                                    <button
                                                        onClick={() => handleClick(item._id)}
                                                        className="btn btn-danger btn-block me-5"
                                                    >
                                                        Remove from Wishlist
                                                    </button>
                                                    <button
                                                        onClick={() => handleCart(item)}
                                                        className="btn btn-primary btn-block"
                                                    >
                                                        Add To Cart
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ul>
                        </div>
                    )}
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Wishlist;
