import Header from "../components/Header";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { makeOrder } from "../features/user/userSlice";
import { deleteItemFCart } from "../features/user/userSlice";

const Cart = () => {
  const [tprice, setPrice] = useState();
  const [dis, setDis] = useState(false);
  const [final, setFinal] = useState([]);
  const { user } = useSelector((state) => state.user);
  const cart = user?.cart;
  const address = user?.address[0];
  const dispatch = useDispatch();
  const fTotal = (data) => {
    if (data) {
      return data.reduce((acc, curr) => (acc += curr.proID.price), 0);
    }
  };
  // console.log(user);
  useEffect(() => {
    const total = fTotal(cart);
    setPrice(total);
  });
  const handleClick = (id) => {
    dispatch(deleteItemFCart({ id: user._id, data: { proID: id } }));
  };
  const handleBuy = () => {
    const finalCart = cart.reduce((acc, curr) => {
      acc.push({ itemId: curr.proID._id, quantity: curr.quantity });
      return acc;
    }, []);
    dispatch(makeOrder({ userId: user._id, items: finalCart }));
    setDis(true);

    // console.log(final)
  };

  return (
    <>
      <Header />
      <div className="d-flex flex-column min-vh-100">
        <div className="container mt-5 flex-grow-1">
          {cart?.length === 0 ? (
            <div className="container py-5">
              <div className="text-center mb-5">
                <h3>No Items in Cart</h3>
                <Link
                  className="btn btn-dark mt-3"
                  to="/"
                  onMouseEnter={(e) => {
                    e.target.classList.remove("btn-dark");
                    e.target.classList.add("btn-secondary");
                  }}
                  onMouseLeave={(e) => {
                    e.target.classList.remove("btn-secondary");
                    e.target.classList.add("btn-dark");
                  }}
                >
                  Shop Now
                </Link>
              </div>

              <div className="mt-5">
                <h1 className="mb-4 text-center">Recent Order History</h1>
                <div className="row">
                  <div className="container mt-5 flex-grow-1">
                    <div className="order-history-masonry">
                      {[...user.orderHistory].reverse().map((history) => (
                        <div key={history._id} className="mb-4">
                          <div className="card shadow-sm">
                            <div className="card-body">
                              <h5 className="card-title">
                                Order ID: {history._id}
                              </h5>
                              {history.items.map((item, index) => (
                                <div
                                  key={index}
                                  className="mb-3 border-bottom pb-2"
                                >
                                  <p className="mb-1 fw-bold">
                                    {item.itemId.name || item.itemId.title}
                                  </p>
                                  <p className="mb-0 text-muted">
                                    Quantity: {item.quantity}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* {[...user.orderHistory].reverse().map((history) => (
                    <div key={history._id} className="col-md-6 mb-4">
                      <div className="card shadow-sm h-100">
                        <div className="card-body">
                          <h5 className="card-title">
                            Order ID: {history._id}
                          </h5>
                          {history.items.map((item, index) => (
                            <div
                              key={index}
                              className="mb-3 border-bottom pb-2"
                            >
                              <p className="mb-1 fw-bold">
                                {item.itemId.name || item.itemId.title}
                              </p>
                              <p className="mb-0 text-muted">
                                Quantity: {item.quantity}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))} */}
                </div>
              </div>
            </div>
          ) : (
            <main className="container py-4">
              <ul className="list-group">
                {cart?.map((item) => (
                  <li
                    key={item._id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <b>Name: </b>
                      {item.proID.title || item.proID.name} <b>Quantity: </b>
                      {item.quantity}
                    </div>
                    <button
                      onClick={() => handleClick(item.proID._id)}
                      className="btn btn-danger"
                    >
                      Remove from Cart
                    </button>
                  </li>
                ))}
              </ul>
              <p>Total: $ {tprice}</p>
              <button onClick={handleBuy} className="btn btn-primary">
                Check Out
              </button>
              <div
                className="text-center mt-5"
                style={{
                  display: address && address.length == 0 ? "block" : "none",
                }}
              >
                <p className="text-danger mb-4">No Address Saved</p>
                <Link to="/user" className="btn btn-primary">
                  Make One Here
                </Link>
              </div>

              <div style={{ display: dis ? "block" : "none" }}>
                <div className="text-center">
                  <h1>Summary</h1>
                  <ul className="list-group">
                    {final.map((item) => (
                      <li
                        key={item._id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <div>
                          <b>Name: </b>
                          {item.proID.title || item.proID.name}{" "}
                          <b>Quantity: </b>
                          {item.quantity}
                        </div>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4">
                    <b>Total: $ {fTotal(final)}</b>
                  </p>
                </div>
                {address ? (
                  <>
                    {" "}
                    <h3>
                      Dispatched to :{" "}
                      <span className="text-secondary">
                        {address.addName} address
                      </span>{" "}
                    </h3>
                    <div className="card">
                      <div className="card-body">
                        <p>
                          <b>Name : </b>
                          {user.name}
                        </p>
                        <p>
                          <b>Phone Number : </b>
                          {address.phnNumber}
                        </p>
                        <p>
                          <b>Address</b>
                        </p>
                        <p>
                          <b>House Number : </b>
                          {address.houseNo}
                        </p>
                        <p>
                          <b>Street Number : </b>
                          {address.street}
                        </p>
                        <p>
                          <b>City : </b>
                          {address.city}
                        </p>
                        <p>
                          <b>State : </b>
                          {address.state}
                        </p>
                        <p>
                          <b>Pincode : </b>
                          {address.pincode}
                        </p>
                        <p>
                          <b>Landmarks/Special Directions: </b>
                          {address.landmark.toLowerCase() === "" ||
                          address.landmark.toLowerCase() === "na"
                            ? "No Landmarks or special directions given"
                            : address.landmark}
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <p>No address saved</p>
                  </>
                )}
              </div>
            </main>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Cart;
