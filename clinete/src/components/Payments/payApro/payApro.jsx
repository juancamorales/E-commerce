import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../../Nav/NavBar';
import Footer from '../../Footer/Footer';
import { reactLocalStorage } from 'reactjs-localstorage';
import './payApro.css';
import { getAllFoods, getUser, putBill } from '../../../Redux/Actions/Actions'
import Swal from "sweetalert2"
import { useAuth0 } from "@auth0/auth0-react";

function PayApro() {
	const dispatch = useDispatch();
	const foods = useSelector((state) => state.foods);  
	const { user } = useAuth0();
	let [ resp, setResp ] = useState(false)
	const userr = user?.email
	const info = (reactLocalStorage.get('Shopping')).split(",");
	
	useEffect(() => {
		dispatch(getUser(userr))
		dispatch(getAllFoods())
	  }, [dispatch, user]);
	  const currentUser = useSelector((state) => state.user);

	  const inf = {
		qualify: false,
		paid: true,
		idUsario: currentUser?.id
		}

		setTimeout(function(){			
			msn()
		}, 10000);

	  function msn() {
		dispatch(putBill(inf))
		setResp(true)
	   }
	   function back(e) {
		e.preventDefault()
		window.location.href = "https://e-commerce-one-gules.vercel.app/home"
		reactLocalStorage.set("Shopping", "0")
	   }

	  
	return (
		<>
		{(resp === true) ?
			(<><NavBar /><div className="container1">
				{<div className="details">
					<div className='theT'>Your payment was successfully received</div><br /><br />
					<div className='tSub'>Your order:</div>
					
			
					<div id='fileE'>
						{foods.map((food, index) => 
						info.includes(food.id.toString())? 
							(
								<div className='theE'>
									<img className="img" src= {food.image} alt={"No"} />
									<div>{food.name}</div>
								</div>
							):null
						)}					
					</div>
					<div id='imgsend'>
						<img className="img" src= "https://gifs.eco.br/wp-content/uploads/2022/02/animados-gifs-de-motoboys-4.gif" alt={"No"} />
					</div>
					

					<div className='details-button'>
							<button onClick={(e)=>back(e)} className='btn btn-success details-button'> Go back </button>
					</div>
				</div>}
				</div><Footer /></>):
            <>
			<h1></h1>
			<div className='details-button'>
					<button className='btn btn-success details-button' >Validating your payment, please wait 10 seconds.</button>
			</div>
			</>
		}	
		</>
	);
}

export default PayApro;
