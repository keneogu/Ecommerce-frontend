import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Head from "../../components/layout/Head";
import Checkout from "./Checkout";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { createOrder } from "../../features/OrderSlice";

const options = {
  style: {
    base: {
      fontsize: "10px",
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const order = {
    orderedItems: cartItems,
    shippingInfo,
  };

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.taxPrice = orderInfo.taxPrice;
    order.totalPrice = orderInfo.totalPrice;
  }

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    document.querySelector("#payment_btn").disabled = true;

    let res;

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    res = await axios.post("/api/v1/payment/process", paymentData, config);

    const clientSecret = res.data.client_secret;

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardNumberElement),
        billing_details: {
          name: user.name,
          email: user.email,
        },
      },
    });

    console.log(result.paymentIntent.status);

    if (result.error) {
      alert(result.error.message);
      document.querySelector("#payment_btn").disabled = false;
    } else {
      if (result.paymentIntent.status === "succeeded") {
        order.paymentInfo = {
          id: result.paymentIntent.id,
          status: result.paymentIntent.status,
        };
        dispatch(createOrder(order));
        navigate("/orders/me");
      } else {
        alert("'There is some issue while payment processing...");
      }
    }
  };

  return (
    <div>
      <Head title={"Payment Page"} />
      <Checkout shipping confirmOrder payment />
      <div className="md:w-full md:mx-auto flex flex-col md:justify-center md:items-center my-16 mx-4">
        <form onSubmit={handleSubmit} className="flex flex-col p-4">
          <h1 className="my-4 text-slate-700 text-4xl font-bold text-center">
            Card Info
          </h1>
          <div className="my-2 text-lg">
            <label
              htmlFor="card_num"
              className="after:content-['*'] after:ml-0.5 block"
            >
              Card Number
            </label>
            <CardNumberElement
              type="text"
              className="h-8 md:h-6 border-2 border-slate-700 rounded-md outline-0 px-2 md:w-52 mt-1"
              id="card_num"
              options={options}
            />
          </div>
          <div className="my-2 text-lg">
            <label
              htmlFor="card_exp"
              className="after:content-['*'] after:ml-0.5 block"
            >
              Card Expiry Date
            </label>
            <CardExpiryElement
              type="text"
              className="h-8 md:h-6 border-2 border-slate-700 rounded-md outline-0 px-2 w-full mt-1"
              id="card_exp"
              options={options}
            />
          </div>
          <div className="my-2 text-lg">
            <label
              htmlFor="card_cvc"
              className="after:content-['*'] after:ml-0.5 block"
            >
              Card CvC Number
            </label>
            <CardCvcElement
              type="text"
              className="h-8 md:h-6 border-2 border-slate-700 rounded-md outline-0 px-2 w-full mt-1"
              id="card_cvc"
              options={options}
            />
          </div>
          <button
            type="submit"
            id="payment_btn"
            className="bg-slate-800 text-white mx-5 my-4 p-3 rounded-md font-bold hover:bg-slate-700"
          >
            Pay
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
