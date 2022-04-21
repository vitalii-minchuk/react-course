import React from "react";
import { Link } from "react-router-dom";
import s from "./Header.module.css"

const Header = (props) => {
  const onLogout = () => {
    props.logout()
  };

  return (
    <header className={s.header}>
      <img className={s.logo} src="https://www.pngplay.com/wp-content/uploads/13/Freepnglogos-Free-PNG.png" />
      <div className={s.loginBox}>
        {props.isAuth 
          ? <div className={s.text}>
              {props.login}
              <button onClick={onLogout} className={s.logoutBtn}>LOGOUT</button>
            </div>
          : <Link to={"/login"} className={s.logoutBtn}>LOGIN</Link>
        }
      </div>
    </header>
  );
};

export default Header;