import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-primary-subtle">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">E-Commerce maybe????</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Category/Electronics">Electronics</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/category/Clothing">Clothing</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/category/Books">Book</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/category/Home & Garden">Home & Garden </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;
