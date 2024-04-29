import React from 'react'
import CardMovie from './card-movie';
import styles from "./card-movie.module.css"

const CardsMovie = ({movies}) => {
  return (
    <div className="container">
        <div className={styles.cards}> 
            {movies.map((movie) => {
                return <CardMovie 
                key={movie.id}
                id={movie.id} 
                name={movie.name}
                cover={movie.poster.url}
                year={movie.year}
                rating={movie.rating.kp}
                country={movie.countries[0].name}
            />;
        })}
        </div>

    </div>
  )
}

export default CardsMovie