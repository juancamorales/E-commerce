import React, { useState } from 'react';
import './FavoriteButton.css'
import Favorite from '@mui/icons-material/Favorite';
import { grey} from '@mui/material/colors';
import { useSelector } from 'react-redux';
import { shopping} from '../../Redux/Actions/Actions';
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export default function FavoriteButton() {

const [showBox, setShowBox] = useState(false);
const favorites = useSelector(state => state.user.food)
const favoritesLocal = useSelector(state => state.favorites)
const dispatch = useDispatch(); 
const {isAuthenticated} = useAuth0()

const toggleBox = () => {
  setShowBox(!showBox);
}

const handleBoxMouseEnter = () => {
//   setMouseOverBox(true);
  setShowBox(true);
}

const handleBoxMouseLeave = () => {
//   setMouseOverBox(false);
  setShowBox(false);
}

function addCar(e){
    // e.preventDefault();
    e.map((e) => dispatch (shopping(e.id)))
    
}


  return (
    <div className="favorite-button">
      <button onClick={toggleBox} onMouseEnter={toggleBox} onMouseLeave={handleBoxMouseLeave}>
        <Favorite sx={{
          color: grey[50]
        }}></Favorite>
        </button>

      {showBox && (
        <div
          className="favorite-box"
          onMouseEnter={handleBoxMouseEnter}
          onMouseLeave={handleBoxMouseLeave}
        >
            
               {isAuthenticated? favorites.length? favorites.map(fav => { 
               return <div>
                <Link to={`/detail/${fav.id}`} state={fav} className="link">
                <div className='favs-container'>
                <img src={fav.image} alt="" id='favs-image'/>
                <div>
                 <p className='favs-name' >{fav.name}</p> 
                 <p className='favs-name'>${fav.price}</p>  
                </div>
               </div>
			</Link>
               </div> 
            }): <p className='nonFavs'>Add some favorites</p>: favoritesLocal.length? favoritesLocal.map(fav => { 
              return <div>
               <Link to={`/detail/${fav.id}`} state={fav} className="link">
               <div className='favs-container'>
               <img src={fav.image} alt="" id='favs-image'/>
               <div>
                <p className='favs-name' >{fav.name}</p> 
                <p className='favs-name'>${fav.price}</p>  
               </div>
              </div>
     </Link>
              </div> 
           }): <p className='nonFavs'>Add some favorites</p>}  
        {isAuthenticated? favorites.length? <div className='container-Button'>
            <Link to={'/shopping'}>
            
          <button id='add-Button' className='btn' onClick={()=>addCar(favorites)}>Send to shopping</button>    
            </Link>

          </div>: null: favoritesLocal.length? <div className='container-Button'>
            <Link to={'/shopping'}>
            
          <button id='add-Button' className='btn' onClick={()=>addCar(favoritesLocal)}>Send to shopping</button>    
            </Link>

          </div>: null} 
          
        </div>
      )}
    </div>
  );
}