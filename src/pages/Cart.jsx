import Header from "../components/Header";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../features/cart/cart";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Cart = () => {
    const [tprice,setPrice] = useState()
    const [dis,setDis] = useState(false)
    const [final,setFinal] = useState([])
    const { user } = useSelector((state) => state.user);
    const  cart  = user.cart
    const address = user.address[0]
    const dispatch = useDispatch();

    const fTotal = (data) =>{
        return cart.reduce((acc,curr) => acc+= (curr.price)  ,0)
    }
    console.log(cart)
    useEffect(() =>{
        const  total = fTotal(cart)
        setPrice(total)
    })
    const handleClick = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleBuy = () =>{
        setFinal(cart)
        setDis(true)

        // console.log(final)
    }
    
  
    return (
        <>
            <Header />
            <div className="d-flex flex-column min-vh-100">
                <div className="container mt-5 flex-grow-1">
                    {cart.length === 0 ? (
                        <div className="text-center">
                            <h3>No Items in Cart</h3>
                            <Link
                                className="btn mt-3"
                                to="/"
                                style={{ color: "white", background: "black" }}
                                onMouseEnter={(e) => {
                                    e.target.style.color = "white";
                                    e.target.style.backgroundColor = "grey";
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.color = "white";
                                    e.target.style.backgroundColor = "black";
                                }}
                            >
                                Shop Now
                            </Link>
                        </div>
                    ) : (
                        <main className="container py-4">
                            <ul className="list-group">
                                {cart.map((item) => (
                                    <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
                                        <div>
                                            <b>Name: </b>{item.title || item.name}{" "}
                                            <b>Quantity: </b>{item.quantity}
                                        </div>
                                        <button
                                            onClick={() => handleClick(item._id)}
                                            className="btn btn-danger"
                                        >
                                            Remove from Cart
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <p>Total: $ {tprice}</p>
                            <button onClick={handleBuy} className="btn btn-primary">Check Out</button>
                            <div className="text-center mt-5" style={{ display: (address && address.length == 0) ? "block" : "none"}}>
                                <p className="text-danger mb-4">No Address Saved</p>
                                <Link to='/user' className="btn btn-primary">Make One Here</Link>
                            </div>
                            
                            <div style={{display: dis ? "block" : 'none'}}>
                                <div className="text-center">
                                <h1>Summary</h1>
                                <ul className="list-group">
                                    {final.map((item) =>(<li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
                                        <div>
                                            <b>Name: </b>{item.title || item.name}{" "}
                                            <b>Quantity: </b>{item.quantity}
                                        </div>
                                    </li>))}
                                </ul>
                                <p className="mt-4"><b>Total: $ {fTotal(final)}</b></p>
                                </div>
                                {address && address.length > 0 ? <>   <h3>Dispatched to :</h3>
                                <div className="card">
                                 <div className="card-body">
                                <p><b>Name : </b>{address[0].name}</p>
                                <p><b>Phone Number : </b>{address[0].phnNumber}</p>
                                <p><b>Address</b></p>
                                <p><b>House Number : </b>{address[0].address.houseNo}</p>
                                <p><b>Street Number : </b>{address[0].address.srtNum}</p>
                                <p><b>City : </b>{address[0].address.city}</p>
                                <p><b>State : </b>{address[0].address.state}</p>
                                <p><b>Pincode : </b>{address[0].address.pincode}</p>
                                <p>
                                    <b>Landmarks/Special Directions: </b> 
                                    {address[0].address.landmarks.toLowerCase() === "" || address[0].address.landmarks.toLowerCase() === "na"
                                    ? "No Landmarks or special directions given"
                                    : address[0].address.landmarks}
                                </p>

                            </div>
                        </div></> :<><p>No address saved</p></>}
                            </div>
                        </main>
                    )}
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Cart;
