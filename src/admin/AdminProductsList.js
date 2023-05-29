import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom";
import { FaPencilAlt } from 'react-icons/fa';
import Loader from '../components/layout/Loader';
import { fetchAdminProducts } from '../features/ProductSlice';
import Head from '../components/layout/Head';

const AdminProductsList = () => {
	const { product } = useSelector(state => state.products)
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchAdminProducts());
	}, [dispatch])

	return (
		<div>
			<h1>Welcome to the All products page</h1>
			<table className="table-auto">
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Price</th>
						<th>Stock</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{product?.map(item => (
						<tr key={item._id}>
							<td>{item._id}</td>
							<td>{item.name}</td>
							<td>{item.price}</td>
							<td>{item.stock}</td>
							<td>
								<Link to={`/admin/product/${item._id}`} className='py-1 px-2'>
									<FaPencilAlt />
								</Link>
								<button className='p-1 ml-1'>delete</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default AdminProductsList;
