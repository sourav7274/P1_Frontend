import Header from "../components/Header"
import Footer from "../components/Footer"
import { useDispatch, useSelector } from "react-redux"
import { removeFromCart } from "../features/cart/cart"

const Cart = () =>{
    const {cart} = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    const handleClick = (id) =>{
        console.log(id)
        dispatch(removeFromCart(id))
        console.log(cart)
    }
    console.log(cart)
    return(
        <>
        <Header/>
            <main className="conatiner py-4">
                <ul className="list-group">
                    {cart.map((item) => <li className="list-group-item"> <b>Name:{" "}</b>{item.title || item.name}  <b>{""}Quantity: {" "}</b>{item.price} <button onClick={() => handleClick(item._id)} className="ms-5 btn btn-danger">Delete from Cart</button> </li>)}
                </ul>
            </main>
        <Footer/>
        </>
    )

}

export default Cart