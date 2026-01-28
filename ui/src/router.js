import { createBrowserRouter } from "react-router-dom";

import Layout from "./Layout";
import Home from "./Home";
import Movies from "./Movies";
import Actors from "./Actors";
import MovieDetails from "./MovieDetails";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/movies",
                element: <Movies />
            },
            {
                path: "/actors",
                element: <Actors />
            },
            {
                path: "/movies/:id",
                element: <MovieDetails />
            }
        ]
    }
]);

export default router;
