import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../../features/UserSlice";
import Head from "../../components/layout/Head";
import Loader from "../../components/layout/Loader";
import { FaSignInAlt } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const { isAuthenticated, isLoading } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, isAuthenticated, navigate, redirect]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Head title={"Login"} />
          <form>
            <h3>
              <FaSignInAlt /> Login
            </h3>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={onChange}
            />
            <label htmlFor="pass">Password</label>
            <input
              type="password"
              id="pass"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChange}
            />
            <hr />
            <Link to="#">Forgot Password</Link>
            <button onClick={handleSubmit}>Login</button>

            <Link to="/register">Register New User</Link>
          </form>
        </>
      )}
    </div>
  );
};

export default Login;
