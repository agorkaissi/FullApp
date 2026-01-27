import './App.css';
import {useState,useEffect} from "react";
import {Routes, Route} from "react-router-dom";
import "milligram";
import Home from "./Home";
import Movies from "./Movies";
import Actors from "./Actors";
import MovieDetails from "./MovieDetails";

function App() {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/actors" element={<Actors />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
        </Routes>
    );
}

export default App;
