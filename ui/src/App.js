import './App.css';
import {Routes, Route} from "react-router-dom";

import "milligram";
import Home from "./Home";
import Movies from "./Movies";
import Actors from "./Actors";
import MovieDetails from "./MovieDetails";
import Layout from "./Layout";

function App() {
    return (
        <Routes element={<Layout />}>
            <Route exact path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/actors" element={<Actors />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
        </Routes>
    );
}

export default App;
