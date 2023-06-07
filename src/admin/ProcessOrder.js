import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/layout/Loader";
import Head from "../components/layout/Head";
import { updateOrder, resetUpdateProduct, adminOrderDetails } from "../features/AdminSlice";
import { toast } from "react-toastify";

const ProcessOrder = () => {
  const { id } = useParams();
	const [status, setStatus] = useState("");
  const { orderDetail, isLoading, isUpdated } = useSelector((state) => state.admin);

  // const {isUpdated} = useSelector((state) => state.admin);
	console.log(orderDetail);

  const {
    _id,
    shippingInfo,
    orderedItems,
    paymentInfo,
    user,
    totalPrice,
    orderStatus,
  } = orderDetail;
  const dispatch = useDispatch();

  useEffect(() => {
			dispatch(adminOrderDetails(id));

    if (isUpdated) {
      toast.success('Order updated successfully');
      dispatch(resetUpdateProduct())
  }
  }, [dispatch, id, isUpdated]);

	const updateHandler = (id) => {

		const formData = new FormData();
		formData.set('status', status);

		dispatch(updateOrder({id: id, orderData: formData}))
}

  const shippingDetails =
    shippingInfo &&
    `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;

  const isPaid = paymentInfo && paymentInfo.status === "succeeded" ? true : false;

  return (
    <>
      <Head title={"Update Order page"} />
      <div>
        {isLoading ? (
          <Loader />
        ) : (
          <div>
            <h2>Order #{_id}</h2>

            <div>
              <p>
                <b>Name:</b> {user && user.name}
              </p>
              <p>
                <b>Phone:</b> {shippingInfo && shippingInfo.phoneNo}
              </p>
              <p className="mb-4">
                <b>Address:</b>
                {shippingDetails}
              </p>
              <p>
                <b>Amount:</b> ${totalPrice}
              </p>

              <hr />

              <h4 className="my-4">Payment</h4>
              <p className={isPaid ? "text-green-500" : "text-red-500"}>
                <b>{isPaid ? "PAID" : "NOT PAID"}</b>
              </p>

              <h4 className="my-4">Stripe ID</h4>
              <p>
                <b>{paymentInfo && paymentInfo.id}</b>
              </p>

              <h4 className="my-4">Order Status:</h4>
              <p
                className={
                  orderStatus &&
                  String(orderStatus).includes("Delivered")
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                <b>{orderStatus}</b>
              </p>

              <h4 className="my-4">Order Items:</h4>

              <hr />
              <div className="">
                {orderedItems &&
                  orderedItems.map((item) => (
                    <div key={item.product} className="">
                      <div className="">
                        <img
                          src={item.image}
                          alt={item.name}
                          height="45"
                          width="65"
                        />
                      </div>

                      <div className="">
                        <Link to={`/products/${item.product}`}>
                          {item.name}
                        </Link>
                      </div>

                      <div className="">
                        <p>${item.price}</p>
                      </div>

                      <div className="">
                        <p>{item.quantity} Piece(s)</p>
                      </div>
                    </div>
                  ))}
              </div>
              <hr />
            </div>

            <div className="">
              <h4 className="my-4">Status</h4>

              <div className="">
                <select
                  className=""
                  name="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>

              <button
                className=""
								onClick={() => updateHandler(_id)}
              >
                Update Status
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProcessOrder;
