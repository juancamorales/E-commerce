import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../Nav/NavBar';
import Footer from '../Footer/Footer';
import { reactLocalStorage } from 'reactjs-localstorage';
import './payApro.css';
import { getAllFoods, getUser, putBill } from '../../Redux/Actions/Actions'
import Swal from "sweetalert2"
import { useAuth0 } from "@auth0/auth0-react";

function PayApro() {
	const dispatch = useDispatch();
	const foods = useSelector((state) => state.foods);  
	const display = []
	const { user } = useAuth0();
	let [ resp, setResp ] = useState(false)
	const userr = user?.email

	const info = (reactLocalStorage.get('Shopping')).split(",");
	const dataCant = (reactLocalStorage.get('ShoppingCant')).split(",")

	useEffect(() => {
		dispatch(getUser(userr))
		dispatch(getAllFoods())
	  }, [dispatch, user]);
	  const currentUser = useSelector((state) => state.user);

	  const inf = {
			paid: true,
			idUsario: currentUser?.id
		}
	  function msn(e) {
		e.preventDefault();
		Swal.fire({
		  title: "listo",
		  icon: "success",
		  showConfirmButton: "#e38e15",
		})
		    dispatch(putBill(inf))
		setResp(true)
	   }

	  if (foods){
			foods.map((food) => {
				if (info.includes(food.id)) {
				display.push(food)
				}
			})
		}
	
	return (
		<>
		{(resp === true) ?
			(<><NavBar /><div className="container1">
					{<div className="details">
						<div>Your payment was successfully received</div>
						<div>Your order:</div>
						{display.map((card, index) => <div key={index}> {dataCant[index + 1]}  {card.name} </div>)}

						<div className='details-button'>
							<Link to={`/home`} className="link">
								<button className='btn btn-success details-button'> Go back </button>
							</Link>
						</div>
					</div>}
				</div><Footer /></>):
            <>
			<h1>Gracias por su compra</h1>
			<div className='details-button'>
					<button className='btn btn-success details-button' onClick={(e) => { msn(e)}}>listo</button>
			</div>
			</>
		}	
		</>
	);
}

export default PayApro;

