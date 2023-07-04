import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserPassword } from "../../features/UserSlice";
import { FaSignInAlt } from "react-icons/fa";

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
      <div className="flex flex-col w-full my-36 md:w-3/6 lg:w-2/6 md:my-32 md:mx-auto bg-white shadow-md hover:shadow-xl rounded-lg">
        <form onSubmit={handleSubmit} className="flex flex-col p-4">
          <div className="flex py-5 font-bold">
            <h3 className="text-xl">Update Password</h3>
            <p className="pt-2 px-2">
              <FaSignInAlt />
            </p>
          </div>
          <div>
            <div className="flex flex-col">
              <label htmlFor="old_pass" className="after:content-['*'] after:ml-0.5 block text-xl md:text-base italic">Old_Password</label>
              <input
                type="password"
                id="old_pass"
                placeholder="OldPassword"
                name="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="h-8 outline-0 text-xl md:text-base"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="new_pass" className="after:content-['*'] after:ml-0.5 block text-xl md:text-base italic">Password</label>
              <input
                type="password"
                id="new_pass"
                placeholder="NewPassword"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-8 outline-0 text-xl md:text-base"
              />
            </div>
            <button
              disabled={isLoading ? true : false}
              className="bg-slate-800 text-white mx-5 my-4 p-3 rounded-md font-bold hover:bg-slate-700"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserUpdatePassword;
