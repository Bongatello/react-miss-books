const { Link } = ReactRouterDOM
export function BookPreview({book}) {

    return(
        <div className="book-preview">
            <h2>Title: {book.title}</h2>
            <h4>Description: {book.description}</h4>
            <h5>Price: {book.listPrice.amount} {book.listPrice.currencyCode}</h5>
            <h5>ID: {book.id}</h5>
            <h5>{book.listPrice.isOnSale ? 'in stock' : 'out of stock'}</h5>
            <Link to={`/book/${book.id}`}><button>Details</button></Link>
        </div>
    )
}