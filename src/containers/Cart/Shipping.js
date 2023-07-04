import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { countries } from "countries-list";
import { getShippingInfo } from "../../features/CartSlice";
import Checkout from "./Checkout";

const Shipping = () => {
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const [country, setCountry] = useState(shippingInfo.country);
  const navigate = useNavigate();

  const countryList = Object.values(countries);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getShippingInfo({ address, city, postalCode, phoneNo, country }));
    navigate("/order/confirm");
  };

  return (
    <div>
      <Checkout shipping />
      <div className="md:w-full md:mx-auto flex flex-col md:justify-center md:items-center my-16 mx-4">
        <form onSubmit={handleSubmit} className="flex flex-col p-4">
          <h1 className="my-4 text-slate-700 text-4xl font-bold text-center">
            Shipping Info
          </h1>
          <div>
            <label
              htmlFor="address"
              className="after:content-['*'] after:ml-0.5 block"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              className="h-8 border-2 border-slate-700 rounded-md outline-0 px-2 w-full"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="after:content-['*'] after:ml-0.5 block"
            >
              Phone No:
            </label>
            <input
              type="text"
              id="phone"
              className="h-8 border-2 border-slate-700 rounded-md outline-0 px-2 w-full"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="city"
              className="after:content-['*'] after:ml-0.5 block"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              className="h-8 border-2 border-slate-700 rounded-md outline-0 px-2 w-full"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="country"
              className="after:content-['*'] after:ml-0.5 block"
            >
              Country
            </label>
            <select
              name=""
              id="country"
              className="h-8 border-2 border-slate-700 rounded-md px-2 w-full"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            >
              <option value="">USA</option>
              {countryList.map((country) => (
                <option key={country.name} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="postal"
              className="after:content-['*'] after:ml-0.5 block"
            >
              Postal code:
            </label>
            <input
              type="text"
              id="postal"
              className="h-8 border-2 border-slate-700 rounded-md px-2 w-full"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </div>

          <hr />

          <button
            type="submit"
            className="bg-slate-800 text-white mx-5 my-4 p-3 rounded-md font-bold hover:bg-slate-700"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
