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

    function readingType(pageCount){
        if (pageCount<100) return <h3 style={{color: 'DarkGreen'}}>Light Reading</h3> //will stop here if its under 100
        else if (pageCount<500) return <h3 style={{color: 'DarkGoldenRod'}}>Descent Reading</h3> //if its lower than 100, should've stopped at the first if
        else return <h3 style={{color: 'DarkRed'}}>Serious Reading</h3>
    }

    function vintageNew(publishedDate){
        if (publishedDate<2015) return <h3 style={{color: 'DarkRed'}}>Vintage</h3>
        else return <h3 style={{color: 'DarkGreen'}}>New</h3>
    }

    if(!book) return <div>Loading Book...</div>
    return(
        <section className="book-details">
            <h1>Title: {book.title}</h1>
            <img src={book.thumbnail} alt={'image could not be retrieved' + book.thumbnail}/>
            <div style={{ display: 'flex', alignItems: 'center'}}> <h3>Subtitle:</h3><p>{book.subtitle}</p> </div>
            <h3>Authors: {book.authors}</h3>
            {vintageNew(book.publishedDate)}
            {readingType(book.pageCount)}

            <div style={{ display: 'flex', alignItems: 'center'}}> <h3>Description:</h3><p>{book.description}</p> </div>

            <h3>ID: {book.id}</h3>
            <h3 className = {book.listPrice.amount > 150 ? 'expensive' : book.listPrice.amount < 20 ? 'cheap' : ''}>Price: {book.listPrice.amount} {book.listPrice.currencyCode}</h3>
            <h3>{book.listPrice.isOnSale ? 'in stock' : 'out of stock'}</h3>
            
        </section>
    )
}