import React, { useState } from "react";
import "./Review.css";
import NavBar from "../Nav/NavBar";
import Swal from "sweetalert2"
import { useDispatch, useSelector } from "react-redux";
import { putBill, putQualification } from '../../Redux/Actions/Actions'

export default function Review() {  
	const dispatch = useDispatch();
  const allBilling = useSelector((state) => state.allbilling); 
  const theUser = useSelector((state) => state.user);
  const thefoods = useSelector((state) => state.foods);
  const [current, setcurrent] = useState(0)
  //----------
  let detail = ""
  allBilling.map((bill) => {                                     //facturas correspondientes al correo
    if ( bill.userId === theUser.id && bill.paid && bill.status !==false ) detail = bill
  })
  //---------
  const temp = [];
  detail.products.map((id)=>{
    const temp2 = [];
    temp2.push(id);
    temp2.push(0);
    temp2.push("");
    let name = "";
      if (thefoods.length>0) {
        thefoods.map((elem)=>{
          if (elem.id === id) name = elem.name
        })
      }
    temp2.push(name)

    temp.push(temp2)
  })
  const [qualify, setqualify] = useState(temp);
  const currentUser = useSelector((state) => state.user);

  const inf = {
    qualify: true,
    paid: true,
    idUsario: currentUser?.id
  }

  function cl(e) {
    e.preventDefault();
    let cliced = e.target.className.split('|');
    const tempor = qualify
    tempor[cliced[2]][((parseInt(cliced[0]) + 1) * 3) + 1] = parseInt(cliced[1]);
    setqualify(tempor)
    setcurrent(current + 1)
  }
  function changeComment(e) {
    e.preventDefault();
    let cliced = e.target.className.split('|');
    const tempor = qualify
    tempor[cliced[1]][((parseInt(cliced[0]) + 1) * 3) + 2] = e.target.value;
    setqualify(tempor)
    setcurrent(current + 1)
  }
  function clicSava(e) {
    e.preventDefault();
    let all = true;
    qualify.map((elem)=>{
      if (elem[1]===0 || elem[2].length<12)all=false;

    })
    if(all){
      dispatch(putBill(inf))

      qualify.map((calif)=>{
        dispatch  (putQualification({id: calif[0],qualification:calif[1]}))
      })

      Swal.fire({
        title: "Saved successfully",
        icon: "success",
        confirmButtonColor: "#e38e15",
    }).then(function() {
      window.location.href = "https://e-commerce-one-gules.vercel.app/home"
    });
      
    }
    else{
      Swal.fire({
        title: "Missing ratings or comments with text longer than 12 characters",
        icon: "error",
        confirmButtonColor: "#e38e15",
      })
    }
  }
  return (
    <>
      <NavBar></NavBar>
      <div className="bkng">
        <div className="reviewContenedor">
          <div id="reservedTittle" className="reservedTittle">Foods to qualify</div> <br /><br />
          <div>

            {
            temp.length > 0 ?
            temp.map((elem,ind) => (
              <div className="barra" key={ind}>
                  <div id="reviewNameStar">
                    <h4 id="reviewName">{elem[3]} </h4>
                    <div id="reviewStart">
                      {qualify[ind][1] >= 1 ? <button onClick={(e) => cl(e)} id="starTrue" className={"-1|1|"+ind}>★</button> : <button onClick={(e) => cl(e)} id="starFalse" className={"-1|1|"+ind}>☆</button>}
                      {qualify[ind][1] >= 2 ? <button onClick={(e) => cl(e)} id="starTrue" className={"-1|2|"+ind}>★</button> : <button onClick={(e) => cl(e)} id="starFalse" className={"-1|2|"+ind}>☆</button>}
                      {qualify[ind][1] >= 3 ? <button onClick={(e) => cl(e)} id="starTrue" className={"-1|3|"+ind}>★</button> : <button onClick={(e) => cl(e)} id="starFalse" className={"-1|3|"+ind}>☆</button>}
                      {qualify[ind][1] >= 4 ? <button onClick={(e) => cl(e)} id="starTrue" className={"-1|4|"+ind}>★</button> : <button onClick={(e) => cl(e)} id="starFalse" className={"-1|4|"+ind}>☆</button>}
                      {qualify[ind][1] >= 5 ? <button onClick={(e) => cl(e)} id="starTrue" className={"-1|5|"+ind}>★</button> : <button onClick={(e) => cl(e)} id="starFalse" className={"-1|5|"+ind}>☆</button>}
                    </div>
                    <div></div>
                  </div>
                  <textarea value={qualify[ind][2]} id="reviewDetail" placeholder="Enter a comment (minimum 12 characters)" className={"-1|"+ind} onChange={(e) => changeComment(e)} />
                </div>
            ))
            : null
            }


          </div> <br />
          <div className="reviewButon">
            <button id="confir" className="btn btn-success" onClick={(e)=>clicSava(e)}>Send</button>
          </div><br />
        </div>
      </div>
    </>
  );
}