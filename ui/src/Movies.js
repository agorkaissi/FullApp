import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import MovieForm from "./MovieForm";
import MoviesList from "./MoviesList";

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [addingMovie, setAddingMovie] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const backHome = () => {
        navigate("/");
    };

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            const response = await fetch(`/movies`);
            if (response.ok) {
                const movies = await response.json();
                setMovies(movies);
            }
        };
        fetchMovies()
            .finally(() => setLoading(false));
    }, []);


    async function handleAddMovie(movie) {
        const response = await fetch('/movies', {
            method: 'POST',
            body: JSON.stringify(movie),
            headers: {'Content-Type': 'application/json'}
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
        <div className="container">
            <div className="section-header">
                <button className="back-button" onClick={backHome}>
                    <span className="back-arrow">←</span>
                    <span className="back-text">Back</span>
                </button>

                <h2 className="section-title">Movie database</h2>

            </div>

            <div className="box bottom">
                {loading && <div className="lds-ellipsis">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>}
                {!loading && (
                    <div>
                        {movies.length === 0
                            ? <p>No movies yet. Maybe add something?</p>
                            : <MoviesList movies={movies}
                                          onDeleteMovie={handleDeleteMovie}
                            />}
                        {addingMovie
                            ? <MovieForm onMovieSubmit={handleAddMovie}
                                         buttonLabel="Add a movie"
                            />
                            : <button class="button button-outline" onClick={() => setAddingMovie(true)}>Add a
                                movie</button>}
                    </div>
                )}
            </div>

        </div>
    );
};

export default Movies;