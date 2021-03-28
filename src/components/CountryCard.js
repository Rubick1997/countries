import React from "react";
import "./CountryCard.css";

const CountryCard = ({ item, onClick, note }) => {
	const { languages } = item;
	const { population } = item


	return (
		<div className='container' id='countryContainer'>
			<div className='card' id='countryCard'>
				<div className='body'>
					<div className='row' key={item.name}>
						<div className='col col-md-5 col-lg-3 text-center'>
							<img id='flag' src={item.flag} alt={item.name + "flag"} />
							<div>{note}</div>
						</div>
						<div className='col  col-md-7 col-lg-9'>
							<h5 className='card-title'>{item.name} </h5>
							<h6 className='card-subtitle mb-2 text-muted'>
								Capital:{item.capital}
							</h6>
							<h6 className='card-subtitle mb-2 text-muted'>
								Languages:
								{languages.map(
									(item, index) => (index ? ", " : "") + item.name
								)}
							</h6>
							<p className='card-text '>
								{item.name}, is a country situated in the {item.region} (
								{item.subregion} subregion) with the population of{" "}
								{population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
								people. Person from this country would be called {item.demonym}.
							</p>
							<button
								type='button'
								className='btn btn-danger'
								onClick={() => {
									onClick(item);
								}}>
								Delete from state
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CountryCard;
