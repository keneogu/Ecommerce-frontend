import React,{ useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, fetchUsers, resetDeletedUser } from '../features/AdminSlice'
import { Link, useNavigate } from "react-router-dom";
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import Loader from '../components/layout/Loader'
import { toast } from 'react-toastify';

const UsersList = () => {
	const [search, setSearch] = useState("")
	const { users, isLoading, isUserDeleted } = useSelector(state => state.admin)
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchUsers())

		if(isUserDeleted) {
			navigate("/admin/users");
			dispatch(fetchUsers());
			dispatch(resetDeletedUser());
			toast.error("User deleted Successfully", {
				position: "bottom-left",
			});
		}
	},[dispatch, isUserDeleted, navigate])

	const handleDelete = (id) => {
		dispatch(deleteUser(id))
	}
	return (
		<div>
			{isLoading ? <Loader /> 
			: 
			<>
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
									<Link to={`/admin/user/${user._id}`} className='py-1 px-2'>
										<FaPencilAlt />
									</Link>
									<button onClick={() => handleDelete(user._id)} className='p-1 ml-4'><FaTrash /></button>
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