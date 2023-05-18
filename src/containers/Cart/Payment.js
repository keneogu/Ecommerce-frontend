import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Head from "../../components/layout/Head";
import Checkout from "./Checkout";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

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
  const { cartitems, shippingInfo } = useSelector((state) => state.cart);

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    document.querySelector("#payment_btn").disabled = true;

    let res;

    try {
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

      if (result.error) {
        alert(result.error.message);
        document.querySelector("#payment_btn").disabled = false;
      } else {
        if (result.paymentIntent.status === "succeeded") {
        }
      }
    } catch (error) {
      document.querySelector("#payment_btn").disabled = false;
      alert(error.response.data.message);
    }
  };

  useEffect(() => {}, []);
  return (
    <div>
      <Head title={"Payment Page"} />
      <Checkout shipping confirmOrder payment />
      <div>
        <form onSubmit={handleSubmit}>
          <h1>Card Info</h1>
          <div>
            <label htmlFor="card_num">Card Number</label>
            <CardNumberElement type="text" id="card_num" options={options} />
          </div>
          <div>
            <label htmlFor="card_exp">Card Number</label>
            <CardExpiryElement type="text" id="card_exp" options={options} />
          </div>
          <div>
            <label htmlFor="card_cvc">Card Number</label>
            <CardCvcElement type="text" id="card_cvc" options={options} />
          </div>
          <button type="submit" id="payment_btn">
            Pay
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
