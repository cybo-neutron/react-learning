import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="flex bg-orange-400 gap-x-5 text-xl capitalize font-semibold py-3 pl-3">
      <Link to="/">Home</Link>
      <Link to="/super-heroes">Traditional Super Heroes</Link>
      <Link to="/rq-super-heroes">rq super heroes</Link>
    </nav>
  );
}

export default NavBar;
