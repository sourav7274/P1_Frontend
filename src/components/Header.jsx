import React from "react";
import { useSelector } from "react-redux";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import "./Header.css"; // Custom CSS file for styling
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const cartCount = useSelector((state) => state.cart.cart.length);
  const wishlistCount = useSelector((state) => state.wishlist.wishlist.length);
  const { user } = useSelector((state) => state.user);
  // console.log(user);
  return (
    <header className="header">
      <div className="px-4 py-2 d-flex justify-content-between align-items-center">
        {/* Logo */}
        <h1 className="logos">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            ShopMate
          </Link>
        </h1>

        {/* Navigation Links */}
        <div className="links d-flex gap-4">
          <NavLink
            to="/games"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Games
          </NavLink>
          <NavLink
            to="/phones"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Phones
          </NavLink>
          <NavLink
            to="/jackets"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Jackets
          </NavLink>
          <NavLink
            to="/books"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Books
          </NavLink>
        </div>

        {/* Icons */}
        <div className="icons">
          <div className="icon-wrapper">
            <Link to="/cart">
              <FaShoppingCart className="icon cart-icon" />
              <span className="badge">{cartCount}</span>
            </Link>
          </div>
          <div className="icon-wrapper">
            <Link to="/wishlist">
              <FaHeart className="icon wishlist-icon" />
              <span className="badge">{wishlistCount}</span>
            </Link>
          </div>
          <div>
            <Link  to="/user">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
