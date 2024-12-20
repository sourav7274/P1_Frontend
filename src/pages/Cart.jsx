import Header from "../components/Header";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../features/cart/cart";
import { Link } from "react-router-dom";

const Cart = () => {
    const { cart } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const handleClick = (id) => {
        dispatch(removeFromCart(id));
    };

    return (
        <>
            <Header />
            <div className="d-flex flex-column min-vh-100">
                <div className="container mt-5 flex-grow-1">
                    {cart.length === 0 ? (
                        <div className="text-center">
                            <h3>No Items in Cart</h3>
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
                        <main className="container py-4">
                            <ul className="list-group">
                                {cart.map((item) => (
                                    <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
                                        <div>
                                            <b>Name: </b>{item.title || item.name}{" "}
                                            <b>Quantity: </b>{item.quantity}
                                        </div>
                                        <button
                                            onClick={() => handleClick(item._id)}
                                            className="btn btn-danger"
                                        >
                                            Remove from Cart
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </main>
                    )}
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Cart;
