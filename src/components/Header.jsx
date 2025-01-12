import React from "react";
import { useSelector } from "react-redux";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import "./Header.css"; // Custom CSS file for styling
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const cartCount = useSelector((state) => state.cart.cart.length);
  const wishlistCount = useSelector((state) => state.wishlist.wishlist.length);

  return (
    <header className="header">
      <div className="px-4 py-2 d-flex justify-content-between align-items-center">
        {/* Logo */}
        <h1 className="logos">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>ShopMate</Link>
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
            <FaShoppingCart className="icon cart-icon" />
            <span className="badge">{cartCount}</span>
          </div>
          <div className="icon-wrapper">
            <Link to="/wishlist">
              <FaHeart className="icon wishlist-icon" />
              <span className="badge">{wishlistCount}</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
