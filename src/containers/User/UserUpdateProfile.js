import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadUser, updateUserProfile } from "../../features/UserSlice";
import { FaUser } from "react-icons/fa";
import Head from "../../components/layout/Head";

const UserUpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [avatar, setAvatar] = useState("");
  const [avatarPrev, setAvatarPrev] = useState("/images/default_avatar.jpg");

  const onChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPrev(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const { user, isLoading, isUpdated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.user?.name);
      setEmail(user.user?.email);
      setAvatarPrev(user.user.avatar?.url);
    }

    if (isUpdated) {
      dispatch(loadUser());
      navigate("/me");
    }
  }, [dispatch, user, navigate, isUpdated]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("name", name);
    data.set("email", email);
    data.set("avatar", avatar);
    for (var pair of data.entries()) {
      console.log(pair[0] + " - " + pair[1]);
    }
    dispatch(updateUserProfile(data));
  };

  return (
    <div>
      <Head title={"Update User"} />
      <div className="flex flex-col w-full my-36 md:w-3/6 lg:w-2/6 md:my-32 md:mx-auto bg-white shadow-md hover:shadow-xl rounded-lg">
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="flex flex-col p-4"
        >
          <div className="flex py-5 font-bold">
            <h3 className="text-xl">Update User</h3>
            <p className="pt-2 px-2">
              <FaUser />
            </p>
          </div>
          <div className="flex flex-col my-1">
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
              onChange={(e) => setName(e.target.value)}
              className="h-8 border-2 border-slate-700 rounded-md outline-0 px-2"
            />
          </div>
          <div className="flex flex-col my-1">
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
              onChange={(e) => setEmail(e.target.value)}
              className="h-8 border-2 border-slate-700 rounded-md outline-0 px-2"
            />
          </div>

          <div className="my-1">
            <label
              htmlFor="avatar"
              className="after:content-['*'] after:ml-0.5 block"
            >
              Avatar
            </label>
            <div>
              <div className="my-2">
                <figure>
                  <img
                    src={avatarPrev}
                    alt="avatar"
                    className="rounded-full border-2 border-slate-700"
                    style={{ width: 80, height: 80 }}
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
          <button
            disabled={isLoading ? true : false}
            className="bg-slate-800 text-white mx-5 my-4 p-3 rounded-md font-bold hover:bg-slate-700"
          >
            Update User
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserUpdateProfile;
