import React from 'react'
import { FaSearch } from "react-icons/fa";

const Search = ({ navigate, setSearchParams, search, setSearch }) => {

	const handleChange = (e) => {
		const newValue = e.target.value
		setSearch(newValue);
		setSearchParams({
			search: e.target.value
		})
	}

	const handleSearch = (e) => {
		e.preventDefault();
		if (search) {
			navigate(`search/${search}`)
			setSearch("");
		} else {
			navigate('/')
		}
	}

	return (
		<form onSubmit={handleSearch}>
			<div className='bg-white border-kenz-100 border-4 rounded-md px-2 py-2 my-3'>
				<input type='text' className='bg-lime-100' onChange={handleChange} value={search || ""} placeholder='Enter Product Name' />
				<button><FaSearch className='text-black w-6 h-6 bg-gray-100' /></button>
			</div>
		</form>
	)
}

export default Search