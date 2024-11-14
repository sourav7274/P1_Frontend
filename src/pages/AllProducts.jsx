import { useEffect } from "react"
import { fetchBooks } from "../features/books/bookSlice"
import { fetchGames } from "../features/games/gameSlice"
import { fetchPhones } from "../features/phones/phoneSlice"
import { fetchJackets } from "../features/jackets/jacketSLice"
import { useSelector,useDispatch } from "react-redux"

const AllProducts = () =>{
    const dispatch = useDispatch()
    const book = useSelector(state => state.books.books)
    const jackets = useSelector(state => state.jackets.jackets)
    const games = useSelector(state => state.games.games)
    const phone = useSelector(state => state.phone.phones)
    const products = [...book,...jackets,...phone,...games]
    console.log(products)
    useEffect(() => {
        dispatch(fetchBooks())
        dispatch(fetchGames())
        dispatch(fetchJackets())
        dispatch(fetchPhones())
    },[dispatch])
    return(
        <div className="container">
            <h1 className="text-center my-4">E-commerce App</h1>
            <div className="row">
                <div className="col">
                    <h1>Books</h1>
                </div>
                <div className="col">
                    <h1>Games</h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <h1>Jackets</h1>
                </div>
                <div className="col">
                    <h1>Phones</h1>
                </div>
            </div>
            <div>
            {/* display products */}
             <ul>
                {products.map((k) => (<li>{k.title || k.name } - {k.author} </li>))}
             </ul>
            </div>
        </div>
    )
}

export default AllProducts