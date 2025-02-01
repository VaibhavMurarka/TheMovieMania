import React, { useContext, useEffect, useState } from "react";
import { server, Context } from "../../main.jsx";
import { MovieCard } from "../moviecard/MovieCard.jsx";
import LoadingBar from "react-top-loading-bar";
import axios from "axios";
import { Navigate } from "react-router";
import { ToastContainer } from "react-toastify";
import cookie from "react-cookies";
import Header from "../header/Header.jsx";
import Loader from "../loader/Loader.jsx";

export const Watched = () => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, refresh, setRefresh, watched, setWatched } =
    useContext(Context);
  console.log(progress);
  const token = cookie.load("token");
  if (!isAuthenticated) return <Navigate to={"/"} />;
  useEffect(() => {
    axios
      .get(`${server}/movies/watched`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        withCredentials: true,
      })
      .then((res) => {
        setWatched(res.data.data);
        setRefresh(false);
        setLoading(false);
      });
  }, [refresh, setWatched, setRefresh]);

  return (
    <div>
      <Header />
      <div>
        <LoadingBar progress={100} onLoaderFinished={() => setProgress(0)} />
        <ToastContainer className={"toasty"} closeButton="false" />
        <div className="top-container">
          <h1 className="page-head">
            <div className="v-line"></div>Watched Movies
          </h1>
          <div className="card-container">
            {watched.length ? (
              <div className="cards">
                {watched.map((movie) => (
                  <MovieCard
                    key={movie.movie.id}
                    movie={movie.movie}
                    type="watched"
                    id={movie.id}
                  />
                ))}
              </div>
            ) : (
              <div>
           {loading?<Loader/>:<h2 className="no">No movies in your watched list..</h2>}
           </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watched;
