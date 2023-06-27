import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getTotals,
  removeCart,
  decreaseCart,
  clearCart,
  addToCart,
} from "../../features/CartSlice";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cartItems, dispatch]);

  const handleRemoveCart = (cartItem) => {
    dispatch(removeCart(cartItem));
  };

  const handleDecreaseCart = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  };

  const handleAddToCart = (cartItem) => {
    dispatch(addToCart(cartItem));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="container mx-auto my-20">
      <h2 className="text-center mb-3 font-extrabold text-3xl">
        Shopping Cart
      </h2>
      {cartItems.length === 0 ? (
        <div>
          <p>Your cart is currently empty</p>
          <div>
            <Link to="/">
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row md:justify-between">
          <table className="w-full border-collapse table-auto md:mr-12">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Remove</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems?.map((cartItem) => (
                <tr key={cartItem._id}>
                  <td>
                    <div className="flex flex-wrap items-center">
                      <img
                        src={cartItem.image}
                        alt={cartItem.name}
                        className="w-24 h-24"
                      />
                      <div className="ml-3">
                        <Link
                          to={`/product/${cartItem.product}`}
                          className="text-sm"
                        >
                          {cartItem.name.substr(0, 40) + "..."}
                        </Link>
                        <p className="text-xs">
                          {cartItem.desc.substr(0, 60) + "..."}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td>${cartItem.price}</td>

                  <td>
                    <div className="flex">
                      <button
                        disabled={cartItem.quantity === 1}
                        onClick={() => handleDecreaseCart(cartItem)}
                        className={
                          cartItem.quantity === 1
                            ? "text-gray-400"
                            : "text-inherit px-1 border-2 rounded-full mx-1 bg-slate-600 text-white outline-none"
                        }
                      >
                        -
                      </button>
                      <div className="text-2xl">{cartItem.quantity}</div>
                      <button
                        disabled={cartItem.stock === cartItem.quantity}
                        onClick={() => handleAddToCart(cartItem)}
                        className={
                          cartItem.stock === cartItem.quantity
                            ? "text-gray-400"
                            : "text-inherit px-1 border-2 rounded-full mx-1 bg-slate-600 text-white outline-none"
                        }
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>
                    <button
                      className="text-red-500"
                      onClick={() => handleRemoveCart(cartItem)}
                    >
                      Remove
                    </button>
                  </td>
                  <td>
                    <span>
                      ${(cartItem.price * cartItem.quantity).toFixed(2)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="block m-2 md:m-0 md:flex md:justify-end">
            <div>
              <h2 className="w-full bg-slate-700 text-center p-[5px] text-white">
                Ordered Products Summary
              </h2>
              <table className="border-3 solid w-full max-w-[350px]">
                <tr>
                  <td>Total Products</td>
                  <td className="text-right">
                    <h2>{cartItems.length}</h2>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>Subtotal</span>
                  </td>
                  <td className="text-right">
                    <span className="">${cart.cartTotalAmount}</span>
                  </td>
                </tr>
              </table>
              <div className="">
                <p className="text-center text-sm text-slate-500 italic">
                  Taxes and shipping calculated at checkout
                </p>
                <div>
                  <button
                    className="block w-full border-2 m-1 border-slate-700 hover:border-red-400 text-center p-2"
                    onClick={() => handleClearCart()}
                  >
                    Clear
                  </button>
                  <button
                    className="block w-full border-2 m-1 bg-slate-700 hover:bg-slate-600 text-white text-center p-2"
                    onClick={handleCheckout}
                  >
                    Check out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
