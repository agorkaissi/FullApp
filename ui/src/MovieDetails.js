import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import MovieActors from "./MovieActors";

const MovieDetails = () => {
    const [movie, setMovies] = useState([]);
    const [actors, setActors] = useState([]);
    const navigate = useNavigate();
    const {id} = useParams();
    const [isActorListOpen, setIsActorListOpen] = useState(false);


    const backMovies = () => {
        navigate("/movies");
    };

    useEffect(() => {
        const fetchMovies = async () => {
            const response = await fetch(`/movies/${id}`);
            if (response.ok) {
                const movies = await response.json();
                setMovies(movies);
                console.log(movies)
            }
        };
        fetchMovies();
    }, [id]);

    useEffect(() => {
        const fetchActors = async () => {
            if (!movie) return;
            const response = await fetch(`/movies/${id}/actors`);
            if (response.ok) {
                const data = await response.json();
                setActors(data);
            }
        };
        fetchActors();
    }, [movie, id]);

    const refreshActors = async () => {
        const response = await fetch(`/movies/${id}/actors`);
        if (response.ok) {
            const data = await response.json();
            setActors(data);
        }
    };

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
                        <button onClick={backMovies}>Back to Movies</button>
                    </div>
                    <div className="box bottom">
                        <table>
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Year</th>
                                <th>Director</th>
                                <th>Description</th>
                                <th>Actors</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {movie && (
                                <tr key={movie.id}>
                                    <td>{movie.title}</td>
                                    <td>{movie.year}</td>
                                    <td>{movie.director}</td>
                                    <td>{movie.description}</td>
                                    <td>
                                        {actors.length > 0
                                            ? actors.map(a => `${a.name} ${a.surname}`).join(", ")
                                            : "—"}
                                    </td>
                                    <td>
                                        <button className="button button-outline"
                                                onClick={() => setIsActorListOpen(true)}>Add Actor
                                        </button>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                        <div>

                            <MovieActors
                                id={id}
                                isOpen={isActorListOpen}
                                onClose={() => setIsActorListOpen(false)}
                                onUpdate={refreshActors} // <- nowy props
                            />

                        </div>
                    </div>
                </div>
            </main>
            <footer>
                <div className="container">
                    <p>&#169; 2026 My Movie Database. All rights reserved</p>
                </div>
            </footer>
        </>
    );
};

export default MovieDetails;