import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import MovieForm from "./MovieForm";
import MoviesList from "./MoviesList";
import {Modal} from "antd";

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [addingMovie, setAddingMovie] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const backHome = () => {
        navigate("/");
    };

    const confirmDeleteMovie = (movie) => {
        Modal.confirm({
            title: "Are you sure you want to remove this movie?",
            className: "milligram-confirm",
            content: `${movie.title}`,
            okText: "Yes",
            cancelText: "No",
            okType: "danger",
            style: {border: "2px solid #9b4dca", borderRadius: "6px"},
            okButtonProps: {
                className: "button button-outline"
            },
            cancelButtonProps: {
                className: "button"
            },
            onOk() {
                return handleDeleteMovie(movie);
            },
        });
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
        try {
            const url = `/movies/${movie.id}`;
            const response = await fetch(url, {method: 'DELETE'});

            if (!response.ok) {
                throw new Error("Delete failed");
            }
            const nextMovies = movies.filter(m => m.id !== movie.id);
            setMovies(nextMovies);

        } catch (err) {
            Modal.error({
                title: "Error",
                content: "Movie removal not finalised",
            });
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
                                          onDeleteMovie={confirmDeleteMovie}
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