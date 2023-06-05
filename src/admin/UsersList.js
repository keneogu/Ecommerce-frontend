import React,{ useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../features/AdminSlice'
import { Link } from "react-router-dom";
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import Loader from '../components/layout/Loader'
import Head from '../components/layout/Head';

const UsersList = () => {
	const [search, setSearch] = useState("")
	const { users, isLoading } = useSelector(state => state.admin)
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchUsers())
	},[dispatch])
	return (
		<div>
			{isLoading ? <Loader /> 
			: 
			<>
			<Head title={'Users list page'}/>
				<h1>Welcome to the All Users page</h1>

				<form>
					<input type="text" onChange={(e) => setSearch(e.target.value)} className='border border-secondary rounded-md w-full' placeholder='search Users by name'/>
				</form>

				<table className="table-auto">
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Email</th>
							<th>Role</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{users?.filter(user => {
							return search.toLowerCase() === '' ? user : user.name.toLowerCase().includes(search);
						}).map(user => (
							<tr key={user._id}>
								<td>{user._id}</td>
								<td>{user.name}</td>
								<td>{user.email}</td>
								<td>{user.role}</td>
								<td>
									<Link to={`/admin/product/${user._id}`} className='py-1 px-2'>
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

export default UsersList