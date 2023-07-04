import React from 'react';
import { FaProductHunt, FaUserAlt, FaTruckMoving } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Dashboard = () => {
	return (
		<>
			<div className='grid grid-col-12 md:grid-col-3 sm:grid-col-6 mx-16'>

				<div className='col-span-12 my-11'>
					<div className="flex flex-column bg-slate-800 text-white p-4 shadow-lg rounded justify-center">
						<div className='px-2'>Total Amount:</div>
						<div className='italic font-bold'>$12345</div>
					</div>
				</div>


				<div className="col-span-12 sm:col-span-6 md:col-span-4">
        	<div className="flex flex-row bg-white shadow-sm rounded p-4">
						<div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-slate-500 text-slate-800">
							<FaProductHunt />
						</div>
						<div className="flex flex-col flex-grow ml-4">
							<div className="text-lg text-slate-900">
								<h3 className='font-bold'>Products</h3>
								<h4>234</h4>
							</div>
							<div className="font-bold text-sm">
								<Link to="/admin/products">
								  View More
								</Link>
							</div>
						</div>
        	</div>
      	</div>
				
				<div className="col-span-12 sm:col-span-6 md:col-span-4">
        	<div className="flex flex-row bg-white shadow-sm rounded p-4">
						<div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-slate-500 text-slate-800">
							<FaTruckMoving />
						</div>
						<div className="flex flex-col flex-grow ml-4">
							<div className="text-lg text-slate-900">
								<h3 className='font-bold'>Orders</h3>
								<h4>234</h4>
							</div>
							<div className="font-bold text-sm">
							<Link to="/admin/orders">
								  View More
								</Link>
							</div>
						</div>
        	</div>
      	</div>

				<div className="col-span-12 sm:col-span-6 md:col-span-4">
        	<div className="flex flex-row bg-white shadow-sm rounded p-4">
						<div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-slate-500 text-slate-800">
							<FaUserAlt />
						</div>
						<div className="flex flex-col flex-grow ml-4">
							<div className="text-lg text-slate-900">
								<h3 className='font-bold'>Users</h3>
								<h4>234</h4>
							</div>
							<div className="font-bold text-sm">
							<Link to="/admin/users">
								  View More
								</Link>
							</div>
						</div>
        	</div>
      	</div>

			</div>
		</>
	)
}

export default Dashboard;
