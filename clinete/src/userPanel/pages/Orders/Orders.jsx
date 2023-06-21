import React from 'react';
import { useSelector } from 'react-redux';

import './Orders.css';

export default function Orders() {

	const user = useSelector((state) => state.user);
	const foods = useSelector((state) => state.foods);

	return (
		<div className="container-orders">
			<div className="information-Box">
				{user.bills.length ?<h2 id="information">Previous Orders</h2>: ""}
			</div>
			{user.bills.length ? (
				user.bills.map((order) => {
					return (
						<div>
							{/* {setCounter(counter+1)} */}
							<p id="orders-Number" className="information-Box">
								{' '}
								Order #{order.billId.slice(0, 5)} {order.createdAt.slice(0, 10)}
							</p>
							{order.products.map((id) => {
								let foodFilter = foods.filter((e) => e.id === id);
								return (
									<div className="products-container">
										<img src={foodFilter[0].image} alt="" id="products-image" />
										<p className="products-name">{foodFilter[0].name}</p>
										<p className="products-name">{foodFilter[0].type}</p>
										<p className="products-name">${foodFilter[0].price}.00</p>
										{/* <p className="products-name">{foodFilter[0].fat} in fats</p>
										<p className="products-name">
											{foodFilter[0].sodium} in sodium
										</p>
										<p className="products-name">
											{foodFilter[0].sugar} in sugars
										</p> */}
									</div>
								);
							})}

							{/* <Link to={'/shopping'}>
                                      <button id='add-Button' className='btn' onClick={()=>addCarIndividual(fav.id)}>Buy</button>
                                      </Link> */}
              <div className='container-Total'>
              <p id="orders-Total" className="information-Box">
								{' '}
								Total: ${order.value} usd
							</p>
              </div>
						</div>
					);
				})
			) : (
				<p className="nonFavs">You don´t have any order</p>
			)}
			{/* {user.bills.length? 
          <Link to={'/shopping'}>
                              <div className='container-Button'>
                              <button id='add-Button' className='btn' onClick={()=>addCar(favorites)}>Send to shopping</button>
                              </div>
                              </Link> : null
          } */}
		</div>
	);
}
