import books from "../images/books.jpg";
import games from "../images/games.jpg";
import phone from "../images/phone-1869510_1920.jpg";
import jackets from "../images/jackets.jpeg";
import { Link } from "react-router-dom";

const AllProducts = () => {
  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="position-relative">
            <img
              className="img-fluid w-100"
              style={{ height: "300px", objectFit: "cover" }}
              src={games}
              alt="games"
            />
            <h3 className="position-absolute top-0 start-0 text-white m-3">
              Games
            </h3>
            <Link
              to="/games"
              className="btn btn-light position-absolute bottom-0 start-0 m-3"
            >
              Explore
            </Link>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="position-relative">
            <img
              className="img-fluid w-100"
              style={{ height: "300px", objectFit: "cover" }}
              src={jackets}
              alt="jackets"
            />
            <h3 className="position-absolute top-0 start-0 text-dark m-3">
              Jackets
            </h3>
            <Link
              to="/jackets"
              className="btn btn-dark position-absolute bottom-0 start-0 m-3"
            >
              Explore
            </Link>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="position-relative">
            <img
              className="img-fluid w-100"
              style={{ height: "300px", objectFit: "cover" }}
              src={books}
              alt="books"
            />
            <h3 className="position-absolute top-0 start-0 text-white m-3">
              Books
            </h3>
            <Link
              to="/books"
              className="btn btn-light position-absolute bottom-0 start-0 m-3"
            >
              Explore
            </Link>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="position-relative">
            <img
              className="img-fluid w-100"
              style={{ height: "300px", objectFit: "cover" }}
              src={phone}
              alt="phones"
            />
            <h3 className="position-absolute top-0 start-0 text-white m-3">
              Phones
            </h3>
            <Link
              to="/phones"
              className="btn btn-warning position-absolute bottom-0 start-0 m-3"
            >
              Explore
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
