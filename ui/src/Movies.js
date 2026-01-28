import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import MovieForm from "./MovieForm";
import MoviesList from "./MoviesList";

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [addingMovie, setAddingMovie] = useState(false);
    const navigate = useNavigate();

    const backHome = () => {
        navigate("/");
    };

    useEffect(() => {
        const fetchMovies = async () => {
            const response = await fetch(`/movies`);
            if (response.ok) {
                const movies = await response.json();
                setMovies(movies);
            }
        };
        fetchMovies();
    }, []);


    async function handleAddMovie(movie) {
        const response = await fetch('/movies', {
            method: 'POST',
            body: JSON.stringify(movie),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            const addingResponse = await response.json();
            movie.id = addingResponse.id;
            setMovies([...movies, movie]);
            setAddingMovie(false);
        }
    }

    async function handleDeleteMovie(movie) {
        const url = `/movies/${movie.id}`;
        const response = await fetch(url, {method: 'DELETE'});
        if (response.ok) {
            const nextMovies = movies.filter(m => m !== movie);
            setMovies(nextMovies);
        }
    }


    return (
		<>
            <header>
                <div className="container">
                    <h1>My favourite movie to watch</h1>
                </div>
            </header>
            <main>
                <div className="container">
                    <div className="box top">
                        <button onClick={backHome}>Back to Home</button>
                        <h1>Movies Database</h1>
                    </div>
                    <div className="box bottom">
                        {movies.length === 0
                            ? <p>No movies yet. Maybe add something?</p>
                            : <MoviesList movies={movies}
                                          onDeleteMovie={handleDeleteMovie}
                            />}
                        {addingMovie
                            ? <MovieForm onMovieSubmit={handleAddMovie}
                                         buttonLabel="Add a movie"
                            />
                            : <button class="button button-outline" onClick={() => setAddingMovie(true)}>Add a movie</button>}
                    </div>
                </div>
            </main>
            <footer>
                <div className="container" >
                    <p>&#169; 2026 My Movie Database. All rights reserved</p>
                </div>
            </footer>
        </>
  );
};

export default Movies;