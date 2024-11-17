import { Link } from 'react-router-dom';

const Header = ({cartsItem}) => {
    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-dark px-4 text-white py-4"> {/* Increased padding on the y-axis to make the navbar thicker */}
                <div className="container container-fluid">
                    <Link className="navbar-brand text-white" to="/">E-Commerce maybe????</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item ps-5">
                                <Link className="nav-link text-white" to="/games">Games</Link>
                            </li>
                            <li className="nav-item ps-5">
                                <Link className="nav-link text-white" to="/books">Books</Link>
                            </li>
                            <li className="nav-item ps-5">
                                <Link className="nav-link text-white" to="/phones">Phones</Link>
                            </li>
                            <li className="nav-item ps-5">
                                <Link className="nav-link text-white" to="/jackets">Jackets</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;
