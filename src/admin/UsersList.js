import React,{ useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchUsers } from '../features/AdminSlice'

const UsersList = () => {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(fetchUsers())
	},[dispatch])
	return (
		<div>
			Im the new user
		</div>
	)
}

export default UsersList