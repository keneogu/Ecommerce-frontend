import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetPassword } from "../../features/UserSlice";
import { Navigate, useParams } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";

const NewPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { success, isLoading } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      alert("Password updated successfully");
      Navigate("/login");
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
    <>

      <div className="flex flex-col w-full my-36 md:w-3/6 lg:w-2/6 md:my-32 md:mx-auto bg-white shadow-md hover:shadow-xl rounded-lg">
        <form onSubmit={handleSubmit} className="flex flex-col p-4">
          <div className="flex py-5 font-bold">
            <h3 className="text-xl">Reset Password</h3>
            <p className="pt-2 px-2">
              <FaSignInAlt />
            </p>
          </div>
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
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-8 outline-0"
            />
            <label
              htmlFor="pass1"
              className="after:content-['*'] after:ml-0.5 block"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="pass1"
              placeholder="Password..."
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="h-8 outline-0"
            />
            <button
              disabled={isLoading ? true : false}
              className="bg-slate-800 text-white mx-5 my-4 p-3 rounded-md font-bold hover:bg-slate-700"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewPassword;
