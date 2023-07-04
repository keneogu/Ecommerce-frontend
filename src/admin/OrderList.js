import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import Loader from '../components/layout/Loader';
import { adminFetchOrders, deleteOrder, resetDeletedOrder } from '../features/AdminSlice';
import { toast } from 'react-toastify';

const OrderList = () => {
	const { orders, isLoading, isOrderDeleted } = useSelector(state => state.admin)
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(adminFetchOrders());
		
		if(isOrderDeleted) {
			navigate("/admin/orders");
			dispatch(adminFetchOrders());
			dispatch(resetDeletedOrder());
			toast.error("Order deleted Successfully", {
				position: "bottom-left",
			});
		}
	},[dispatch, isOrderDeleted, navigate])

	const handleDelete = (id) => {
		dispatch(deleteOrder(id));
	}

	return (
		<div>
			{isLoading ? <Loader /> 
			: 
			<>
				<h1>Welcome to the All products page</h1>

				<table className="table-auto">
					<thead>
						<tr>
							<th>ID</th>
							<th>NumofItems</th>
							<th>Amount</th>
							<th>Status</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{orders.map(order => (
							<tr key={order._id}>
								<td>{order._id}</td>
								<td>{order.orderedItems.length}</td>
								<td>${order.totalPrice}</td>
								<td>{order.orderStatus && String(order.orderStatus).includes('Delivered')
                    ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                    : <p style={{ color: 'red' }}>{order.orderStatus}</p>}</td>
								<td>
									<Link to={`/admin/order/${order._id}`} className='py-1 px-2'>
										<FaPencilAlt />
									</Link>
									<button onClick={() => handleDelete(order._id)} className='p-1 ml-4'><FaTrash /></button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</>
			}
		</div>
	)
}

export default OrderList