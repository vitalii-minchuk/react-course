import React from "react";
import { Link } from "react-router-dom";
import s from "./Navbar.module.css"

const Navbar = () => {
  return (
    <nav className={s.nav}>
        <ul>
          <li>
            <Link to='/profile'>Profile</Link>
          </li>
          <li>
            <Link to='/dialogues'>Dialogues</Link>
          </li>
          <li>
            <a href='#'>News</a>
          </li>
          <li>
            <a href='#'>Music</a>
          </li>
          <li>
            <a href='#'>Settings</a>
          </li>
        </ul>
      </nav>
  );
};

export default Navbar;