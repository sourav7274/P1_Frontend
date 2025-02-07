import { useParams } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useSelector, useDispatch } from "react-redux"
import { addToCart } from '../features/cart/cart'
import { addToWishlist } from '../features/wishlist/wishlistSlice'
import { fetchJackets } from "../features/jackets/jacketSLice"
import { useEffect, useState } from "react"



const JacketDetail = () =>{
    const { id } = useParams(); // Destructure 'id' directly
    const dispatch = useDispatch();
    const [selectedImage, setSelectedImage] = useState(""); // Fallback to an empty string

    useEffect(() =>{
        dispatch(fetchJackets())
    },[dispatch])
    const jackets = useSelector((state) => state.jackets.jackets)
    const detail = jackets?.find((item) => item._id === id);

    useEffect(() => {
        if (detail?.imageUrl) setSelectedImage(detail.imageUrl);
    }, [detail]);

    const handleImageSelect = (image) => {
        setSelectedImage(image);
    };

    if (!detail) {
        return (
            <div className="d-flex flex-column min-vh-100">
                <Header />
                <div className="container py-4 text-center">
                    <h2>Jacket Not Found</h2>
                    <p>It seems the jacket you are looking for doesn't exist or has been removed.</p>
                </div>
                <Footer />
            </div>
        );
    }

    return(
        <>
        <div className="d-flex flex-column min-vh-100">
        <Header/>
            <div className="container py-4">
                <div className='row'>
                    <div className='col-md-6'>
                    <img
                                className="img-fluid rounded border mb-3"
                                src={selectedImage || "placeholder-image-url.jpg"} // Add a fallback image URL
                                alt={detail.title || "Jacket Image"}
                            />
                            <div className="d-flex flex-wrap mt-3">
                                {detail.images && detail.images.length > 0 ? (
                                    detail.images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={`Thumbnail ${index + 1}`}
                                            className={`img-thumbnail me-2 mb-2 ${
                                                selectedImage === image ? "border border-primary" : ""
                                            }`}
                                            style={{
                                                cursor: "pointer",
                                                width: "200px",
                                                height: "100px",
                                                objectFit: "cover",
                                            }}
                                            onClick={() => handleImageSelect(image)}
                                        />
                                    ))
                                ) : (
                                    <p>No additional images available</p>
                                )}
                            </div>
                    </div>
                    <div className='col'>
                        <h1>{detail.name}</h1>
                        <p>{detail.description}</p>
                        <p>Material:   {detail.material}</p>
                        <p>Rating: {detail.ratings}</p>
                        <p>Brand: {detail.brand}</p>
                        <p>Insulation Type: {detail.insulationType}</p>
                        <p>Category: {detail.category}</p>
                        <p>Price: $ {detail.price}</p>
                        <p>Colors: {detail.color.join(', ')}</p>
                        <p>Water Resistance: {detail.waterResistance ? "Yes":"NO"}</p>
                        <p>{detail.stock > 5 ? "" : "Only a few Left! Hurry Up"}</p>
                    </div>
                </div>
                <button onClick={() => dispatch(addToWishlist(detail))} className='btn btn-dark me-5'>Add to Wishlist</button>
                <button onClick={() => dispatch(addToCart(detail))} className='btn btn-info ms-5'>Buy Now</button>
            </div>
        <Footer/>
        </div>
        </>
    )   
}


export default JacketDetail