import React from "react";
import s from "./Header.module.css"

const Header = () => {
  return (
    <header className={s.header}>
      <img className={s.logo} src="https://www.pngplay.com/wp-content/uploads/13/Freepnglogos-Free-PNG.png" />
    </header>
  );
};

export default Header;