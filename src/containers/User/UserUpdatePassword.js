import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserPassword } from "../../features/UserSlice";
import Head from "../../components/layout/Head";

const UserUpdatePassword = () => {
	const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
	const { isLoading, isUpdated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {

    if (isUpdated) {
      navigate("/me");
    }
  }, [dispatch, navigate, isUpdated]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("oldPassword", oldPassword);
    data.set("password", password);
    for (var pair of data.entries()) {
      console.log(pair[0] + " - " + pair[1]);
    }
    dispatch(updateUserPassword(data));
  };

	return (
		<div>
      <Head title={"Update Password"} />
      <div>
        <form onSubmit={handleSubmit}>
          <h1>Update Password</h1>
          <div>
          <label htmlFor="old_pass">Password</label>
            <input
              type="password"
              id="old_pass"
              placeholder="OldPassword"
              name="oldPassword"
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
            />
            <label htmlFor="new_pass">Password</label>
            <input
              type="password"
              id="new_pass"
              placeholder="NewPassword"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button disabled={isLoading ? true : false}>Update Password</button>
          </div>
        </form>
      </div>
    </div>
	)
}

export default UserUpdatePassword;
