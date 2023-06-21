import React, { useState } from "react";
import {reactLocalStorage} from 'reactjs-localstorage';
import { Link } from 'react-router-dom';
import "./cards.css"
import Card from "../card/card";
import { Pagination } from "../pagination/pagination";
import NotFound from '../NotFound/NotFound'
import { useSelector } from "react-redux";

export default function Cards ({foods,total,paginate, favorites, setFavorites}) {
  const [up, setup] = useState (0)

  
  const theUser = useSelector((state) => state.user);
  let ap = false;
  if (theUser !== []) if (theUser.roll === "admin") ap= true;
  
  const inShopping = reactLocalStorage.get('Shopping');
  const arrayInShopping =inShopping?.split(',')
  function update(){
    setup(up+1)
  }
  return (
    <>
    {ap?
    <Link to={`/dashboard`} className="link">
      <div id="lAdmin" > Administrator</div>
    </Link>:null}
    <div id="contPag" >
      <div className="showing">
        {foods.length > 0 ?
        foods.map((card,index) => <Card key={index} arrayInShopping={arrayInShopping} card = {card} update = {update} favorites = {favorites} setFavorites = {setFavorites}/>)
        : <NotFound/>
        }
      <div>     
        <Pagination	
            total={total}
            paginate={paginate}
          /> 
      </div>
      </div>   
    </div>
    </>
  );
};

