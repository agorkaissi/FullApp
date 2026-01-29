import MovieListItem from "./MovieListItem";

export default function MoviesList(props) {
    return <table className="movies-table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Year</th>
                    <th>Director</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {props.movies.map(movie => (
                    <MovieListItem
                        key={movie.id}
                        movie={movie}
                        onDelete={() => props.onDeleteMovie(movie)}
                    />
                ))}
            </tbody>
        </table>
    ;
}
