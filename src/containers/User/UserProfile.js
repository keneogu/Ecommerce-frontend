import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../../components/layout/Loader";
import { FaArrowAltCircleRight } from "react-icons/fa"

const UserProfile = () => {
  const { isLoading, user } = useSelector((state) => state.user);

  return (
    <div className="container md:mx-auto">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="md:w-full md:mx-auto flex flex-col md:justify-center md:items-center my-16 mx-4">
            <h2 className="my-4 text-slate-700 text-4xl font-bold text-center">My Profile</h2>
            <div>
              <div className="text-center">
                  <img src={user.user?.avatar.url} alt={user.user?.name} className="rounded-full border-2 border-slate-700 mx-auto"/>
								<div className="bg-slate-700 text-white my-6 py-2 text-center">
									<Link to="/me/update" className="text-white">Edit Profile</Link>
								</div>
              </div>

              <div className="my-3">
								<div className="flex flex-col md:flex-row my-3">
									<h4 className="text-slate-700 italic pr-2 font-bold">Full Name:</h4>
                	<p className="text-xl md:text-base">{user.user?.name}</p>
								</div>
                
								<div className="flex flex-col md:flex-row my-3">
									<h4 className="text-slate-700 italic pr-2 font-bold">Email Address:</h4>
                	<p className="text-xl md:text-base">{user.user?.email}</p>
								</div>
                
								<div className="flex flex-col md:flex-row my-3">
									<h4 className="text-slate-700 italic pr-2 font-bold">Joined On:</h4>
                	<p className="text-xl md:text-base">{String(user.user?.createdAt).substring(0, 10)}</p>
								</div>
                
								<div className="flex flex-col my-3">
									{user.user?.role !== "admin" && (
                  <Link to="/orders/me" className="bg-slate-700 text-white p-3">My Orders</Link>
                )}
								<div className="flex text-blue-600 text-lg md:text-base">
									<Link to="/me/password/update" className="mr-1"> Change Password</Link>
									<FaArrowAltCircleRight className="mt-1"/>
								</div>
                
								</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
