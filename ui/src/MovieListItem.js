import {useNavigate} from "react-router-dom";

export default function MovieListItem(props) {
    const navigate = useNavigate();
    return (
    <tr>
        <td>{props.movie.title}</td>
        <td>{props.movie.year}</td>
        <td>{props.movie.director}</td>
        <td>{props.movie.description}</td>
        <td>
            <input
                className="button button-clear"
                type="button"
                value="More"
                onClick={() => navigate(`/movies/${props.movie.id}`)}
            />
            <input
                className="button button-clear"
                type="button"
                value="Delete"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    props.onDelete();
                }}
            />
        </td>
    </tr>
)
    ;

}
