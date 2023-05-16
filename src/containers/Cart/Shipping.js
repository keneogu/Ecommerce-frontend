import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { countries } from "countries-list";
import Head from "../../components/layout/Head";
import { getShippingInfo } from "../../features/CartSlice";

const Shipping = () => {
	const {shippingInfo} = useSelector(state => state.cart);

	const [address, setAddress] = useState(shippingInfo.address);
	const [city, setCity] = useState(shippingInfo.city);
	const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
	const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
	const [country, setCountry] = useState(shippingInfo.country);
	const navigate = useNavigate();

	const countryList = Object.values(countries);

	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch(getShippingInfo({address, city, postalCode, phoneNo, country}))
		navigate("/confirm")
	}

	return (
		<div>
			 <Head title={"Shipping Info"} />
			<div>
				<form onSubmit={handleSubmit}>
					<h1>Shipping Info</h1>
					<div>
						<label htmlFor="address">Address</label>
						<input type="text" id='address' value={address} onChange={(e) => setAddress(e.target.value)} required />
					</div>
					<div>
						<label htmlFor="phone">Phone No:</label>
						<input type="text" id='phone' value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} required />
					</div>
					<div>
						<label htmlFor="city">City</label>
						<input type="text" id='city' value={city} onChange={(e) => setCity(e.target.value)} required />
					</div>
					<div>
						<label htmlFor="country">Country</label>
						<select name="" id="country" value={country} onChange={(e) => setCountry(e.target.value)} required>
							<option value="">USA</option>
							{countryList.map(country => (
								<option key={country.name} value={country.name}>{country.name}</option>
							))}
						</select>
					</div>
					<div>
						<label htmlFor="postal">Postal code:</label>
						<input type="text" id='postal' value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
					</div>

					<hr />

					<button type='submit'>Continue</button>
				</form>
			</div>
		</div>
	)
}

export default Shipping