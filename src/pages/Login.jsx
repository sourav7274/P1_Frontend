import { useState } from "react";
import { getUser, postUser } from "../features/user/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    const result = await dispatch(getUser(data))
    if(getUser.fulfilled.match(result))
    {
        navigate('/home')
    }
};
  return (
    <>
      {isLogin ? (
        <>
          {/* Login Component */}
          <div className="container ps-5 mt-5">
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
                    className="btn btn-primary"
                  >
                    Login
                  </button>
                </form>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6 offset-md-3 text-center">
                <p>
                  Don't have an account?{" "}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="bg-primary"
                  >
                    Register Here
                  </button>
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Register Component */}
          <div className="container ps-5 mt-5">
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <h2 className="text-center">Login</h2>
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
                    className="btn btn-primary"
                  >
                    Register
                  </button>
                </form>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6 offset-md-3 text-center">
                <p>
                  Already have an account?{" "}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-primary"
                  >
                    Sign Here
                  </button>
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
