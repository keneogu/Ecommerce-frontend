import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import Loader from '../components/layout/Loader';
import { adminFetchOrders } from '../features/AdminSlice';
import Head from '../components/layout/Head';

const OrderList = () => {
	const { orders, isLoading } = useSelector(state => state.admin)

	return (
		<div>
			{isLoading ? <Loader /> 
			: 
			<>
			<Head title={'Admin product orders page'}/>
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
									<button className='p-1 ml-4'><FaTrash /></button>
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