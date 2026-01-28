import {NavLink, Outlet} from "react-router-dom";
import './App.css';

const Layout = () => {
    return (
        <>
            <header className="app-header">
                <div className="container header-row">
                    <h1 className="app-title">
                        My favourite movie to watch
                    </h1>

                    <nav className="app-nav">
                        <NavLink to="/" end>Home</NavLink>
                        <NavLink to="/movies">Movies</NavLink>
                        <NavLink to="/actors">Actors</NavLink>
                    </nav>
                </div>
            </header>
            <main>
                <Outlet/>
            </main>
            <footer>
                <div className="container">
                    <p>&#169; 2026 My Movie Database. All rights reserved</p>
                </div>
            </footer>
        </>
    );
};

export default Layout;
