import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchProductDetails,
  getSelectedProduct,
} from "../features/ProductSlice";
import { updateProduct } from "../features/AdminSlice";
import Head from "../components/layout/Head";
import { toast } from "react-toastify";

const UpdateProduct = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    desc: "",
    category: "",
    stock: 0,
  });

  const { name, price, desc, category, stock } = formData;
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Electronics",
    "Accessories",
    "Beverages",
    "Food/Fruit",
    "Fashion",
    "Cosmetics",
    "Phones-tablets",
    "Computing",
    "Beauty",
    "Furniture",
    "Home-appliances",
    "Sports",
  ];

  const product = useSelector(getSelectedProduct);
  const { isUpdated } = useSelector((state) => state.admin);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (product && product._id !== id) {
      dispatch(fetchProductDetails(id));
    } else {
      setFormData(() => {
        return {
          name: product.name,
          category: product.category,
          price: product.price,
          desc: product.desc,
          stock: product.stock,
        };
      });
      setOldImages(product.images);
    }

    if (isUpdated) {
      navigate("/admin/products");
      toast.success("Product updated Successfully", {
        position: "bottom-left",
      });
    }
  }, [dispatch, id, navigate, isUpdated, product]);

	const handleChange = (e) => {
		const { name, value } = e.target;

    setFormData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
	}

  return (
    <div>
      <Head title={"Admin Update Product"} />
      <h1>Update Product</h1>
      <form onSubmit={handleSubmit}>
        <h4>Update form</h4>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
						onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="please enter your name"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="price"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter Price
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={price}
						onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="desc"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
            id="desc"
            rows="4"
            name="desc"
            value={desc}
						onChange={handleChange}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Leave a comment..."
          ></textarea>
        </div>
        <div className="mb-6">
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select category
          </label>
          <select
            id="category"
            name="category"
            value={category}
						onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <label
            htmlFor="stock"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter Stock
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={stock}
						onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="">
          <label>Images</label>

          <div className="">
            <input
              type="file"
              name="product_images"
              className=""
              id="customFile"
              onChange={onChange}
              multiple
            />
            <label className="" htmlFor="customFile">
              Choose Images
            </label>
          </div>

          {oldImages &&
            oldImages.map((img) => (
              <img
                key={img}
                src={img.url}
                alt={img.url}
                className="mt-3 mr-2"
                width="55"
                height="52"
              />
            ))}

          {imagesPreview.map((img) => (
            <img
              src={img}
              key={img}
              alt="Images Preview"
              className="mt-3 mr-2"
              width="55"
              height="52"
            />
          ))}
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
