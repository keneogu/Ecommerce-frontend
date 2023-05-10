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
    <div className="flex justify-between text-white bg-kenz-400 h-14 items-center px-4">
      <div className="link">
        <Link to="/">
          <h3>KenzShop</h3>
        </Link>
      </div>

      <div className="bg-white border-kenz-100 border-4 rounded-md px-2 py-2 my-3">
        <Search navigate={navigate} searchItems={searchItems} />
      </div>

      <nav className="flex flex-row items-center px-2">
        {user ? (
          <div className="relative">
            <button
              className="flex items-center text-sm font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:mr-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white"
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
                  ? "z-10 mt-2 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                  : "hidden"
              }
              onMouseLeave={() => setIsOpen(false)}
            >
              <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div className="truncate">{user && user.user?.email}</div>
              </div>
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                {user && user.user?.role !== "admin" ? (
                  <li>
                    <Link
                      to="/order/me"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Orders
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Dashboard
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    to="/me"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
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
            <p>
              <FaShoppingCart className="text-orange-700" />
            </p>
            <span>
              <span>{cartTotalQuantity}</span>
            </span>
          </div>
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
