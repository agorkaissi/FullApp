import {NavLink, Outlet} from "react-router-dom";
import './App.css';

const Layout = () => {
    return (
        <>
            <header className="app-header">
                <div className="container header-row">
                    <h1 className="app-title">
                        <strong>My favourite movie to watch</strong>
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
                    <strong>&#169; 2026 My Movies Database. All rights reserved</strong>
                    <div className="social-icons">
                        <a href="https://x.com/siepomaga" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                            <svg className="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43.36a9.09 9.09 0 0 1-2.88 1.1A4.52 4.52 0 0 0 16.62 0c-2.5 0-4.52 2.01-4.52 4.5 0 .35.04.7.12 1.03C8.45 5.4 4.37 3.58 1.64.7a4.48 4.48 0 0 0-.61 2.26c0 1.56.8 2.94 2.02 3.75a4.52 4.52 0 0 1-2.05-.56v.06c0 2.18 1.56 4 3.63 4.42a4.52 4.52 0 0 1-2.04.08c.58 1.79 2.24 3.1 4.22 3.13A9.07 9.07 0 0 1 0 19.54 12.8 12.8 0 0 0 6.92 21.5c8.3 0 12.84-6.86 12.84-12.8 0-.2 0-.4-.02-.6A9.22 9.22 0 0 0 23 3z"/>
                            </svg>
                        </a>

                        <a href="https://github.com/agorkaissi" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                            <svg className="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.41 7.86 10.94.58.11.79-.25.79-.56v-2.02c-3.2.7-3.87-1.38-3.87-1.38-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.04 1.77 2.73 1.26 3.4.96.11-.75.41-1.26.74-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.07 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.6.23 2.78.11 3.07.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.69.42.36.79 1.07.79 2.16v3.2c0 .31.21.68.8.56A11.52 11.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z"/>
                            </svg>
                        </a>
                        <a
                            href="https://facebook.com/siepomaga/" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                            <svg className="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24h11.495v-9.294H9.692V11.01h3.129V8.309c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.31h3.587l-.467 3.696h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </footer>
        </>
    )
        ;
};

export default Layout;
