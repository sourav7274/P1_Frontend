import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
    const { wishlist } = useSelector((state) => state.wishlist);

    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-dark px-4 text-white py-4">
                <div className="container container-fluid">
                    <Link className="navbar-brand text-white" to="/">E-Commerce maybe????</Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
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
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/wishlist">
                                    <i className="fas fa-heart"></i> Wishlist
                                    {wishlist.length > 0 && (
                                        <span
                                            style={{
                                                display: 'inline-block',
                                                width: '8px',
                                                height: '8px',
                                                backgroundColor: 'red',
                                                borderRadius: '50%',
                                                marginLeft: '5px',
                                            }}
                                        ></span>
                                    )}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/cart">
                                    <i className="fas fa-shopping-cart"></i> Cart
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/user">
                                   <img alt="userPng" style={{ height: "30px", width:"30px"}} src='https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=is&k=20&c=0nUqNCdx5lQnefamkMzDW5OD_8jMpsGVQdv7TOVL0UI=' />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
