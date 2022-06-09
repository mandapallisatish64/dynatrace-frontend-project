import React from "react";
import { useLocation, NavLink } from "react-router-dom";

function Navigation() {
  let { pathname } = useLocation();
  const pathsArray = pathname.split("/");
  return pathsArray.map((path) => {
    return (
      <div key={Math.random()}>
        <NavLink to={path}>{path}</NavLink>
      </div>
    );
  });
}

export default Navigation;
