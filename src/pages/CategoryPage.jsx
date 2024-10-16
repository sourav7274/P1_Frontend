import { products } from "./home";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Category = () =>{
    const { category } = useParams();
    const filteredProducts = products.filter(product => product.category === category);

    return (
        <div className="bg-info-subtle">
        <Header />
        <div className="container py-4 my-5">
        <h1>Category: {category}</h1>
        <div className="row">
            {filteredProducts.map(product => (
                <div key={product.id} className="col-md-4">
                    <div className="card">
                        <img className="card-img-top" src={product.image} alt={product.name} />
                        <div className="card-body">
                            <h5 className="card-title">Name: {product.name}</h5>
                            <p className="card-text">Price: {product.price}</p>
                            <p className="card-text">Rating: {product.rating}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        </div>
        <Footer />
        </div>
    );
}
export default Category;