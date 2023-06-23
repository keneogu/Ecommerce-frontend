import React from 'react'

const Footer = () => {
	return (
		<>
			<footer className='flex w-full p-6 mt-6 justify-center bg-slate-950 relative before:content-[" "] before:absolute before:top-2 before:bottom-0 before:left-40 before:bg-slate-700 before:w-6 before:skew-y-[30deg] before:skew-x-[30deg] before:h-inherit before:origin-top after:content-[" "] after:absolute after:top-2 after:bottom-0 after:right-40 after:bg-slate-700 after:w-6 after:-skew-y-[30deg] after:-skew-x-[30deg] after:h-inherit after:origin-top'>
				<p className='text-center text-slate-100 z-10'>Kenz-Shopping Cart @2023, All rights are Reserved by me</p>
			</footer>
		</>
	)
}

export default Footer