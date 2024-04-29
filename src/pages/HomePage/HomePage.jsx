import React from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import ReactLoading from 'react-loading';
import CardsMovie from "../../components/card-movie/cards-movie";


const token = "ER6HTQ5-MFAMETA-JAY2DE4-6QKDMA5"


const HomePage = () => {
  const [movies, setMovies] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [loading, setLoading] = React.useState(true);
  
  const getMovies = async (page) => {
    try {
      const response = await axios.get(`https://api.kinopoisk.dev/v1.4/movie?page=${page}&limit=12`, {
        headers: {
          "X-API-KEY": `${token}`,
        },
      });
      setMovies(response.data.docs);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  
  React.useEffect(() => {
    getMovies(currentPage);
  }, [currentPage]);

  const handleChange = (e,page) =>{
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  return (
    <div className="container">
      <h1>Лучшие фильмы</h1>
      {!loading ? 
      <>
      <CardsMovie movies={movies}/>
      <div className="center">
        <Pagination count={100} shape="rounded" onChange={handleChange} />
      </div>
      </>
      : 
      <div className="center"><ReactLoading type="bars" color="black" height={400} width={400} /></div>}
    </div>
  );
};

export default HomePage;
