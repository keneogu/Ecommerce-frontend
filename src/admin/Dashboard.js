import React from 'react';
import { FaProductHunt, FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
// import AdminProductsList from './AdminProductsList';

const Dashboard = () => {
	return (
		<div className="">
			<h1>Dashboard</h1>
			<div className='grid grid-col-12 md:grid-col-3 sm:grid-col-6'>

				<div className='col-span-12'>
					<div className="flex flex-column bg-blue-500 shadow-lg rounded text-center p-4">
						<div>Total Amount</div>
						<div>$12345</div>
					</div>
				</div>


				<div className="col-span-12 sm:col-span-6 md:col-span-3">
        	<div className="flex flex-row bg-white shadow-sm rounded p-4">
						<div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-blue-100 text-blue-500">
							<FaProductHunt />
						</div>
						<div className="flex flex-col flex-grow ml-4">
							<div className="text-lg text-gray-500">
								<h3>Products</h3>
								<h4>234</h4>
							</div>
							<div className="font-bold text-sm">
								<Link to="/products/">
								  View More
								</Link>
							</div>
						</div>
        	</div>
      	</div>
				
				<div className="col-span-12 sm:col-span-6 md:col-span-3">
        	<div className="flex flex-row bg-white shadow-sm rounded p-4">
						<div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-blue-100 text-blue-500">
							<FaProductHunt />
						</div>
						<div className="flex flex-col flex-grow ml-4">
							<div className="text-lg text-gray-500">
								<h3>Orders</h3>
								<h4>234</h4>
							</div>
							<div className="font-bold text-sm">View More</div>
						</div>
        	</div>
      	</div>

				<div className="col-span-12 sm:col-span-6 md:col-span-3">
        	<div className="flex flex-row bg-white shadow-sm rounded p-4">
						<div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-blue-100 text-blue-500">
							<FaUserAlt />
						</div>
						<div className="flex flex-col flex-grow ml-4">
							<div className="text-lg text-gray-500">
								<h3>Users</h3>
								<h4>234</h4>
							</div>
							<div className="font-bold text-sm">View More</div>
						</div>
        	</div>
      	</div>

				<div className="col-span-12 sm:col-span-6 md:col-span-3">
        	<div className="flex flex-row bg-white shadow-sm rounded p-4">
						<div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-blue-100 text-blue-500">
							<FaProductHunt />
						</div>
						<div className="flex flex-col flex-grow ml-4">
							<div className="text-lg text-gray-500">
								<h3>Out Of Stock</h3>
								<h4>234</h4>
							</div>
							<div className="font-bold text-sm">View More</div>
						</div>
        	</div>
      	</div>
			</div>
		</div>
	)
}

export default Dashboard;
