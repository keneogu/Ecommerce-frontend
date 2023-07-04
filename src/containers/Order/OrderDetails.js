import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../../components/layout/Loader";

const OrderDetails = () => {
  const { isLoading, orderDetail } = useSelector((state) => state.order);

  console.log(orderDetail);

  const {
    shippingInfo,
    orderedItems,
    paymentInfo,
    user,
    totalPrice,
    orderStatus,
  } = orderDetail.cart;

  const shippingDetails =
    shippingInfo &&
    `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;

  const isPaid =
    paymentInfo && paymentInfo.status === "succeeded" ? true : false;

  return (
    <div className="container mx-auto">

      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col my-5 mx-4">
          <h6 className="text-sm underline underline-offset-8 text-blue-500 mt-3">
            {orderDetail.cart._id}
          </h6>
          <div className="my-3">
            <h4 className="text-center text-slate-700 mb-3 font-extrabold text-3xl">
              My Shipping Info:
            </h4>
            <div className="my-3">
              <p>
                <b>Name: </b>
                {user && user.name}
              </p>
              <p>
                <b>Phone: </b>
                {shippingInfo && shippingInfo.phoneNo}
              </p>
              <p>
                <b>Address: </b>
                {shippingDetails}
              </p>
              <p>
                <b>Amount: </b>${totalPrice}
              </p>
            </div>

            <hr />

            <div className="flex my-5">
              <div className="flex mr-5">
                <h4 className="pr-2">Payment:</h4>
                <p className={isPaid ? "text-green-400" : "text-red-500"}>
                  <b>{isPaid ? "PAID" : "NOT PAID"}</b>
                </p>
              </div>

              <div className="flex mr-5">
                <h4 className="pr-2">Order Items:</h4>
                <p
                  className={
                    orderDetail.orderStatus &&
                    String(orderDetail.orderStatus).includes("Delivered")
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  <b>{orderStatus}</b>
                </p>
              </div>
            </div>

            <hr />

            <div className="bg-white shadow-lg p-9">
              {orderedItems &&
                orderedItems.map((item) => (
                  <div
                    key={item.product}
                    className="flex flex-col md:grid grid-cols-5 gap-2 my-3 items-center shadow-xl p-3"
                  >
                    <div className="grid-span-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24"
                      />
                    </div>

                    <div className="grid-span-1">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>

                    <div className="grid-span-1">
                      <p>${item.price}</p>
                    </div>

                    <div className="grid-span-1">
                      <p>{item.quantity} Piece(s)</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
