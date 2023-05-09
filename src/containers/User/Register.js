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
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <h3>
              <FaUser /> Register
            </h3>
            <label htmlFor="name">Email</label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              name="name"
              value={name}
              onChange={onChange}
            />
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
            <div>
              <label htmlFor="avatar">Avatar</label>
              <div>
                <div>
                  <figure>
                    <img
                      src={avatarPrev}
                      alt="avatar"
                      className="rounded"
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
                  <label htmlFor="custom-file">Choose Avatar</label>
                </div>
              </div>
            </div>
            <hr />
            <button disabled={isLoading ? true : false}>Register</button>

            <Link to="/login">Already have an account</Link>
          </form>
        </>
      )}
    </div>
  );
};

export default Register;
