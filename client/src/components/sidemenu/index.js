import React from "react";
import { NavLink } from "react-router-dom";
import "./style.scss";

function SideMenu() {
  const sideMenuOptions = [
    {
      id:1,
      title: "Sales leads",
      description: "Review and create new leads",
      linkTo: "/",
    },
  ];
  return (
    <div className="sidemenu-wrap">
      {sideMenuOptions.map(({ id,title, linkTo,description }) => {
        return (
          <NavLink to={linkTo} key={id}>
            <h5>{title}</h5>
            <p className="sidemenuitem-description">{description}</p>
          </NavLink>
        );
      })}
    </div>
  );
}

export default SideMenu;
