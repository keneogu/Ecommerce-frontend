import React, { useRef } from 'react'
import { useDispatch } from "react-redux"
import { FaSearch } from "react-icons/fa";

const Search = ({ navigate, searchItems}) => {
	const nameInput = useRef(null);
	const dispatch = useDispatch();

	const handleSearch = (e) => {
		e.preventDefault();
		let searchInput = nameInput.current.value
		if(searchInput) {
			dispatch(searchItems(searchInput))
			navigate(`search/${searchInput}`)
			nameInput.current.value = ""
			console.log(searchInput)
		}
	}


	return (
		<form onSubmit={handleSearch}>
			<div className='bg-white border-kenz-100 border-4 rounded-md px-2 py-2 my-3'>
				<input type='text' className='bg-lime-100' ref={nameInput} placeholder='Enter Product Name' />
				<button><FaSearch className='text-black w-6 h-6 bg-gray-100' /></button>
			</div>
		</form>
	)
}

export default Search;
