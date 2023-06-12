import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const prod = action.payload;
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === prod._id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity += 1;
        toast.info("increased product quantity", {
          position: "bottom-left",
        });
      } else {
        const mainProduct = {
          ...prod,
          image: prod.images[0].url,
          product: prod._id,
          quantity: 1,
        };

        state.cartItems.push(mainProduct);
        toast.success("new product added to cart", {
          position: "bottom-left",
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeCart(state, action) {
      const cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      state.cartItems = cartItems;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

      toast.error(`${action.payload.name} removed from cart`, {
        position: "bottom-left",
      });
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem._id === action.payload._id
      );
      if (state.cartItems[itemIndex].quantity > 1) {
        state.cartItems[itemIndex].quantity -= 1;
        toast.info(`Decreased ${action.payload.name} cart quantity`, {
          position: "bottom-left",
        });
      } else if (state.cartItems[itemIndex].quantity === 1) {
        const cartItems = state.cartItems.filter(
          (item) => item.product !== action.payload.product
        );
        state.cartItems = cartItems;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

        toast.error(`${action.payload.name} removed from cart`, {
          position: "bottom-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart(state, action) {
      state.cartItems = [];
      toast.error("cart cleared", {
        position: "bottom-left",
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    getTotals(state, action) {
      let { total, quantities } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, quantity } = cartItem;
          const itemTotal = price * quantity;

          cartTotal.total += itemTotal;
          cartTotal.quantities += quantity;
          return cartTotal;
        },
        {
          total: 0,
          quantities: 0,
        }
      );
      state.cartTotalQuantity = quantities;
      state.cartTotalAmount = total;
    },
    getShippingInfo(state, action) {
      const shippingInfo = action.payload;
      state.shippingInfo = shippingInfo;
      localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo));

      toast.error("Product shipped", {
        position: "bottom-left",
      });
    },
  },
});

export const {
  addToCart,
  removeCart,
  decreaseCart,
  clearCart,
  getTotals,
  getShippingInfo,
} = cartSlice.actions;
export default cartSlice.reducer;
