import React from "react";
import axios from "axios";
import { useParams,  useNavigate} from "react-router-dom";
import styles from "./MoviePage.module.css";
import CardMovie from "../../components/card-movie/card-movie";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import ReactLoading from 'react-loading';



const token = "ER6HTQ5-MFAMETA-JAY2DE4-6QKDMA5";



const MoviePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = React.useState([]);
  const [similarMovies, setSimilarMovies] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const getMovieById = async () => {
    try {
      const response = await axios.get(
        `https://api.kinopoisk.dev/v1.4/movie/${id}`,
        {
          headers: {
            "X-API-KEY": `${token}`,
          },
        }
      );
      setMovie(response.data);
      console.log(response.data);
      const genre = response.data.genres[0].name;
      try {
        const response = await axios.get(
          `https://api.kinopoisk.dev/v1.4/movie?page=1&limit=10&genres.name=${genre}`,
          {
            headers: {
              "X-API-KEY": `${token}`,
            },
          }
        );
        setSimilarMovies(response.data.docs);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };


  React.useEffect(() => {
    getMovieById();
  }, []);

  console.log(movie);
  console.log(similarMovies);
  return (
    <div className="container">
      <button className={styles.btn} onClick={() => navigate('/')}><IoArrowBackCircleOutline size={40}/></button>
      {!loading ? 
      <>
        <div className={styles.movie}>
          <div className={styles.content}>
            <div className={styles.name}>{movie.name}</div>
            <div className={styles.contentWrapper}>
              <div className={styles.countryWrapper}>
                <div>{movie.countries && movie.countries[0].name}</div>,
                <div>{movie.year}</div>
              </div>
              <div className={styles.genreWrapper}>
                <div>
                  {movie.genres &&
                    movie.genres.map((genre) => <span>{genre.name}, </span>)}
                </div>
                <div>{movie.movieLength}мин</div>,<div> {movie.ageRating}+</div>
              </div>
            </div>
            <div className={styles.descriptionWrapper}>
              <span className={styles.text}>Описание</span>
              <div className={styles.description}>{movie.description}</div>
            </div>

            <div className={styles.ratingWrapper}>
              <span className={styles.text}>Рейтинг</span>
              <div className={styles.rating}>
                <div className={styles.number}>
                  {" "}
                  {movie.rating && movie.rating.kp.toFixed(1)}
                </div>
                <div className={styles.votes}>
                  {movie.votes && movie.votes.kp} оценок
                </div>
              </div>
            </div>
          </div>

          <img className={styles.img} src={movie.poster && movie.poster.url} />
        </div>

        <div className={styles.personsWrapper}>
          <h1>Актеры</h1>
          <div className={styles.personWrapper}>
            {movie.persons &&
              movie.persons.map(
                (person) =>
                  person.enProfession === "actor" && (
                    <div className={styles.person}>
                      <img src={person.photo} />
                      <span className={styles.perosonName}>{person.name}</span>
                      <span className={styles.personDescription}>
                        {person.description}
                      </span>
                    </div>
                  )
              )}
          </div>
        </div>

        <div className={styles.similarWrapper}>
          <h1>Похожие фильмы</h1>
          <div className={styles.similar}>
          {similarMovies.map((movie) => 
          
              <CardMovie
                key={movie.id}
                id={movie.id}
                name={movie.name}
                cover={movie.poster.url}
              />
            )}
            </div>
        </div>
      </>
      : 
      <div className="center"><ReactLoading type="bars" color="black" height={400} width={400} /></div>}
    </div>
  );
};

export default MoviePage;