import Header from "../components/Header";
import Footer from "../components/Footer";
import { pro } from "../App";


const Cart = () => {
    return (
        <div>
        <Header />
        <div className="container py-4">
            <div className="row">
              {pro.length > 0 ? pro.map(p => (
                <div className="col-md-4" key={p.id}>
                    <div className="card">
                        <img className="card-img-top" src={p.image} alt={p.name} />
                        <div className="card-body">
                            <h5 className="card-title">{p.name}</h5>
                            <p className="card-text">{p.category}</p>
                            <p className="card-text">{p.price}</p>
                        </div>
                    </div>
                </div>
              )) : <h1>No Items in the cart</h1>}
            </div>
        </div>
        <Footer />
    </div>

    )
}

export default Cart;    