import React, { useContext } from "react";
import { BsEyeFill } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { AiFillEyeInvisible } from "react-icons/ai";
import "./moviecontrol.css";
import { server, Context } from "../../main.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import cookie from 'react-cookies'

export const MovieControls = ({ movie, type }) => {
  const { setRefresh } = useContext(Context);
  const token = cookie.load("token");

  const changeType = async () => {
    await axios.put(
      `${server}/movies/changetype`,
      { movie, type },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        withCredentials: true,
      }
    );
    toast(`Moved to ${type === "watchlist" ? "watched" : "watchlist"}`, {
      autoClose: 1000,
      closeOnClick: false,
      pauseOnHover: false,
      theme: "dark",
    });
    setRefresh(true);
  };
  const deleteMovie = async () => {
    await axios.delete(`${server}/movies/deletemovie`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
      withCredentials: true,
      data: {
        movie: movie
      }
    });
    toast(`Movie Deleted`, {
      autoClose: 1000,
      closeOnClick: false,
      pauseOnHover: false,
      theme: "dark",
    });
    setRefresh(true);
  };
  return (
    <div className="controls">
      <div className="card-control">
        <button
          className="ctrl-btn"
          onClick={() => changeType()}
          title={type === "watchlist" ? "Mark as Watched" : "Move to Watchlist"}
        >
          {type === "watchlist" ? <BsEyeFill /> : <AiFillEyeInvisible />}
        </button>
        <button
          className="ctrl-btn"
          onClick={() => deleteMovie()}
          title="Remove"
        >
          <RxCross1 />
        </button>
      </div>
    </div>
  );
};

export default MovieControls;
