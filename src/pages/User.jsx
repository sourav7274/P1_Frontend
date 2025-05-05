import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateUser, deleteAddress } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { localUser } from "../features/user/userSlice";
import { useEffect } from "react";
import { motion } from "framer-motion";

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const user = userState.user || localUser;
  const [dis, setDis] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState("checking"); // clearer naming
  const [seconds, setSeconds] = useState(0);

  const [newAddress, setAddress] = useState({
    houseNo: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    landmark: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userValid = user && user.name !== undefined;

    if (!token || !userValid) {
      setIsAuthenticated("unauthenticated");
      setSeconds(2);
      const timeout = setTimeout(() => {
        navigate("/"); // Changed to "/login" for clarity
      }, 3000);

      return () => clearTimeout(timeout);
    } else {
      setIsAuthenticated("authenticated");
    }
  }, [user, navigate]);

  const handleChange = (val) => {
    const { name, value } = val.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user._id) {
      navigate("/");
    }
    dispatch(updateUser({ id: user._id, data: newAddress }));
    setDis(false);
    setAddress({
      addName: "",
      phnNumber: "",
      houseNo: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
      landmark: "",
    });
  };

  const handledeleteAddress = (id) => {
    dispatch(deleteAddress({ id: user._id, addId: id }));
  };

  useEffect(() => {
    if (seconds <= 0) return;
    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);
  const formatTime = (s) => {
    const mins = String(Math.floor(s / 60)).padStart(2, "0");
    const secs = String(s % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  // Loading state while checking authentication
  if (isAuthenticated === "checking") {
    return (
      <>
        <Header />
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <h1>Checking Authentication...</h1>
        </div>
        <Footer />
      </>
    );
  }

  // Not authenticated state
  if (isAuthenticated === "unauthenticated") {
    return (
      <>
        <Header />
        <div className="d-flex flex-column min-vh-100 bg-danger bg-gradient text-white">
          <div className="flex-grow-1 d-flex justify-content-center align-items-center px-3">
            <motion.div
              className="text-center p-4 rounded-4 shadow-lg"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h1 className="h3 fw-semibold mb-3">Please login again.</h1>
              <p className="mb-4">
                Redirecting to the homepage in{" "}
                <span className="fw-bold">{formatTime(seconds)}</span>
              </p>
              <motion.div
                className="spinner-border text-white"
                style={{ width: "4rem", height: "4rem", borderWidth: "0.4rem" }}
                role="status"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />
            </motion.div>
          </div>
          <Footer className="mt-auto" />
        </div>
      </>
    );
  }

  // Authenticated state - main content
  return (
    <>
      <Header />
      <div className="d-flex flex-column min-vh-100 bg-light">
        <div className="flex-grow-1 mt-5 container">
          <h1 className="text-center text-primary">Manage Account</h1>
          <div className="card p-4 shadow-sm my-4">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
          {user.address.length > 0 ? (
            <>
              <h3 className="mx-5 my-3 text-secondary">Saved Addresses</h3>
              {user.address.map((address) => (
                <div className="container mt-2" key={address._id}>
                  <div className="card shadow-sm mb-3">
                    <div className="card-body">
                      <p>
                        <strong>Address Name:</strong> {address.addName}
                      </p>
                      <p>
                        <strong>Contact Number:</strong> {address.phnNumber}
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
                        <strong>Country:</strong> {address.country}
                      </p>
                      <p>
                        <strong>Pincode:</strong> {address.pincode}
                      </p>
                      <p>
                        <strong>Landmarks/Special Directions:</strong>{" "}
                        {address.landmark ? (
                          <span>{address.landmark}</span>
                        ) : (
                          <span>No Landmarks or special directions given</span>
                        )}
                      </p>
                      <button
                        onClick={() => handledeleteAddress(address._id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button
                className="btn btn-primary my-3"
                onClick={() => setDis(!dis)}
              >
                {dis ? "Cancel" : "Add More"}
              </button>
            </>
          ) : (
            <div className="container text-center mt-5">
              <p className="text-muted">No Address Saved</p>
              <button className="btn btn-primary" onClick={() => setDis(!dis)}>
                {dis ? "Cancel" : "Add Address"}
              </button>
            </div>
          )}
          {dis && (
            <div className="card p-4 shadow-sm mt-4">
              <form onSubmit={handleSubmit}>
                <input
                  className="form-control my-2"
                  type="text"
                  onChange={(e) => handleChange(e)}
                  value={newAddress.addName}
                  name="addName"
                  placeholder="Address Name"
                />
                <input
                  className="form-control my-2"
                  type="number"
                  onChange={(e) => handleChange(e)}
                  value={newAddress.phnNumber}
                  name="phnNumber"
                  placeholder="Contact Number"
                />
                <input
                  name="houseNo"
                  onChange={(e) => handleChange(e)}
                  value={newAddress.houseNo}
                  className="form-control my-2"
                  type="text"
                  placeholder="House No."
                />
                <input
                  name="street"
                  onChange={(e) => handleChange(e)}
                  value={newAddress.street}
                  className="form-control my-2"
                  type="text"
                  placeholder="Street Number"
                />
                <input
                  name="city"
                  onChange={(e) => handleChange(e)}
                  value={newAddress.city}
                  className="form-control my-2"
                  type="text"
                  placeholder="City"
                />
                <input
                  name="state"
                  onChange={(e) => handleChange(e)}
                  value={newAddress.state}
                  className="form-control my-2"
                  type="text"
                  placeholder="State"
                />
                <input
                  name="pincode"
                  onChange={(e) => handleChange(e)}
                  value={newAddress.pincode}
                  className="form-control my-2"
                  type="number"
                  placeholder="Pincode"
                />
                <input
                  name="country"
                  onChange={(e) => handleChange(e)}
                  value={newAddress.country}
                  className="form-control my-2"
                  type="text"
                  placeholder="Country"
                />
                <label className="form-label mt-3">
                  Landmarks/ Special Instructions:{" "}
                </label>
                <textarea
                  name="landmark"
                  onChange={(e) => handleChange(e)}
                  value={newAddress.landmark}
                  cols={50}
                  rows={5}
                  className="form-control my-2"
                  type="text"
                />
                <button type="submit" className="btn btn-primary my-3">
                  Submit
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default User;
