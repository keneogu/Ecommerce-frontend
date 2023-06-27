import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { searchItems } from "../features/ProductSlice";
import { logout } from "../features/UserSlice";
import { FaShoppingCart } from "react-icons/fa";
import Search from "./layout/Search";

const Navbar = () => {
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const { user, isLoading } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logout());
	}

  return (
    <div className="flex justify-between bg-zinc-400 h-9 items-center px-4">
      <div className="link">
        <Link to="/">
          <h3 className="lg:text-3xl uppercase italic py-3 font-bold">KenzShop</h3>
        </Link>
      </div>

        <Search navigate={navigate} searchItems={searchItems} />

      <nav className="flex flex-row items-center px-2">
        {user ? (
          <div className="relative">
            <button
              className="flex items-center text-sm font-medium text-gray-900 rounded-full outline-0 hover:text-slate-200 md:mr-2 focus:ring-4 focus:ring-gray-100"
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              onMouseEnter={() => setIsOpen(!isOpen)}
            >
              <img
                className="w-8 h-8 mr-2 rounded-full"
                src={user.user?.avatar && user.user?.avatar.url}
                alt={user && user.user?.name}
              />
              <p>{user && user.user?.name.split(" ")[0]}</p>
              <svg
                className="w-4 h-4 mx-1.5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <div
              className={
                isOpen
                  ? "z-10 mt-2 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-36"
                  : "hidden"
              }
              onMouseLeave={() => setIsOpen(false)}
            >
              <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div className="truncate">{user && user.user?.email}</div>
              </div>
              <ul className="py-2 text-sm text-gray-700">
                {user && user.user?.role === "admin"  && (
                  <li>
                    <Link
                      to="/admin"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                  </li>
                )}
                <li>
                    <Link
                      to="/orders/me"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Orders
                    </Link>
                  </li>
                <li>
                  <Link
                    to="/me"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                </li>
              </ul>
              <div className="py-2">
                <Link
                  to="/"
                  className="block px-4 py-2 text-sm text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
									onClick={handleLogout}
								>
                  Sign out
                </Link>
              </div>
            </div>
          </div>
        ) : (
          !isLoading && (
            <Link to="/login">
              <p>Login</p>
            </Link>
          )
        )}
        <Link to="/cart">
          <div className="flex">
            <p className="mt-1">
              <FaShoppingCart className="text-orange-700 font-bold" />
            </p>
            <span className="text-xs">
              <span className="bg-slate-50 rounded-full">{cartTotalQuantity}</span>
            </span>
          </div>
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
