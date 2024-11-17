import Header from "../components/Header"
import Footer from "../components/Footer"
import { fetchBooks } from "../features/books/bookSlice"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"

const Books = () =>{
    const dispatch = useDispatch()
    const {books,status,error }= useSelector(state => state.books)
    // console.log(books)
    useEffect(() => {
        dispatch(fetchBooks())
    },[dispatch])
    return(
        <>
            <Header/>
            <div className="container py-2">
                <h1>Books</h1>
                {status === "loading" && <>
                <button class="btn btn-dark" type="button" disabled>
                <span class="spinner-grow spinner-grow-sm me-4" aria-hidden="true"></span>
                <span role="status">Loading...</span>
                </button>
                </>}
                {error === "loading" && console.log(error) }
                <ul>
                  <div className="row">
                  {books.map(b => (
                        <>  
                            <div className="col-4 my-2">
                                <div className="card" 
                                     style={{border: '1px solid #ddd', borderRadius: '5px', transition: 'transform 0.3s ease-in-out'}} 
                                     onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} 
                                     onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                                <img src={b.coverImageUrl} alt="book.png"/>
                                    <div className="card-body">
                                        <h5 className="card-title">{b.title}</h5>
                                        <div className="d-flex justify-content-between">
                                            <button className="btn btn-primary">Add to cart</button>
                                            <button className="btn btn-primary">Save to Wishlist</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </> )) }
                  </div>
                </ul> 
            </div>
            <Footer/>
        </>
    )
}

export default Books