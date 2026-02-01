import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import MovieActors from "./MovieActors";

const MovieDetails = () => {
    const [movie, setMovies] = useState(null);
    const [actors, setActors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const {id} = useParams();
    const [isActorListOpen, setIsActorListOpen] = useState(false);
    const navigate = useNavigate();

    const backToMovies = () => {
        navigate("/movies");
    };

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            const response = await fetch(`/movies/${id}`);
            if (response.ok) {
                const movies = await response.json();
                setMovies(movies);
            }
        };
        fetchMovies()
            .finally(() => setLoading(false));
    }, [id]);

    useEffect(() => {
        const fetchActors = async () => {
            setLoading2(true);
            if (!movie) return;
            const response = await fetch(`/movies/${id}/actors`);
            if (response.ok) {
                const data = await response.json();
                setActors(data);
            }
        };
        fetchActors()
            .finally(() => setLoading2(false));
    }, [movie, id]);

    const refreshActors = async () => {
        const response = await fetch(`/movies/${id}/actors`);
        if (response.ok) {
            const data = await response.json();
            setActors(data);
        }
    };

    return (

        <div className="container">
            <div className="section-header">
                <button className="back-button" onClick={backToMovies}>
                    <span className="back-arrow">←</span>
                    <span className="back-text">Back</span>
                </button>

                <h2 className="section-title">Movie Details</h2>
            </div>
            <div>
                {loading && <div className="lds-ellipsis">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>}
            </div>

            {!loading && (
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
                                    {loading2 && <div className="lds-hourglass"></div>}

                                    {!loading2 && (
                                        actors.length > 0
                                            ? actors.map(a => `${a.name} ${a.surname}`).join(", ")
                                            : "—"
                                    )}
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
                            onUpdate={refreshActors}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default MovieDetails;