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
    navigate("/");
  };

  return (
    <div>
      <Head title={"Confirm Order"} />
      <Checkout shipping />
      <div>
        <div>
          <h4>Shipping Info</h4>
          <p>
            <b>Name:</b>
            {user && user?.name}
          </p>
          <p>
            <b>Phone:</b>
            {shippingInfo.phoneNo}
          </p>
          <p>
            <b>Address:</b>
            {`${shippingInfo.phoneNo}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}
          </p>

          <hr />
          <h4>Your Cart Items</h4>
          <hr />
          {cartItems.map((item) => (
            <>
              <div>
                <div key={item._id}>
                  <div>
                    <img src={item.image} alt="item Product" />
                  </div>
                  <div>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </div>
                  <div>
                    <p>
                      {item.cartQuantity} * {item.price} ={" "}
                      <b>${item.cartQuantity * item.price}</b>
                    </p>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
        <div>
          <div>
            <h4>Order Summary</h4>
            <hr />
            <p>
              Subtotal: <span>{cartTotalAmount}</span>
            </p>
            <p>
              Shipping: <span>{shippingPrice}</span>
            </p>
            <p>
              Tax: <span>{taxPrice}</span>
            </p>

            <hr />

            <p>
              Total: <span>{totalPrice}</span>
            </p>

            <hr />
            <button onClick={processToPayment}>Proceed to Payment</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
