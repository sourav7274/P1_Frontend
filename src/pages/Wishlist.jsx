import Header from "../components/Header"
import Footer from "../components/Footer"
import { useSelector,useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { removeFromWishList } from "../features/wishlist/wishlistSlice"
import { addToCart } from "../features/cart/cart"


const Wishlist = () =>{
    const {wishlist} = useSelector((state) => state.wishlist)
    // console.log(wishlist)
    const dispatch = useDispatch()
    const handleClick = (abc) =>{
        // console.log(abc)
        dispatch(removeFromWishList(abc))
    }
    const handleCart = (item) =>{
        dispatch(removeFromWishList(item._id))
        dispatch(addToCart(item))
    }
    return(
        <>
        <Header/>
           <div className="container my-5">
            {wishlist.length === 0 ?
            <>
                <div>
                    <h3>No Items in Wishlist</h3>
                    <Link className="btn mt-3"  to="/"
                        style={{color:"black",background:"white"}}
                        onMouseEnter={(e) => {
                            e.target.style.color = "white";
                            e.target.style.backgroundColor="black"}}
                        onMouseLeave={(e) => {
                            e.target.style.color = "black";
                            e.target.style.backgroundColor = "white"
                        }}
                    >Shop Now</Link>
                </div>
            </> : <>
                <div>
                    <ul>
                        <div className="row">
                            {wishlist.map((item) => (
                                <div className="col-4">
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <h2>{item.name || item.title}</h2>
                                            <button onClick={() => handleClick(item._id)} className="btn btn-danger">Remove from wishlist</button>
                                            <button onClick={() => handleCart(item)}>Add To Cart</button>
                                        </div>
                                    </div>
                                </div>
                            ) )}
                        </div>
                    </ul>
                </div>
            </> }
           </div>
        <Footer/>
        </>
    )

}

export default Wishlist