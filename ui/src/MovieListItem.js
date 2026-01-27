import { useNavigate } from "react-router-dom";

export default function MovieListItem(props) {
    const navigate = useNavigate();
    return (
        <div className ="clickable" onClick={() => navigate(`/movies/${props.movie.id}`)}>
            <div className="button-movies">
                <strong>{props.movie.title}</strong>
                {' '}
                <span>({props.movie.year})</span>
                {' '}
                directed by {props.movie.director}
                {' '}
                <button onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        props.onDelete();
                    }}>Delete</button>
            </div>
            {props.movie.description}
        </div>
    );
}
