import React from "react";
import styles from "./card-movie.module.css";

const CardMovie = ({ id, name, year = "", rating = "", country="", cover }) => {
  return (
    <a style={{textDecoration:"none", color:"#000"}} href={`/movie/${id}`}>
      <div className={styles.card}>
        <div className={styles.wrapperImg}><img className={styles.img} src={cover} alt="cover" /></div>
        <div className={styles.wrapperContent}>
          <div className={styles.rating}>{rating != "" ? rating.toFixed(1): ''}</div>
          <div className={styles.content}>
              <div className={styles.name}>{name}</div>
              <div className={styles.text}>{country}, {year}</div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default CardMovie;
