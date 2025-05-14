import { useEffect, useState } from "react";
import { getUser, postUser } from "../features/user/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { clearErrors, clearMessage } from "../features/user/userSlice";
import { motion, AnimatePresence } from "framer-motion";


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.user);
  const { message } = useSelector((state) => state.user);
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

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        dispatch(clearMessage());

        // Only switch to login if we're currently on the Register form
        if (!isLogin) {
          setIsLogin(true);
        }

        setUser({
          name: "",
          email: "",
          password: "",
          phone: "",
        });
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [message, isLogin]);

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
              className="d-flex justify-content-center align-items-center bg-dark text-light"
              style={{ height: "100vh" }}
            >
              <div
                className="card p-4 shadow-lg"
                style={{ width: "100%", maxWidth: "400px" }}
              >
                <h3 className="text-center mb-4">Login</h3>
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
                    onClick={handleSign}
                    type="submit"
                    className="btn btn-primary w-100"
                  >
                    Login
                  </button>
                </form>

                {error && (
                  <div className="alert alert-danger text-center mt-3">
                    {error}
                  </div>
                )}

                <div className="text-center mt-3">
                  <p>
                    Don't have an account?
                    <button
                      onClick={() => setIsLogin(false)}
                      className="btn btn-link text-decoration-none"
                    >
                      Register here
                    </button>
                  </p>
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
              className="d-flex justify-content-center align-items-center bg-light"
              style={{ height: "100vh" }}
            >
              <div
                className="card p-4 shadow "
                style={{ width: "100%", maxWidth: "400px" }}
              >
                <h3 className="text-center mb-4">Register</h3>
                <form>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="name">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={user.name}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
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
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleChange}
                      className="form-control"
                      id="password"
                      required
                    />
                  </div>
                  <button
                    onClick={handleRegisterSubmit}
                    type="submit"
                    className="btn btn-success w-100"
                  >
                    Register
                  </button>
                </form>

                {error && (
                  <div className="alert alert-danger text-center mt-3">
                    {error}
                  </div>
                )}

                {message && (
                  <div className="alert alert-success text-center mt-3">
                    {message}
                  </div>
                )}

                <div className="text-center mt-3">
                  <p>
                    Already have an account?
                    <button
                      onClick={() => setIsLogin(true)}
                      className="btn btn-link text-decoration-none"
                    >
                      Sign in here
                    </button>
                  </p>
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
