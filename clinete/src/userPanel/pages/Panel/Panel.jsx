import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../../Components/Nav/Nav";
import SideBar from "../../Components/SideBar/SideBar";
import "./Panel.css";
import NavBar from "../../../components/Nav/NavBar";

const Panel = () => {
  
  return (
    <>
        <NavBar></NavBar>
      <div className="dash-container">
        <SideBar />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Panel;
