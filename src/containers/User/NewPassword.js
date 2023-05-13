import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetPassword } from "../../features/UserSlice";
import Head from "../../components/layout/Head";
import { Navigate, useParams } from "react-router-dom";

const NewPassword = () => {
  const {token} = useParams();
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
  const { success, isLoading } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      alert("Password updated successfully");
			Navigate('/login')
    }
  }, [dispatch, success]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("password", password);
    data.set("confirmPassword", confirmPassword);
    for (var pair of data.entries()) {
      console.log(pair[0] + " - " + pair[1]);
    }
    dispatch(resetPassword(token, data));
  };
	return (
		<div>
			<Head title={"Update User"} />

			<div>
			<form onSubmit={handleSubmit}>
          <h1>Reset Password</h1>
          <div>
            <label htmlFor="pass">Password</label>
            <input
              type="password"
              id="pass"
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="pass1">Password</label>
            <input
              type="password"
              id="pass1"
              placeholder="Password..."
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button disabled={isLoading ? true : false}>Send Email</button>
          </div>
        </form>
			</div>
		</div>
	)
}

export default NewPassword