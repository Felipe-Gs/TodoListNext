import Link from "next/link";
import React from "react";

import styles from "../styles/nav.module.css";

const NavBar = () => {
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "white",
        height: "100px",
        alignItems: "center",
        gap: "5rem",
        padding: "10px",
      }}
    >
      <Link className={styles.nav} href="/TerceiraTela">
        Pagina 1
      </Link>
      <Link className={styles.nav} href="/TerceiraTela">
        Pagina 2
      </Link>
    </div>
  );
};

export default NavBar;
