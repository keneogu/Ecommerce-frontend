import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserDetails, getSelectedUser, resetUpdateUser, updateUser } from "../features/AdminSlice";
import Head from "../components/layout/Head";
import { toast } from "react-toastify";

const UpdateUser = () => {
	const { id } = useParams();


  const [formData, setFormData] = useState({
    name: "",
    email: "",
		role: ""
  });

  const { name, email, role } = formData;

	const user = useSelector(getSelectedUser);
  const { updated } = useSelector((state) => state.admin);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (user && user._id !== id) {
      dispatch(fetchUserDetails(id))
    } else {
      setFormData(() => {
        return {
          name: user.name,
          email: user.email,
          role: user.role
        };
      });
    }

		if (updated) {
      navigate("/admin/users");
      toast.success("User updated Successfully", {
        position: "bottom-left",
      });
			dispatch(resetUpdateUser());
    }
		
	},[dispatch, id, user, updated, navigate])
	
	const handleChange = (e) => {
		const { name, value } = e.target;

    setFormData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
	}

	const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.set("name", name);
    data.set("email", email);
    data.set("role", role);

    for (var pair of data.entries()) {
      console.log(pair[0] + " - " + pair[1]);
    }
		
    dispatch(updateUser({id: user._id, userData: data}));
  };

	return (
		<div>
			<Head title={"update User"} />
      <h1>Update User</h1>
      <form onSubmit={handleSubmit}>
        <h4>Update User form</h4>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
						onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="please enter name..."
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
						onChange={handleChange}
						placeholder="please enter email..."
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
				</div>
				<div className="mb-6">
				<label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select Role
          </label>
          <select
            id="role"
            name="role"
            value={role}
						onChange={handleChange}
						placeholder="select role..."
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
						<option value=""></option>
						<option value="user">user</option>
						<option value="admin">admin</option>
          </select>
				</div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
		</div>
	)
}

export default UpdateUser