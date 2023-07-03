import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom";
import Loader from '../../components/layout/Loader';
import { fetchOrderDetails } from '../../features/OrderSlice';
import Head from '../../components/layout/Head';

const OrderDetails = () => {
	const { id } = useParams();
	const { isLoading, orderDetail } = useSelector(state => state.order);
	console.log(orderDetail)

	const {shippingInfo, orderedItems, paymentInfo, user, totalPrice, orderStatus} = orderDetail.cart;
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchOrderDetails(id))
	},[dispatch,id]);

	const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`

	const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false

	return (
		<div>
			<Head title={'order Details'} />

			{isLoading ? <Loader /> : (
				<div>
					<div>
						<h1>{orderDetail.cart._id}</h1>
						<h4>The Shipping Info:</h4>
						<p><b>Name:</b>{user && user.name}</p>
						<p><b>Phone:</b>{shippingInfo && shippingInfo.phoneNo}</p>
						<p><b>Address:</b>{shippingDetails}</p>
						<p><b>Amount:</b>{totalPrice}</p>

						<hr />

						<h4>Payment</h4>
						<p className={isPaid ? "text-green-400" : "text-red-500"}><b>{isPaid ? "PAID" : "NOT PAID"}</b></p>

						<h4>Order Items</h4>
						<p className={orderDetail.orderStatus && String(orderDetail.orderStatus).includes('Delivered') ? 'text-green-500' : 'text-red-500'}><b>{orderStatus}</b></p>
						<hr />

						<div>
							{orderedItems && orderedItems.map(item => (
								<div key={item.product} className="">
									<div className="">
											<img src={item.image} alt={item.name} height="45" width="65" />
									</div>

									<div className="">
											<Link to={`/product/${item.product}`}>{item.name}</Link>
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
					</div>
				</div>
			)}
		</div>
	)
}

export default OrderDetails;
