import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadUser, updateUserProfile } from "../../features/UserSlice";
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
      <div>
        <div>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <h3>Update User</h3>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <button disabled={isLoading ? true : false}>Update User</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserUpdateProfile;
