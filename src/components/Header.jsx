import { Link } from 'react-router-dom';

const Header = ({cartsItem}) => {
    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-primary-subtle px-3">
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
                <div className="position-relative">
                    <Link to="/cart">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black" className="bi bi-cart" viewBox="0 0 16 16">
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                        </svg>
                        {cartsItem > 0 && (
                            <span className="position-absolute top-100 start-50 translate-middle badge rounded-pill bg-danger">
                                {cartsItem}
                            </span>
                        )}
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default Header;
