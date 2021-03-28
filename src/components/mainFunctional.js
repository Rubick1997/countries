import React, { useState, useEffect } from "react";
import countries from "../APIs/countries";
import CountryCard from "./CountryCard";
import "./mainStyle.css";

function MainFunctional() {
	const [data, setData] = useState([]);
	const [search, setSearch] = useState("");
	const [foundData, setFoundData] = useState([]);

	useEffect(() => {
		countries.getCountries().then((response) => {
			setData(response.data);
		});
	}, []);

	// countries.getCountries().then((response) => {
	//   console.log("got countries", response);
	// });

	const getListBack = (e) => {
		e.preventDefault();
		countries.getCountries().then((response) => {
			setData(response.data);
		});
	};

	const capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	const searchCountry = (e) => {
		e.preventDefault();
		capitalizeFirstLetter(search);
		let searchResults = [];
		data.map((item) => {
			if (item.name === capitalizeFirstLetter(search)) {
				searchResults.push(item);
			}
		});
		if (searchResults.length > 0) {
			setFoundData(searchResults);
		} else {
			alert("country does not exist ");
		}
	};

	const deleteCountry = (country) => {
		let newCountries = data.filter((item) => {
			return item !== country;
		});
		setData(newCountries);
		setFoundData([]);
	};

	return (
		<div className='container'>
			<h1 className='text-center'>Country Search</h1>
			<div className='search'>
				<form onSubmit={searchCountry}>
					<input
						className='input form-control '
						type='search'
						value={search}
						placeholder='type the country name'
						autoComplete='off'
						onChange={(e) => {
							setSearch(e.target.value);
						}}
					/>
					<button className='btn btn-primary' type='submit' disabled={!search}>
						Search
					</button>
				</form>
			</div>
			<button
				className='btn btn-success'
				type='submit'
				onClick={getListBack}
				disabled={search}>
				Default state
			</button>
			{search.length === 0 ? (
				<div>
					{data.map((item) => (
						<CountryCard item={item} key={item.name} onClick={deleteCountry} />
					))}
				</div>
			) : (
				<div>
					{foundData.map((item) => (
						<CountryCard
							item={item}
							key={item.name}
							onClick={deleteCountry}
							note='last search results'
						/>
					))}
				</div>
			)}
		</div>
	);
}

export default MainFunctional;
