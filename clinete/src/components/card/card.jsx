import React, { useState } from 'react';
import './card.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
	shopping,
	favorites,
	postFavorite,
	deleteFavorite,
	getUser,
} from '../../Redux/Actions/Actions';
import Rating from '@mui/material/Rating';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { green } from '@mui/material/colors';
import { useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';

function Card({ card, arrayInShopping, update }) {
	const dispatch = useDispatch();
	const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
	const user = useSelector((state) => state.user);
	const favoriteLocal = useSelector((state) => state.favorites);
	const favoriteState = user.food;
	const [selected, setSelected] = useState(false);
	const {isAuthenticated} = useAuth0()

	function handleFavoriteChange(card) {
		
		if(isAuthenticated){
			const filterFavorites = favoriteState?.filter((fav) => fav.id === card.id);
		if ( filterFavorites.length !== 0) {
			dispatch(favorites(card));
			dispatch(deleteFavorite({ idUser: user.id, idFood: card.id }));
			setSelected(!selected);
			setTimeout(() => {
				dispatch(getUser(user.mail));
			}, 500);
		} else {
			dispatch(favorites(card));
			dispatch(postFavorite({ idUser: user.id, idFood: card.id }));
			setSelected(!selected);
			setTimeout(() => {
				dispatch(getUser(user.mail));
			}, 500);
		}}
		if(!isAuthenticated){
			const filterFavorites = favoriteLocal?.filter((fav) => fav.id === card.id);
			if ( filterFavorites.length !== 0) {
				dispatch(favorites(card));				
				setSelected(!selected);
			} else {
				dispatch(favorites(card));		
				setSelected(!selected);
			}
		}

	}

	function addCar(e) {
		e.preventDefault();
		dispatch(shopping(e.target.value));
		update();
	}

	return ( <>
		<div className="cardd">
			{}
			<div></div>
			<div id="colum-img-det">
				<img className="img" src={card.image} alt={'No'} />
				<Link to={`/detail/${card.id}`} state={card} className="link">
					<button id="btnDetail" className="btn btn-success">
						{' '}
						Details{' '}
					</button>
				</Link>
			</div>
			<div className="texts">
				<div className="text1">
					{card.name}
					{isAuthenticated? favoriteState?.filter((e) => e.id === card.id).length ? (
						<button
							id="favorites-button"
							onClick={() => handleFavoriteChange(card)}
						>
							<Favorite
								sx={{
									color: green[800],
									'&.Mui-checked': {
										color: green[600],
									},
								}}
							></Favorite>
						</button>
					) : (
						<button
							id="favorites-button"
							onClick={() => handleFavoriteChange(card)}
						>
							<FavoriteBorder
								sx={{
									color: green[800],
									'&.Mui-checked': {
										color: green[600],
									},
								}}
							></FavoriteBorder>
						</button>
					): favoriteLocal?.filter((e) => e.id === card.id).length ? (
						<button
							id="favorites-button"
							onClick={() => handleFavoriteChange(card)}
						>
							<Favorite
								sx={{
									color: green[800],
									'&.Mui-checked': {
										color: green[600],
									},
								}}
							></Favorite>
						</button>
					) : (
						<button
							id="favorites-button"
							onClick={() => handleFavoriteChange(card)}
						>
							<FavoriteBorder
								sx={{
									color: green[800],
									'&.Mui-checked': {
										color: green[600],
									},
								}}
							></FavoriteBorder>
						</button>
					)}

					{/* <Checkbox {...label} icon={ <FavoriteBorder />} checkedIcon={<Favorite />} sx={{
          color: green[800],
          '&.Mui-checked': {
            color: green[600],
          },
         }} onChange={() => handleFavoriteChange(card)}/> */}
				</div>
				<div className="conText">
					<div className="text2">type: {card.type} </div>
					<div className="text2">Fat: {card.fat} </div>
					<div className="text2">Sodium: {card.sodium} </div>
					<div className="text2">Sugar: {card.sugar} </div>
				</div>
				<div className="text2">USD {card.price}</div>
				<Rating name="read-only" value={card.qualification} readOnly />
			</div>
			<div className="cardPart3">
				{arrayInShopping.includes(card.id.toString()) ? (
					<button
						id={card.id}
						className="btnCarritotrue"
						value={card.id}
						onClick={(e) => addCar(e)}
					></button>
				) : (
					<button
						id={card.id}
						className="btnCarritofalse"
						value={card.id}
						onClick={(e) => addCar(e)}
					></button>
				)}

				{card.discount ? (
					<div className="Desc">discount</div>
				) : (
					<div className="Desc"></div>
				)}
				{card.discount ? (
					<div className="DescVal">{card.discount}%</div>
				) : (
					<div className="DescVal"></div>
				)}
			</div>
			<div></div>
			
		</div>
</>);
}

export default Card;
