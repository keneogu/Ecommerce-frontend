import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../../components/layout/Loader";
import { myOrders } from "../../features/OrderSlice";
import { fetchOrderDetails } from "../../features/OrderSlice";
import { FaEye } from "react-icons/fa";

const Orders = () => {
  const { isLoading, order } = useSelector((state) => state.order);

  const dispatch = useDispatch();

  useEffect(() => {
    if (order.cart > 0) {
      dispatch(myOrders());
    }
  }, [dispatch, order.cart]);

  return (
    <div className="container mx-auto">
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <h2 className="m-5 font-bold text-2xl">My Orders</h2>
          <table className="md:w-5/6 mx-auto border-collapse table-auto md:mr-12">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>NumofItems</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {order.cart?.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.orderedItems.length}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.orderStatus &&
                    String(order.orderStatus).includes("Delivered") ? (
                      <p style={{ color: "green" }}>{order.orderStatus}</p>
                    ) : (
                      <p style={{ color: "red" }}>{order.orderStatus}</p>
                    )}
                  </td>
                  <td>
                    <Link onClick={() => dispatch(fetchOrderDetails(order._id))} to={`/order/${order._id}`} className="py-1 px-2">
                      <FaEye />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
