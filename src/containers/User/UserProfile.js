import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Head from "../../components/layout/Head";
import Loader from "../../components/layout/Loader";


const UserProfile = () => {
	const { isAuthenticated, isLoading, user } = useSelector((state) => state.user);

	return (
		<div>
			{isLoading ? <Loader /> : (
				<>
					<Head title={"Profile Page"} />
					<h2>My Profile</h2>
					<div>
						<div>
							<figure>
								<img src={user.user?.avatar} alt={user.user?.name} />
							</figure>
							<Link to="/me/update">Edit Profile</Link>
						</div>

						<div>
							<h4>Full Name</h4>
							<p>{user.user?.name}</p>

							<h4>Email Address</h4>
							<p>{user.user?.email}</p>

							<h4>Joined On</h4>
							<p>{String(user.user?.createdAt).substring(0, 10)}</p>

							{user.user?.role !== 'admin' && <Link to="/orders/me">My Orders</Link>}
							<Link to="/password/update">Change Password</Link>
						</div>
					</div>
				</>
			)}
		</div>
	)
}

export default UserProfile;
