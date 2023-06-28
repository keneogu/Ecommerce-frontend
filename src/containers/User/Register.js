import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../features/UserSlice";
import Head from "../../components/layout/Head";
import Loader from "../../components/layout/Loader";
import { FaUser } from "react-icons/fa";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const [avatar, setAvatar] = useState("");
  const [avatarPrev, setAvatarPrev] = useState("/images/default_avatar.jpg");

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPrev(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };
  const { isAuthenticated, isLoading } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("name", name);
    data.set("email", email);
    data.set("password", password);
    data.set("avatar", avatar);
    for (var pair of data.entries()) {
      console.log(pair[0] + " - " + pair[1]);
    }
    dispatch(registerUser(data));
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Head title={"Register New User"} />
          <div className="flex flex-col w-full my-36 md:w-3/6 lg:w-2/6 md:my-32 md:mx-auto bg-white shadow-md hover:shadow-xl rounded-lg">
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="flex flex-col p-4"
            >
              <div className="flex py-5 font-bold">
                <h3 className="text-xl">Register</h3>
                <p className="pt-2 px-2">
                  <FaUser />
                </p>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="name"
                  className="after:content-['*'] after:ml-0.5 block"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={onChange}
                  className="h-8 outline-0"
                />
              </div>
              <hr />
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
              <div className="flex flex-col">
                <label htmlFor="avatar">Avatar</label>
                <div>
                  <div>
                    <figure>
                      <img
                        src={avatarPrev}
                        alt="avatar"
                        className="rounded-full border-2 border-slate-700"
                        style={{ width: 50, height: 50 }}
                      />
                    </figure>
                  </div>
                  <div>
                    <input
                      type="file"
                      name="avatar"
                      id="custom-file"
                      accept="images/*"
                      onChange={onChange}
                    />
                  </div>
                </div>
              </div>
              <hr />
              <Link
                to="/login"
                className="text-right text-blue-800 hover:text-blue-500 py-2"
              >
                Already have an account?
              </Link>
              <button
                disabled={isLoading ? true : false}
                className="bg-slate-800 text-white mx-5 my-4 p-3 rounded-md font-bold hover:bg-slate-700"
              >
                Register
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Register;
