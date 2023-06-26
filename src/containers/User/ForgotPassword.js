import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { forgotPassword } from "../../features/UserSlice";
import { FaSignInAlt } from "react-icons/fa";
import Head from "../../components/layout/Head";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { message, isLoading } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      alert(message);
    }
  }, [dispatch, message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("email", email);
    for (var pair of data.entries()) {
      console.log(pair[0] + " - " + pair[1]);
    }
    dispatch(forgotPassword(data));
  };
  return (
    <>
      <Head title={"Update Password"} />
      <div className="flex flex-col w-full my-36 md:w-3/6 lg:w-2/6 md:my-32 md:mx-auto bg-white shadow-md hover:shadow-xl rounded-lg">
        <form onSubmit={handleSubmit} className="flex flex-col p-4">
          <div className="flex py-5 font-bold">
            <h3 className="text-xl">Forgot Password</h3>
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
              type="email"
              id="email"
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-8 outline-0"
            />
            <button
              disabled={isLoading ? true : false}
              className="bg-slate-800 text-white mx-5 my-4 p-3 rounded-md font-bold hover:bg-slate-700"
            >
              Send Email
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
