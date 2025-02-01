import React, { useContext, useEffect, useState } from "react";
import "./watchlist.css";
import { MovieCard } from "../moviecard/MovieCard.jsx";
import { ToastContainer } from "react-toastify";
import { RiSearchEyeLine } from "react-icons/ri";
import {FaTimes, FaBars} from 'react-icons/fa'
import { server, Context } from "../../main.jsx";
import LoadingBar from "react-top-loading-bar";
import axios from "axios";
import { Navigate } from "react-router";
import cookies from "react-cookies";
import Header from "../header/Header.jsx";
import Loader from '../loader/Loader.jsx';

export const Watchlist = () => {
  const [progress, setProgress] = useState(0);
  const [loading , setLoading] = useState(true);

  console.log(progress);
  const { isAuthenticated, refresh, setRefresh, setWatchlist, watchlist } =
    useContext(Context);
  const token = cookies.load("token");
  if (!isAuthenticated) return <Navigate to={"/"} />;
  useEffect(() => {
    axios
      .get(`${server}/movies/watchlist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        setWatchlist(res.data.data);
        setRefresh(false);
        setLoading(false);
      });
  }, [refresh, setRefresh, setWatchlist]);

 

  return (
    <div>
      <Header/>
      <div className="top-container">
      <LoadingBar progress={100} onLoaderFinished={() => setProgress(0)} />
      <h1 className="page-head">
        <div className="v-line"></div>My Watchlist
      </h1>
      <div className="card-container">
        {watchlist.length ? (
          <div className="cards">
            {watchlist.map((movie) => (
              <MovieCard
                key={movie.movie.id}
                movie={movie.movie}
                type="watchlist"
              />
            ))}
          </div>
        ) : (
          <div>
           {loading?<Loader/>:
              <h2 className="no">
                <span className="mobile-text">Add movies by going in <FaBars/> and clicking <RiSearchEyeLine /></span>
                <span className="icon-text">Add movies by clicking <RiSearchEyeLine /></span>
              </h2>
           }
           </div>
        )}
      </div>
      <ToastContainer className={"toasty"} closeButton="false" />
    </div>
    </div>
  );
};

export default Watchlist;
