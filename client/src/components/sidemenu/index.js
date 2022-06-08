import React from "react";
import { NavLink } from "react-router-dom";
import "./style.scss"

function SideMenu() {
  const sideMenuOptions = [
    {
      title: "Sales leads",
      description: "Review and create new leads",
      linkTo: "/salesleads",
    },
    
  ];
  return (
    <div className="sidemenu-wrap">
      {sideMenuOptions.map(({ title, description, linkTo }) => {
        return (
          <NavLink to={linkTo}>
            <h5>{title}</h5>
          </NavLink>
        );
      })}
    </div>
  );
}

export default SideMenu;
