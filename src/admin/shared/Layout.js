import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar'

const Layout = () => {
	return (
		<div className='grid md:grid-cols-6'>
			<div className='bg-green-500 md:col-span-1'>
				<Sidebar />
			</div>
			<div className='bg-red-500 md:col-span-5'>
				<div>header</div>
				<div>{<Outlet />}</div>
			</div>
		</div>
	)
}

export default Layout