import React from "react";
import { Link } from "react-router-dom";
import s from "./Navbar.module.css"

const Navbar = () => {
  return (
    <nav className={s.nav}>
        <ul className={s.list}>
          <li className={s.item}>
            <Link to='/profile'>Profile</Link>
          </li>
          <li className={s.item}>
            <Link to='/dialogues'>Dialogues</Link>
          </li>
          <li className={s.item}>
            <Link to='/chat'>Chat</Link>
          </li>
          <li className={s.item}>
            <a href='#'>News</a>
          </li>
          <li className={s.item}>
            <a href='#'>Music</a>
          </li>
          <li className={s.item}>
            <Link to='/users'>Users</Link>
          </li>
          <li className={s.item}>
            <a className={s.active} href='#'>Settings</a>
          </li>
        </ul>
      </nav>
  );
};

export default Navbar;