import React from "react";
import { Link } from "react-router-dom";

const Checkout = ({ shipping, confirmOrder, payment }) => {
  return (
    <div className="flex container justify-center items-center mt-4">
      {shipping ? (
        <Link
          to="/shipping"
          className="mx-3 rounded-lg bg-slate-700 text-white p-3"
        >
          <div></div>
          <div>Shipping</div>
          <div></div>
        </Link>
      ) : (
        <Link
          to="#"
          disabled
          className="mx-3 rounded-lg bg-slate-700 text-white p-3"
        >
          <div></div>
          <div>Shipping</div>
          <div></div>
        </Link>
      )}

      {confirmOrder ? (
        <Link to="#" className="mx-3 rounded-lg bg-slate-700 text-white p-3">
          <div></div>
          <div>Confirm Order</div>
          <div></div>
        </Link>
      ) : (
        <Link to="#" disabled className="mx-3">
          <div></div>
          <div>Confirm Order</div>
          <div></div>
        </Link>
      )}

      {payment ? (
        <Link to="#" className="mx-3 rounded-lg bg-slate-700 text-white p-3">
          <div></div>
          <div>Payment</div>
          <div></div>
        </Link>
      ) : (
        <Link to="#" disabled className="mx-3">
          <div></div>
          <div>Payment</div>
          <div></div>
        </Link>
      )}
    </div>
  );
};

export default Checkout;
