import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { makeOrder, deleteItemFCart } from "../features/user/userSlice";

const Cart = () => {
  const [tprice, setPrice] = useState(0);
  const [dis, setDis] = useState(false);
  const [final, setFinal] = useState([]);
  const [address, setAddress] = useState(null);
  const [addressDis, setAddressDis] = useState("");
  const { user } = useSelector((state) => state.user);
  const cart = user?.cart || [];
  const allAddress = user?.address || [];
  const dispatch = useDispatch();

  const fTotal = (data) => {
    return data.reduce(
      (acc, curr) => acc + curr.proID.price * curr.quantity,
      0
    );
  };

  useEffect(() => {
    setPrice(fTotal(cart));
  }, [cart]);

  const handleClick = (id) => {
    dispatch(deleteItemFCart({ id: user._id, data: { proID: id } }));
  };

  const handleBuy = () => {
    const finalCart = cart.map((item) => ({
      itemId: item.proID._id,
      quantity: item.quantity,
    }));
    dispatch(
      makeOrder({
        userId: user._id,
        items: finalCart,
        total: Number(tprice.toFixed(2)),
        address,
      })
    );
    setFinal(cart);
    setDis(true);
  };

  return (
    <>
      <Header />
      <div
        className="d-flex flex-column min-vh-100"
        style={{ margin: 0, padding: 0 }}
      >
        <div className="container my-5 flex-grow-1 d-flex flex-column">
          {cart.length === 0 ? (
            <div className="text-center py-5">
              <h3 className="mb-3">🛒 Your Cart is Empty</h3>
              <Link to="/home" className="btn btn-dark">
                Shop Now
              </Link>
            </div>
          ) : (
            <>
              <div className="card p-4 shadow-sm mb-4">
                <h4 className="mb-3">Cart Items</h4>
                <ul className="list-group mb-3">
                  {cart.map((item) => (
                    <li
                      key={item._id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <strong>Name:</strong>{" "}
                        {item.proID.title || item.proID.name}{" "}
                        <strong>Quantity:</strong> {item.quantity}
                      </div>
                      <button
                        onClick={() => handleClick(item.proID._id)}
                        className="btn btn-outline-danger btn-sm"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
                <p>
                  <strong>Total:</strong> ${tprice.toFixed(2)}
                </p>
                <div className="mb-3">
                  <label htmlFor="addressSelect" className="form-label">
                    Select Address
                  </label>
                  <select
                    id="addressSelect"
                    className="form-select"
                    onChange={(e) =>
                      setAddress(
                        allAddress.find((add) => add._id == e.target.value)
                      )
                    }
                  >
                    <option value="">Select Address</option>
                    {allAddress.map((addrs) => (
                      <option key={addrs._id} value={addrs._id}>
                        {addrs.addName}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={handleBuy}
                  className="btn btn-primary w-100"
                  disabled={!address || cart.length === 0}
                >
                  Check Out
                </button>
              </div>

              {allAddress.length === 0 && (
                <div className="text-center mt-4">
                  <p className="text-danger mb-2">No Address Saved</p>
                  <Link to="/user" className="btn btn-primary">
                    Add Address
                  </Link>
                </div>
              )}

              {dis && (
                <div className="card p-4 shadow-sm mb-4">
                  <h2 className="text-center mb-4">Order Summary</h2>
                  <ul className="list-group mb-3">
                    {final.map((item) => (
                      <li
                        key={item._id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <div>
                          <strong>Name:</strong>{" "}
                          {item.proID.title || item.proID.name}{" "}
                          <strong>Quantity:</strong> {item.quantity}
                        </div>
                      </li>
                    ))}
                  </ul>
                  <p>
                    <strong>Total:</strong> ${tprice.toFixed(2)}
                  </p>
                  {address && (
                    <>
                      <h5 className="mt-4">
                        Dispatched to:{" "}
                        <span className="text-secondary">
                          {address.addName}
                        </span>
                      </h5>
                      <div className="card mt-3">
                        <div className="card-body">
                          <p>
                            <strong>Name:</strong> {user.name}
                          </p>
                          <p>
                            <strong>Phone Number:</strong> {address.phnNumber}
                          </p>
                          <p>
                            <strong>House Number:</strong> {address.houseNo}
                          </p>
                          <p>
                            <strong>Street:</strong> {address.street}
                          </p>
                          <p>
                            <strong>City:</strong> {address.city}
                          </p>
                          <p>
                            <strong>State:</strong> {address.state}
                          </p>
                          <p>
                            <strong>Pincode:</strong> {address.pincode}
                          </p>
                          <p>
                            <strong>Landmarks/Special Directions:</strong>{" "}
                            {address.landmark ||
                              "No Landmarks or special directions given"}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </>
          )}
          <div className="mt-5">
            <h2 className="mb-4 text-center">Recent Order History</h2>
            {user.orderHistory.length > 0 ? (
              <>
                {" "}
                <div className="row row-cols-1 row-cols-md-2 g-4">
                  {[...user.orderHistory].reverse().map((history) => (
                    <div className="col" key={history._id}>
                      <div className="card h-100 shadow-sm">
                        <div className="card-body">
                          <h5 className="card-title">
                            Order ID: {history._id}
                          </h5>
                          <p>
                            <strong>Total Price:</strong> $
                            {Number(history.total).toFixed(2)}
                          </p>
                          {history.items.map((item, index) => (
                            <div
                              key={index}
                              className="mb-2 border-bottom pb-1"
                            >
                              <strong>
                                {item.itemId.name || item.itemId.title}
                              </strong>
                              <p className="text-muted mb-0">
                                Quantity: {item.quantity}
                              </p>
                            </div>
                          ))}
                        </div>
                        <div className="px-4 mb-3">
                          <button
                            onClick={() =>
                              setAddressDis(
                                addressDis === history._id ? "" : history._id
                              )
                            }
                            className="btn btn-link p-0"
                          >
                            {addressDis === history._id
                              ? "Hide Address"
                              : "Show Address"}
                          </button>
                          {addressDis === history._id && (
                            <div className="mt-2 text-start">
                              {console.log(history)}
                              <p>
                                <strong>Address Name:</strong>{" "}
                                {history.address[0].addName}
                              </p>
                              <p>
                                <strong>Contact Number:</strong>{" "}
                                {history.address[0].phnNumber}
                              </p>
                              <p>
                                <strong>House Number:</strong>{" "}
                                {history.address[0].houseNo}
                              </p>
                              <p>
                                <strong>Street:</strong>{" "}
                                {history.address[0].street}[0]
                              </p>
                              <p>
                                <strong>City:</strong> {history.address[0].city}
                              </p>
                              <p>
                                <strong>State:</strong> {history.address[0].state}
                              </p>
                              <p>
                                <strong>Country:</strong>{" "}
                                {history.address[0].country}
                              </p>
                              <p>
                                <strong>Pincode:</strong>{" "}
                                {history.address[0].pincode}
                              </p>
                              <p>
                                <strong>Landmarks/Special Directions:</strong>{" "}
                                {history.address[0].landmark ||
                                  "No Landmarks or special directions given"}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="mt-3 text-center">
                  <p className="text-secondary fs-2">No Orders Found</p>
                </div>
              </>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Cart;
