import React from "react";
import {
  FaShoppingCart,
  FaUserAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import "./SideBar.css";

const SideBar = ({ children }) => {
  const menuItem = [
      {
        path: "profile",
        name: "Profile",
        icon: <FaUserAlt />,
      },
    {
      path: "favorites",
      name: "Favorites",
      icon: <FavoriteIcon />,
    },
    {
      path: "orders",
      name: "Orders",
      icon: <FaShoppingCart />,
    },
  ];
  return (
    <div className="dashboard">
      <div  className="user-sidebar">
        <div className="dash-links">
          {menuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="dash-link"
              activeclassname="active"
            >
              <div className="icon">{item.icon}</div>
              <div
                className="link_text"
              >
                {item.name}
              </div>
            </NavLink>
          ))}
        </div>
        {/* <div
          style={{ width: isOpen ? "90px" : "10px" }}
          className="dropdown"
        >
          <Dropdown as={ButtonGroup}>
            <Button size="sm" variant="success">
              <img
                width="50px"
                style={{margin:"0px",borderRadius: "50%" }}
                src="https://images.hola.com/imagenes/mascotas/20201104178485/consejos-gatos-para-principiantes/0-884-859/gatito-m.jpg?tx=w_680"
                alt="img"
              />
            </Button>

            <Dropdown.Toggle
              split
              size="lg"
              variant="success"
              id="dropdown-split-basic"
            />

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div> */}
      </div>
    </div>
  );
};

export default SideBar;
