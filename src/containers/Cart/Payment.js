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
    shippingInfo
  }

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  if(orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice
    order.shippingPrice = orderInfo.shippingPrice
    order.taxPrice = orderInfo.taxPrice
    order.totalPrice = orderInfo.totalPrice
  }

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
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status
          }
          dispatch(createOrder(order))
          navigate('/success')
        }else {
          alert("'There is some issue while payment processing...")
        }
      }
    } catch (error) {
      document.querySelector("#payment_btn").disabled = false;
      alert(error.response.data.message);
    }
  };

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
            <label htmlFor="card_exp">Card Expiry Date</label>
            <CardExpiryElement type="text" id="card_exp" options={options} />
          </div>
          <div>
            <label htmlFor="card_cvc">Card CvC Number</label>
            <CardCvcElement type="text" id="card_cvc" options={options} />
          </div>
          <button type="submit" id="payment_btn" className="bg-orange-700">
            Pay
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
