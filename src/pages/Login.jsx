import { useEffect, useState } from "react";
import { getUser, postUser } from "../features/user/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { clearErrors } from "../features/user/userSlice";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.user);
  // console.log(error)
  const [email, setMail] = useState("");
  const [password, setPasword] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [isLogin, setIsLogin] = useState(true);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    dispatch(postUser(user));
  };
  const handleSign = async (e) => {
    e.preventDefault();
    const data = { email, password };
    const result = await dispatch(getUser(data));
    if (getUser.fulfilled.match(result)) {
      navigate("/home");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(clearErrors());
    }, 3000);
  }, [error]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLogin ? (
          <>
            {/* Login Component */}
            <motion.div
              key="login"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-light bg-dark"
            >
              <div
                style={{ height: "100vh", width: "100%" }}
                className="container ps-5 pt-5"
              >
                <div className="row">
                  <div className="col-md-6 offset-md-3">
                    <h2 className="text-center">Login</h2>
                    <form>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Email address
                        </label>
                        <input
                          onChange={(e) => setMail(e.target.value)}
                          type="email"
                          className="form-control"
                          id="email"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                        <input
                          onChange={(e) => setPasword(e.target.value)}
                          type="password"
                          className="form-control"
                          id="password"
                          required
                        />
                      </div>
                      <button
                        onClick={(e) => handleSign(e)}
                        type="submit"
                        className="btn btn-light"
                      >
                        Login
                      </button>
                    </form>
                  </div>
                </div>
                {error !== null && (
                  <div
                    style={{
                      padding: "10px",

                      margin: "15px 0",

                      color: "white",
                      backgroundColor: "#dc3545", // red for error
                      textAlign: "center",
                      borderRadius: "5px",
                    }}
                  >
                    {error}
                  </div>
                )}
                <div className="row mt-3">
                  <div className="col-md-6 offset-md-3 text-center">
                    <p>
                      Don't have an account?{" "}
                      <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="btn ms-3 btn-light"
                      >
                        Register Here
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        ) : (
          <>
            {/* Register Component */}
            <motion.div
              key="register"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className=""
            >
              <div className="container ps-5 pt-5">
                <div className="row">
                  <div className="col-md-6 offset-md-3">
                    <h2 className="text-center">Register</h2>
                    <form>
                      <div className="mb-3">
                        <label className="form-label " htmlFor="name">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={user.name}
                          onChange={handleChange}
                          className="form-control mb-3"
                        />

                        <label htmlFor="email" className="form-label">
                          Email address
                        </label>
                        <input
                          type="email"
                          name="email"
                          onChange={handleChange}
                          value={user.email}
                          className="form-control mb-3"
                          id="email"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                        <input
                          name="password"
                          onChange={handleChange}
                          value={user.password}
                          type="password"
                          className="form-control"
                          id="password"
                          required
                        />
                      </div>
                      <button
                        onClick={(e) => handleRegisterSubmit(e)}
                        type="submit"
                        className="btn btn-dark"
                      >
                        Register
                      </button>
                    </form>
                  </div>
                </div>
                {error !== null && (
                  <div
                    style={{
                      padding: "10px",

                      margin: "15px 0",

                      color: "white",
                      backgroundColor: "#dc3545", // red for error
                      textAlign: "center",
                      borderRadius: "5px",
                    }}
                  >
                    {error}
                  </div>
                )}
                <div className="row mt-3">
                  <div className="col-md-6 offset-md-3 text-center">
                    <p>
                      Already have an account?{" "}
                      <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="btn btn-dark  "
                      >
                        Sign In Here
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Login;
