import React from 'react'
import styles from "./header.module.css";
import logo from "../../image/logo.svg"

const Header = () => {
  return (
      <div className={styles.header}>
          <img src={logo}/>
      </div>
  )
}

export default Header