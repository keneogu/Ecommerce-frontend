import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { forgotPassword } from "../../features/UserSlice";
import Head from "../../components/layout/Head";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { message, isLoading } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      alert(message);
    }
  }, [dispatch, alert]);

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
      <Head title={"Update User"} />
      <div>
        <form onSubmit={handleSubmit}>
          <h1>Forgot Password</h1>
          <div>
            <label htmlFor="email">Password</label>
            <input
              type="email"
              id="email"
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button disabled={isLoading ? true : false}>Send Email</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
