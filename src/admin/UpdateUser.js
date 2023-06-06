import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserDetails, getSelectedUser } from "../features/AdminSlice";
// import Head from "../components/layout/Head";
// import { toast } from "react-toastify";

const UpdateUser = () => {
	const { id } = useParams();

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchUserDetails(id))
	},[dispatch, id])
	
	return (
		<div>
			
		</div>
	)
}

export default UpdateUser