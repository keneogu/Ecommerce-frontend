import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Head from "../../components/layout/Head";
import { useSelector } from "react-redux";
import Checkout from "./Checkout";

const ConfirmOrder = () => {
  const { cartItems, shippingInfo, cartTotalAmount } = useSelector(
    (state) => state.cart
  );
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const shippingPrice = cartTotalAmount > 200 ? 0 : 25;
  const taxPrice = Number((0.05 * cartTotalAmount).toFixed(2));
  const totalPrice = (cartTotalAmount + shippingPrice + taxPrice).toFixed(2);

  const processToPayment = () => {
    const data = {
      itemsPrice: cartTotalAmount.toFixed(2),
      shippingPrice,
      taxPrice,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/payment");
  };

  return (
    <div className="container mx-auto my-20">
      <Head title={"Confirm Order"} />
      <Checkout shipping confirmOrder />
      <div className="md:w-3/4 md:mx-auto flex flex-col md:flex-row md:justify-between justify-center md:items-center my-16 mx-4">
        <div className="w-full mr-6">
          <h4 className="my-4 text-slate-700 text-4xl font-bold text-center">
            Confirm Order
          </h4>
          <p>
            <b>Name:</b>
            {user && user.user?.name}
          </p>
          <p>
            <b>Phone:</b>
            {shippingInfo.phoneNo}
          </p>
          <p>
            <b>Address:</b>
            {` ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}
          </p>

          <hr />
          <h4>Your Cart Items</h4>
          <hr />
          {cartItems.map((item) => (
            <div key={item._id}>
              <div className="md:flex text-lg lg:text-base md:p-3 items-center w-full my-5 bg-white shadow-lg rounded-lg">
                <div>
                  <img
                    src={item.image}
                    alt="item Product"
                    className="md:w-24 md:h-24"
                  />
                </div>
                <div className="ml-9 p-4">
                  <div>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div>
                    <p>
                      {item.quantity} * {item.price} ={" "}
                      <b>${item.quantity * item.price}</b>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="block m-2 md:flex md:justify-end bg-white shadow-lg rounded-lg px-3">
          <div>
            <h2 className="w-full bg-slate-700 text-center p-[5px] text-white rounded-xl">
              Order Summary
            </h2>
            <hr />
            <p className="text-center pt-1">
              Subtotal: <span>{cartTotalAmount}</span>
            </p>
            <p className="text-center pt-1">
              Shipping: <span>{shippingPrice}</span>
            </p>
            <p className="text-center pt-1">
              Tax: <span className="text-right">{taxPrice}</span>
            </p>

            <hr />

            <p className="text-center py-1">
              Total: <span>{totalPrice}</span>
            </p>

            <hr />
            <button
              onClick={processToPayment}
              className="block w-full border-2 m-1 rounded-md bg-slate-700 hover:bg-slate-600 text-white text-center p-2"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
