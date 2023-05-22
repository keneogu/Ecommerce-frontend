import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { MDBDataTable } from 'mdbreact';
import Loader from '../../components/layout/Loader';
import { myOrders } from '../../features/OrderSlice';
import Head from '../../components/layout/Head';
import { FaEye } from 'react-icons/fa';

const Orders = () => {
	const { orders } = useSelector(state => state.order);
	const { isLoading } = useSelector(state => state.order)
	const dispatch = useDispatch();

	useEffect(() => {
		if(orders.cart.length >= 0) {
			dispatch(myOrders())
		}
	}, [dispatch])

	const setOrders = () => {
		const data = {
			columns: [
				{
					label: 'Order Id',
					field: 'id',
					sort: 'asc'
				},
				{
					label: 'Num of items',
					field: 'numOfItems',
					sort: 'asc'
				},
				{
					label: 'Amount',
					field: 'amount',
					sort: 'asc'
				},
				{
					label: 'Status',
					field: 'status',
					sort: 'asc'
				},
				{
					label: 'Actions',
					field: 'actions',
					sort: 'asc'
				},
			],
			rows: []
		}
			orders.cart?.forEach(order => {
				data.rows.push({
					id: order._id,
					numOfItems: order.orderedItems.length,
					amount: `$${order.totalPrice}`,
					status: order.orderStatus && String(order.orderStatus).includes('Delivered') ? <p className='text-green'>{order.orderStatus}</p> : <p className='text-red'>{order.orderStatus}</p>,
					actions: <Link to={`/order/${order._id}`}>
						<FaEye />
					</Link>
				})
			})
		return data;
	}
	
	return (
		<div>
			<Head title={'Best Online Shoping platform'} />

			<h2 className='mt-4'>My Orders</h2>
			{isLoading ? <Loader /> : (
				<MDBDataTable data={setOrders()} className="px-3 border" bordered striped hover />
			)}
		</div>
	)
}

export default Orders;
