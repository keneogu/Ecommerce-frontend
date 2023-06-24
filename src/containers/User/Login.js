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

  const redirect = location.search ? location.search.split("=")[1] : "/";

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
          <div className="flex flex-col w-full my-36 md:w-3/6 lg:w-2/6 md:my-32 md:mx-auto bg-white shadow-md hover:shadow-xl rounded-lg">
            <form className="flex flex-col p-4">
              <div className="flex py-5 font-bold">
                <h3 className="text-xl">Login</h3>
                <p className="pt-2 px-2">
                  <FaSignInAlt />
                </p>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="after:content-['*'] after:ml-0.5 block"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  className="h-8 outline-0"
                />
              </div>
              <hr />
              <div className="flex flex-col">
                <label
                  htmlFor="pass"
                  className="after:content-['*'] after:ml-0.5 block"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="pass"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  className="h-8 outline-0"
                />
              </div>
              <hr />
              <div className="relative py-2">
                <Link
                  to="/me/password/forgot"
                  className="absolute right-0 text-blue-800 hover:text-blue-500"
                >
                  Forgot Password?
                </Link>

                <Link
                  to="/register"
                  className="underline italic text-slate-900 font-bold"
                >
                  Register
                </Link>
              </div>

              <button
                onClick={handleSubmit}
                className="bg-slate-800 text-white mx-5 my-4 p-3 rounded-md font-bold hover:bg-slate-700"
              >
                Login
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
