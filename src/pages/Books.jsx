import Header from "../components/Header"
import Footer from "../components/Footer"
import { fetchBooks } from "../features/books/bookSlice"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { addToWishlist } from "../features/wishlist/wishlistSlice"
import { addToCart } from "../features/cart/cart"
import { useNavigate } from "react-router-dom"

const Books = () => {
    const dispatch = useDispatch()
    const { books, status, error } = useSelector(state => state.books)
    const [filteredBooks, setFilteredBooks] = useState([]) 
    const [selectedGenre, setSelectedGenre] = useState('All')
    const genres = ['Fiction', "Autobiography", 'Non-fiction', 'Mystery', 'Thriller', 'Science Fiction', 'Fantasy', 'Romance', 'Historical', "Business", 'Biography', 'Self-help', 'Other']
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(fetchBooks())
    }, [dispatch])

    useEffect(() => {
       
        if (books.length > 0) {
            setFilteredBooks(books)
        }
    }, [books]) 
    const handleChange = (e) => {
        setSelectedGenre(e.target.value);
        if (e.target.value === 'All') {
            setFilteredBooks(books);
        } else {
            const sortedBooks = books.filter(book => book.genre.includes(e.target.value))
            setFilteredBooks(sortedBooks);
        }
    }
    const handleWish = (val) =>{
        // console.log(val)
        dispatch(addToWishlist(val))
    }
    const handleCart = (item) =>{
        dispatch(addToCart(item))
    }

    const handleClick = (id) =>{
        navigate(`/book/${id}}`)
    }

    return (
        <>
           <div className="d-flex flex-column min-vh-100">
           <Header />
            <div className="container py-2">
                <h1>Books</h1>
                {status === "loading" && (
                    <button className="btn btn-dark" type="button" disabled>
                        <span className="spinner-grow spinner-grow-sm me-4" aria-hidden="true"></span>
                        <span role="status">Loading...</span>
                    </button>
                )}
                {error && console.log(error)}

                <div className="mb-4">
                    <label>Sort by Genre</label>
                    <select value={selectedGenre} onChange={(e) => handleChange(e)} className="form-select">
                        <option value="All">All</option>
                        {genres.map(genre => (
                            <option key={genre} value={genre}>{genre}</option>
                        ))}
                    </select>
                </div>

                <ul>
                    <div className="row">
                        {filteredBooks.length === 0  && (
                            <p>No books of that genre at the moment, try again later</p>
                        )}
                        {filteredBooks.map(b => (
                            <div key={b.id} className="col-4 my-2">
                                <div className="card"
                                    style={{ border: '1px solid #ddd', borderRadius: '5px', transition: 'transform 0.3s ease-in-out' }}
                                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} >
                                    <img onClick={() => navigate(`/book/${b._id}`)} src={b.coverImageUrl} alt="book.png" />
                                    <div className="card-body">
                                        <Link to="/" className="btn"><h5 className="card-title">{b.title}</h5></Link>
                                        <p className="card-text">Author: {b.author}</p>
                                        <div className="d-flex justify-content-between">
                                            <button onClick={() => handleCart(b)} className="btn btn-primary">Add to cart</button>
                                            <button onClick={() => handleWish(b)} className="btn btn-primary">Save to Wishlist</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </ul>
            </div>
            <Footer />
           </div> 
        </>
    )
}




export default Books