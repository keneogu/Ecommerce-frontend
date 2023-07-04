import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/ProductSlice";
import ProductCard from "./ProductCard";
import Loader from "../../components/layout/Loader";
import Pagination from "react-js-pagination";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const Home = () => {
  const search = useSelector((state) => state.products.search);
  const { products, productCount, perPage, filteredProductsCount } =
    useSelector((state) => state.products.products);
  const { isLoading } = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);

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

  const slideImages = [
    {
      url: "https://res.cloudinary.com/keneogu/image/upload/v1687439021/Ecommerce/women-removebg-preview_v7dtlj.png",
      caption: "We offer a quality and an amazing shoes at an affordable price",
    },
    {
      url: "https://res.cloudinary.com/keneogu/image/upload/v1687447110/Ecommerce/mens_clothing_Photo_odffej-removebg-preview_o2j3ul.png",
      caption:
        "Get your quality designed t-shirt and office wears from the best online shop",
    },
    {
      url: "https://res.cloudinary.com/keneogu/image/upload/v1687447469/Ecommerce/lapis-removebg-preview_lw76zd.png",
      caption:
        "With a quality laptop accesories you can get yourself productive in no time",
    },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchProducts({
        search: search.replace(/^\s+|\s+$/gm, ""),
        currentPage: currentPage,
        price: price,
        category: category,
        ratings: rating,
      })
    );
  }, [dispatch, search, currentPage, price, category, rating]);

  function setCurrentPageNum(pageNumber) {
    setCurrentPage(pageNumber);
  }

  let count = productCount;

  if (search) {
    count = filteredProductsCount;
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="w-full">
            <div
              className="w-full h-72 md:h-[500px] relative bg-cover bg-center bg-no-repeat overflow-hidden"
              style={{ backgroundImage: "url('images/shoe.jpg')" }}
            >
              <div
                className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
              >
                <Slide>
                  {slideImages.map((slideImage, index) => (
                    <div key={index} className="mt-4">
                      <div className="flex md:justify-between content-end h-full w-full text-white md:mb-8 md:px-12">
                        <div className="md:mt-40 text-center">
                          <h3 className="lg:text-3xl uppercase italic py-3 font-semibold backdrop-brightness-200 shadow-md shadow-slate-400">
                            Kenz Shop
                          </h3>
                          <p className="md:text-sm">{slideImage.caption}</p>
                        </div>
                        <div className="">
                          <img
                            src={slideImage.url}
                            alt="slideImage pics"
                            className="w-full cover-full"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </Slide>
              </div>
            </div>
            <div className="mt-8">
              <h4 className="text-gray-400 ml-6 text-xl font-bold capitalize mb-4">
                Products
              </h4>
              <div className="container mx-auto">
                {search ? (
                  <>
                    <div>
                      <div>
                        <Range
                          marks={{
                            1: `$1`,
                            1000: `$1000`,
                          }}
                          min={1}
                          max={1000}
                          defaultValue={[1, 1000]}
                          tipFormatter={(value) => `$${value}`}
                          tipProps={{
                            placement: "top",
                            visible: true,
                          }}
                          value={price}
                          onChange={(price) => setPrice(price)}
                        />

                        <hr />

                        <div className="mt-5">
                          <h4>Categories</h4>

                          <ul className="pl-0">
                            {categories.map((category) => (
                              <li
                                key={category}
                                style={{
                                  cursor: "pointer",
                                  listStyleType: "none",
                                }}
                                onClick={() => setCategory(category)}
                              >
                                {category}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <hr />

                        <div className="mt-5">
                          <h4>Ratings</h4>

                          <ul className="pl-0">
                            {[5, 4, 3, 2, 1].map((star) => (
                              <li
                                key={star}
                                style={{
                                  cursor: "pointer",
                                  listStyleType: "none",
                                }}
                                onClick={() => setRating(star)}
                              >
                                <div className="rating-outer">
                                  <div
                                    className="rating-inner"
                                    style={{
                                      width: `${star * 20}%`,
                                    }}
                                  ></div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <div className="grid grid-cols-4">
                        {products?.map((product) => (
                          <ProductCard key={product._id} product={product} />
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid mx-5 gap-y-4 gap-4 md:grid-cols-3 lg:grid-cols-4 items-stretch">
                      {products?.map((product) => (
                        <ProductCard key={product._id} product={product} />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {perPage <= count && (
                <div className="flex justify-center mt-5">
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={perPage}
                    totalItemsCount={count}
                    pageRangeDisplayed={5}
                    onChange={setCurrentPageNum}
                  />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
