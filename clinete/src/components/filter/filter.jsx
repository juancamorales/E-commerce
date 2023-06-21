import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Search from "../Search/Search";
import "./filter.css"
import { getfilterFoods } from "../../Redux/Actions/Actions";

export default function Filter ({paginate}) {
  
  const dispatch = useDispatch();
  const [xclude] =useState ([[],[],[],[]]);
  const [action,setaction] =useState(0)
  let arrayTemp=[];  
  const allfoods = useSelector((state) => state.allFoods);
  
  //-----------------------------cambio de menu de filtro
  const [act, setact] = useState (1)
  function openFilter(e, value){ 
    e.preventDefault();
    value === act? setact(0):setact(value)
  }  
  //------------------------------------clic en un filtro
  function filter (e,value,index ){
    document.getElementsByClassName("filteSubTitletxt")[0].value = "";
    e.preventDefault();
    paginate(e,1)
    if (xclude[index].includes(value)){
      arrayTemp = xclude[index].filter((dato) => dato !== value);
      xclude[index] = arrayTemp;
    }
    else {
      xclude[index].push(value);
    } 
    setaction (action+1);  
  //------------------------------------aplicar filtros

    let filt1 = [],
      filt2 = [],
      filt3 = [],
      filt4 = [];
    
    allfoods.forEach((obj) => { if (!xclude[0].includes(obj.type)) filt1.push(obj);});
    filt1.forEach((obj) => { if (!xclude[1].includes(obj.fat)) filt2.push(obj);});
    filt2.forEach((obj) => { if (!xclude[2].includes(obj.sodium)) filt3.push(obj);});
    filt3.forEach((obj) => { if (!xclude[3].includes(obj.sugar)) filt4.push(obj);
    });
    dispatch(getfilterFoods(filt4))
  }
  //------------------------------------limpiar filtro
  function offilter (){
    xclude[0] = [];
    xclude[1] = [];
    xclude[2] = [];
    xclude[3] = [];
  }
  //------------------------------------item para filter
  const itemsFilter = [[],[],[],[]];
  const cantFilter = [[],[],[],[]];
  allfoods.forEach((element)=>{
    if (!itemsFilter[0].includes(element.type)) {
      itemsFilter[0].push(element.type);
      cantFilter[0].push(1);
    }
    else{
      cantFilter[0][itemsFilter[0].indexOf(element.type)] +=1
    }
    if (!itemsFilter[1].includes(element.fat)) {
      itemsFilter[1].push(element.fat);
      cantFilter[1].push(1);
    }
    else{
      cantFilter[1][itemsFilter[1].indexOf(element.fat)] +=1
    }
    if (!itemsFilter[2].includes(element.sodium)) {
      itemsFilter[2].push(element.sodium);
      cantFilter[2].push(1);
    }
    else{
      cantFilter[2][itemsFilter[2].indexOf(element.sodium)] +=1
    }
    
    if (!itemsFilter[3].includes(element.sugar)) {
      itemsFilter[3].push(element.sugar);
      cantFilter[3].push(1);
    }
    else{
      cantFilter[3][itemsFilter[3].indexOf(element.sugar)] +=1
    }

  })
  //----------------------------------------------------

  return (
    <div className="contFilter">
      <div id="filtercontenido">
      <div className="filteTittle">Ordenate</div><br /><br /><br />
        <Search offilter= {offilter} />
        <br /><div className="filteTittle">Filter</div>        
        <div id="GroupFilter">
          <div className="filteSubTitle" onClick={(e)=>openFilter(e,1)}>By type of food</div> 
          <div className="filterGrops">
            {
            act === 1?(
              itemsFilter[0].map((obj, ind) => (              
              xclude[0].includes(obj)?
              <div className="imgtaFalse" onClick={(e)=>filter (e,obj,0 )} key={ind}>
                <div>
                  {
                  obj ==="Salad"?<img  id="filterimg" src="https://previews.123rf.com/images/artcasta/artcasta1605/artcasta160500015/58729322-la-porci%C3%B3n-de-ensalada-verde-fresca-con-queso-mozzarella-sobre-un-fondo-blanco.jpg" alt={"No"} />:
                  obj ==="Dessert"?<img  id="filterimg" src="https://album.mediaset.es/eimg/2020/06/16/6hHUb5NRUCam8q1fwmYPu5.jpg?w=480" alt={"No"} />:
                  obj ==="Appetizer"?<img  id="filterimg" src="https://static.vecteezy.com/system/resources/thumbnails/001/740/787/small/round-ring-snacks-in-a-basket-free-photo.jpg" alt={"No"} />:
                  obj ==="Drink"?<img  id="filterimg" src="https://thumbs.dreamstime.com/b/bebida-roja-8623697.jpg" alt={"No"} />:
                  <img  id="filterimg" src="https://s1.1zoom.me/big0/648/The_second_dishes_Potato_Meat_products_Vegetables_563131_1280x853.jpg" alt={"No"} />}
                </div>
                <div className="filtername">
                  {obj} ({cantFilter[0][ind]})
                </div>
              </div>:
              <div className="imgtTrue" onClick={(e)=>filter (e,obj,0 )} key={ind}>
              <div>
                {
                obj ==="Salad"?<img  id="filterimg" src="https://previews.123rf.com/images/artcasta/artcasta1605/artcasta160500015/58729322-la-porci%C3%B3n-de-ensalada-verde-fresca-con-queso-mozzarella-sobre-un-fondo-blanco.jpg" alt={"No"} />:
                obj ==="Dessert"?<img  id="filterimg" src="https://album.mediaset.es/eimg/2020/06/16/6hHUb5NRUCam8q1fwmYPu5.jpg?w=480" alt={"No"} />:
                obj ==="Appetizer"?<img  id="filterimg" src="https://static.vecteezy.com/system/resources/thumbnails/001/740/787/small/round-ring-snacks-in-a-basket-free-photo.jpg" alt={"No"} />:
                obj ==="Drink"?<img  id="filterimg" src="https://thumbs.dreamstime.com/b/bebida-roja-8623697.jpg" alt={"No"} />:
                <img  id="filterimg" src="https://s1.1zoom.me/big0/648/The_second_dishes_Potato_Meat_products_Vegetables_563131_1280x853.jpg" alt={"No"} />}
              </div>
              <div className="filtername">
                {obj} ({cantFilter[0][ind]})
              </div>
            </div>
            ))):
            null}
          </div>
          <div className="filteSubTitle"onClick={(e)=>openFilter(e,2)}>By amount of fat</div> 
          <div className="filterGrops">
          {act === 2?(
              itemsFilter[1].map((obj, ind) => (
                xclude[1].includes(obj)?
              <div  onClick={(e)=>filter (e,obj,1 )} className="imgtaFalse" key={ind}>
                <div>
                  {obj ==="High"?<img id="filterimg" src="https://i.ibb.co/vBqYzqH/high-fat.jpg" alt={"No"} />:
                  obj ==="Low"?<img id="filterimg" src="https://i.ibb.co/tqscKYg/low-fat.jpg" alt={"No"} />:
                  <img id="filterimg" src="https://i.ibb.co/JqPmNC0/medium-fat.jpg" alt={"No"} />}
                </div>
                <div className="filtername">
                  {obj}({cantFilter[1][ind]})
                </div>
              </div>:
              <div onClick={(e)=>filter (e,obj,1 )} className="imgtTrue" key={ind}>
              <div>
                {obj ==="High"?<img id="filterimg" src="https://i.ibb.co/vBqYzqH/high-fat.jpg" alt={"No"} />:
                obj ==="Low"?<img id="filterimg" src="https://i.ibb.co/tqscKYg/low-fat.jpg" alt={"No"} />:
                <img id="filterimg" src="https://i.ibb.co/JqPmNC0/medium-fat.jpg" alt={"No"} />}
              </div>
              <div className="filtername">
                {obj} ({cantFilter[1][ind]})
              </div>
            </div>
            ))):
            null}
            </div>
          <div className="filteSubTitle"onClick={(e)=>openFilter(e,3)}>By amount of sodium </div> 
          <div className="filterGrops">
          {act === 3?(
              itemsFilter[2].map((obj, ind) => (
              xclude[2].includes(obj)?
              <div onClick={(e)=>filter (e,obj,2 )} className="imgtaFalse" key={ind}>
                <div>
                  {obj ==="High"?<img id="filterimg" src="https://i.ibb.co/sCHdR04/high-sodium.jpg" alt={"No"} />:
                  obj ==="Low"?<img id="filterimg" src="https://i.ibb.co/5Mf2L28/low-sodium.jpg" alt={"No"} />:
                  <img id="filterimg" src="https://i.ibb.co/kyNbpLH/medium-sodium.jpg" alt={"No"} />}
                </div>
                <div className="filtername">
                  {obj} ({cantFilter[2][ind]})
                </div>
              </div>:
              <div onClick={(e)=>filter (e,obj,2 )} className="imgtTrue" key={ind}>
              <div>
                {obj ==="High"?<img id="filterimg" src="https://i.ibb.co/sCHdR04/high-sodium.jpg" alt={"No"} />:
                obj ==="Low"?<img id="filterimg" src="https://i.ibb.co/5Mf2L28/low-sodium.jpg" alt={"No"} />:
                <img id="filterimg" src="https://i.ibb.co/kyNbpLH/medium-sodium.jpg" alt={"No"} />}
              </div>
              <div className="filtername">
                {obj} ({cantFilter[2][ind]})
              </div>
            </div>
            ))):
            null}
            </div>
          <div className="filteSubTitle"onClick={(e)=>openFilter(e,4)}>By amount of sugar </div> 
          <div className="filterGrops">
          {act === 4?(
              itemsFilter[3].map((obj, ind) => (              
              xclude[3].includes(obj)?
              <div onClick={(e)=>filter (e,obj,3 )}  className="imgtaFalse" key={ind}>
                <div>
                  {obj ==="High"?<img id="filterimg" src="https://i.ibb.co/9r0TMjB/high-sugar.jpg" alt={"No"} />:
                  obj ==="Low"?<img id="filterimg" src="https://i.ibb.co/nmFD1pT/low-sugar.jpg" alt={"No"} />:
                  <img id="filterimg" src="https://i.ibb.co/YPCswvh/medium-sugar.jpg" alt={"No"} />}
                </div>
                <div className="filtername">
                  {obj}({cantFilter[3][ind]})
                </div>
              </div>:
              <div onClick={(e)=>filter (e,obj,3 )}  className="imgtTrue" key={ind}>
              <div>
                {obj ==="High"?<img id="filterimg" src="https://i.ibb.co/9r0TMjB/high-sugar.jpg" alt={"No"} />:
                obj ==="Low"?<img id="filterimg" src="https://i.ibb.co/nmFD1pT/low-sugar.jpg" alt={"No"} />:
                <img id="filterimg" src="https://i.ibb.co/YPCswvh/medium-sugar.jpg" alt={"No"} />}
              </div>
              <div className="filtername">
                {obj}({cantFilter[3][ind]})
              </div>
            </div>
            ))):
            null}
            </div>
          </div>
      </div>
    </div>
  );
};


