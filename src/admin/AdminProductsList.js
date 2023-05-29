import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import Loader from '../components/layout/Loader';
import { fetchAdminProducts } from '../features/AdminSlice';
import Head from '../components/layout/Head';

const AdminProductsList = () => {
	const [search, setSearch] = useState("")
	const { products, isLoading } = useSelector(state => state.admin)
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchAdminProducts());
	}, [dispatch])


	return (
		<div>
			{isLoading ? <Loader /> 
			: 
			<>
			<Head title={'Admin product list page'}/>
				<h1>Welcome to the All products page</h1>

				<form>
					<input type="text" onChange={(e) => setSearch(e.target.value)} placeholder='search products by name'/>
					<button>search</button>
				</form>

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
						{products?.filter(item => {
							return search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search);
						}).map(item => (
							<tr key={item._id}>
								<td>{item._id}</td>
								<td>{item.name}</td>
								<td>{item.price}</td>
								<td>{item.stock}</td>
								<td>
									<Link to={`/admin/product/${item._id}`} className='py-1 px-2'>
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

export default AdminProductsList;
