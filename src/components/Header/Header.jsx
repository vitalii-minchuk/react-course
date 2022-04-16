import React from "react";
import { Link } from "react-router-dom";
import s from "./Header.module.css"

const Header = (props) => {
  return (
    <header className={s.header}>
      <img className={s.logo} src="https://www.pngplay.com/wp-content/uploads/13/Freepnglogos-Free-PNG.png" />
      <div className={s.loginBox}>
        {props.isAuth 
          ? <p className={s.text}>{props.login}</p>
          : <Link to={"/login"}>LOGIN</Link>
        }
      </div>
    </header>
  );
};

export default Header;