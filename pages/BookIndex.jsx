import BookFilter from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"

const { useEffect, useState } = React


export function BookIndex(){
    const [books, setBooks] = useState(null)

    useEffect(()=> {
        loadBooks()
    }, [])

    function loadBooks(){
        bookService.query('')
            .then(setBooks)
            .catch(err => {
                console.log("Books couldn't be fetched: ", err)
                setBooks([])
            })
    }
    if (!books) return <div>Loading Data...</div>
    return(
        <section className="car-index">
            <BookList books={books}/>
        </section>
    )
}
