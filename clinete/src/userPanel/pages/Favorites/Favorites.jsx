import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { shopping } from '../../../Redux/Actions/Actions';
import './Favorites.css';

export default function Favorites() {
	const favorites = useSelector((state) => state.user.food);
	const dispatch = useDispatch();
	function addCar(e) {
		// e.preventDefault();
		e.map((e) => dispatch(shopping(e.id)));
	}
	function addCarIndividual(e) {
		// e.preventDefault();
		dispatch(shopping(e));
		console.log(e);
	}

	return (
		<div className="container-Favorites">
			{favorites.length ? (
				favorites.map((fav) => {
					return (
						<div>
							<div className="favorites-container">
								<Link to={`/detail/${fav.id}`} state={fav} className="link">
									<img src={fav.image} alt="" id="favorites-image" />
								</Link>
								<Link to={`/detail/${fav.id}`} state={fav} className="link">
									<p className="favorites-name">{fav.name}</p>
								</Link>
								<p className="favorites-name">${fav.price}.00</p>
								<p className="favorites-name">{fav.type}</p>
								<p className="favorites-name">{fav.fat} in fats</p>
								<p className="favorites-name">{fav.sodium} in sodium</p>
								<p className="favorites-name">{fav.sugar} in sugars</p>
								<Link to={'/shopping'}>
									<button
										id="add-Button"
										className="btn"
										onClick={() => addCarIndividual(fav.id)}
									>
										Buy
									</button>
								</Link>
							</div>
						</div>
					);
				})
			) : (
				<p className="nonFavs">Add some favorites</p>
			)}
			{favorites.length ? (
				<Link to={'/shopping'}>
					<div className="container-Button">
						<button
							id="add-Button"
							className="btn"
							onClick={() => addCar(favorites)}
						>
							Send to shopping
						</button>
					</div>
				</Link>
			) : null}
		</div>
	);
}
