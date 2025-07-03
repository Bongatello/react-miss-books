import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React
const { useParams } = ReactRouterDOM

export function BookDetails(){
    const [book, setBook] = useState(null)
    const params = useParams()
    
    useEffect(()=> {
        loadBook()
    }, [])

    function loadBook() {
        bookService.get(params.bookId)
            .then(setBook)
            .catch(err =>{
                console.log('err:', err)
            })

    }

    if(!book) return <div>Loading Book...</div>
    return(
        <section className="book-details">
            <h2>Title: {book.title}</h2>
            <h2>Description: {book.description}</h2>
            <h2></h2>
            <h2>ID: {book.id}</h2>
            <h2>Price: {book.listPrice.amount} {book.listPrice.currencyCode}</h2>
            <h2>{book.listPrice.isOnSale ? 'in stock' : 'out of stock'}</h2>
            
        </section>
    )
}