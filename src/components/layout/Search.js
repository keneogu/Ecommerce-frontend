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
		<form onSubmit={handleSearch} className='md:my-4'>
			<div className='xs:ml-2 flex bg-white w-full outline-1 rounded-xl py-1'>
				<input type='text' ref={nameInput} placeholder='Enter Product Name...' className='p-1 md:mx-2 bg-stone-200 outline-0 rounded-md placeholder:italic placeholder:font-thin placeholder:text-sm' />
				<button><FaSearch className='text-slate-200 w-6 h-6' /></button>
			</div>
		</form>
	)
}

export default Search;
