import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProducts } from "../features/AdminSlice";
import Head from "../components/layout/Head";
import { toast } from "react-toastify";

const NewProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    desc: "",
    category: "",
    stock: 0,
  });

  const { name, price, desc, category, stock } = formData;
  const [images, setImages] = useState([]);
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { success } = useSelector((state) => state.admin);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFormData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

	const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.set("name", name);
    data.set("price", price);
    data.set("desc", desc);
    data.set("category", category);
    data.set("stock", stock);

    images.forEach((image) => {
      data.append("images", image);
    });

    for (var pair of data.entries()) {
      console.log(pair[0] + " - " + pair[1]);
    }

    if ( name && price && desc && category && stock) {
      try {
         dispatch(createProducts(data));
         
          if(success) {
            navigate("/admin/products");
            toast.success("Product created Successfully", {
              position: "bottom-left",
            });
          }

        setFormData(() => {
          return {
            name: "",
            category: "",
            image: "",
            price: "",
            desc: "",
            stock: 0,
          };
        });
      } catch (err) {
        console.error("failed to save the Product", err)
      }
    }
  };

  return (
    <div>
      <Head title={"Create new product"} />
      <div>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="flex flex-col"
        >
          <h1>Create Product</h1>
          <div className="">
            <label htmlFor="name_field">Name</label>
            <input
              type="text"
              id="name_field"
              className="form-control"
							name="name"
              value={name}
              onChange={handleOnChange}
            />
          </div>
          <div className="">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              id="price"
              className="form-control"
							name="price"
              value={price}
              onChange={handleOnChange}
            />
          </div>
          <div className="">
            <label htmlFor="desc">Description</label>
            <textarea
              className="form-control"
              id="desc"
              rows="8"
							name="desc"
              value={desc}
              onChange={handleOnChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              className="form-control"
              id="category"
							name="category"
              value={category}
              onChange={handleOnChange}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="">
            <label htmlFor="stock">Stock</label>
            <input
              type="number"
              id="stock"
              className="form-control"
							name="stock"
              value={stock}
              onChange={handleOnChange}
            />
          </div>
          <div className="form-group">
            <label>Images</label>

            <div className="">
              <input
                type="file"
                name="product_images"
                className=""
                id="customFile"
								accept="image/*"
                onChange={onChange}
                multiple
              />
              <label className="custom-file-label" htmlFor="customFile">
                Choose Images
              </label>
            </div>

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
            className="py-3 bg-kenz-400 text-white cursor-pointer"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewProduct;
