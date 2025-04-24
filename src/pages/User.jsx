import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateUser, deleteAddress } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { localUser } from "../features/user/userSlice";

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const user = userState.user || localUser;
  const [dis, setDis] = useState(false);
  const [newAddress, setAddress] = useState({
    houseNo: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    landmark: "",
  });
  // console.log(localUser);
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
              <button
                className="btn btn-primary"
                onClick={() => setDis(!dis)}
              >
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
