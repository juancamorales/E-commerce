import React, { useState } from "react";
import "./WelcomeAdmin.css";
import { useAuth0 } from "@auth0/auth0-react";
export const WelcomeAdmin = () => {
  // const [adminName, setAdminName] = useState("");
  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log(isLoading);
  return (
    <div className="welcomeAdmin">
      <div className="welcome-center">
        <div className="welcome-header">
          <h2>
            {" "}
            Welcome <span>{isAuthenticated ? user.name : ""}</span>
          </h2>
          <img
            style={{ marginBottom: "-75px", border: "3px solid black" }}
            width={"150px"}
            src={isAuthenticated ? user.picture : ""}
            alt="dashboard logo"
          />
        </div>
        <div className="how-text">
          <h2>Here you can manage the functions of your page</h2>
          <p> Easy and fast functionality </p>
        </div>
        <div className="process-card">
          <div className="col-card">
            <img
              src={"https://cdn-icons-png.flaticon.com/128/2921/2921222.png"}
              alt={"edit"}
            />
            <h2>EDIT</h2>
            <p>Choose a column to edit the element</p>
          </div>
          <div className="col-card">
            <img
              src={"https://cdn-icons-png.flaticon.com/128/3221/3221897.png"}
              alt={"delete"}
            />
            <h2>DELETE</h2>
            <p>The element will be able to back</p>
          </div>
          <div className="col-card">
            <img
              src={"https://cdn-icons-png.flaticon.com/128/3658/3658756.png"}
              alt={"create"}
            />
            <h2>CREATE</h2>
            <p>Create more elements</p>
          </div>
        </div>
      </div>
    </div>
  );
};
