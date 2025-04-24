import books from "../images/books.jpg";
import games from "../images/games.jpg";
import phone from "../images/phone-1869510_1920.jpg";
import jackets from "../images/jackets.jpeg";
import { Link } from "react-router-dom";

const AllProducts = () => {
  return (
    <div className="container">
      <div style={{ position: "relative" }}>
        <img
          className="img-fluid"
          style={{ width: "100%", maxHeight: "700px" }}
          src={games}
          alt="games.png"
        />
        <h3
          style={{
            position: "absolute",
            top: "10%",
            left: "10%",
            color: "white",
            padding: "5px",
          }}
        >
          Games
        </h3>
        <Link
          style={{
            position: "absolute",
            top: "45%",
            left: "10%",
            color: "black",
            padding: "5px",
          }}
          to="/games"
          className="btn"
        >
          <h5>Explore The Collection</h5>
        </Link>
      </div>
      <div style={{ position: "relative" }}>
        <img
          className="img-fluid"
          style={{ width: "100%", maxHeight: "700px" }}
          src={jackets}
          alt="jacket.png"
        />
        <h3
          style={{
            position: "absolute",
            top: "10%",
            left: "10%",
            color: "black",
            padding: "5px",
          }}
        >
          Jackets
        </h3>
        <Link
          style={{
            position: "absolute",
            top: "45%",
            left: "10%",
            color: "black",
            padding: "5px",
          }}
          to="/jackets"
          className="btn text-light"
        >
          <h5>Explore The Collection </h5>{" "}
        </Link>
      </div>
      <div style={{ position: "relative" }}>
        <img
          className="img-fluid"
          style={{ width: "100%", maxHeight: "700px" }}
          src={books}
          alt="books.png"
        />
        <h3
          style={{
            position: "absolute",
            top: "10%",
            left: "10%",
            color: "white",
            padding: "5px",
          }}
        >
          Books
        </h3>
        <Link
          style={{
            position: "absolute",
            top: "45%",
            left: "10%",
            color: "black",
            padding: "5px",
          }}
          to="/books"
          className="btn text-light"
        >
          <h5>Explore The Collection </h5>{" "}
        </Link>
      </div>
      <div style={{ position: "relative" }}>
        <img
          className="img-fluid"
          style={{ width: "100%", maxHeight: "645px" }}
          src={phone}
          alt="phones/png"
        />
        <h3
          style={{
            position: "absolute",
            top: "10%",
            left: "10%",
            color: "white",
            padding: "5px",
          }}
        >
          Phones
        </h3>
        <Link
          style={{
            position: "absolute",
            top: "45%",
            left: "10%",
            color: "black",
            padding: "5px",
          }}
          to="/phones"
          className="btn text-warning"
        >
          <h5>Explore The Collection </h5>{" "}
        </Link>
      </div>
    </div>
  );
};

export default AllProducts;
