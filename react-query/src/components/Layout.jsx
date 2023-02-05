import React from "react";
import NavBar from "./NavBar";

function Layout(props) {
  return (
    <div className="min-h-screen bg-gray-300">
      <NavBar />
      {props.children}
    </div>
  );
}

export default Layout;
