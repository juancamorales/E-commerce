import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../../Nav/NavBar';
import Footer from '../../Footer/Footer';
import { reactLocalStorage } from 'reactjs-localstorage';
import { getAllFoods } from '../../../Redux/Actions/Actions'
import './payPending.css'

function PayPending() {
    const dispatch = useDispatch();
    const foods = useSelector((state) => state.foods);
    const display = []

    const info = (reactLocalStorage.get('Shopping')).split(",");
    const dataCant = (reactLocalStorage.get('ShoppingCant')).split(",")

    useEffect(() => {
        dispatch(getAllFoods())
    }, [dispatch]);

    if (foods) {
        foods.map((food) => {
            if (info.includes(food.id)) {
                display.push(food)
            }
        })
    }
    console.log(display);
    return (
        <>
            <NavBar />

            <div className="container1">
                {
                    <div className="details">
                        <div className='text1'>Your payment is currently pending: </div>
                        <div className='text1'>Your order:</div>
                        {display.map((card, index) => <div key={index} > {dataCant[index + 1]}  {card.name} </div>)
                        }

                        <div className='details-button'>
                            <Link to={`/home`} className="link">
                                <button className='btn btn-success details-button'> Go back </button>
                            </Link>
                        </div>
                    </div>
                }
            </div>
            <Footer />

        </>
    );
}

export default PayPending;