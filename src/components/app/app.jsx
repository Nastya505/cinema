import React from "react";
import {Routes, Route} from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import Layout from "../layout/layout";
import MoviePage from "../../pages/MoviePage/MoviePage";


function App() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Routes>
    <Route path="/" element={<Layout />}>
    <Route index element={<HomePage />} />
    <Route path="movie/:id" element={<MoviePage />} />
    </Route>
  </Routes>
  );
}

export default App;
