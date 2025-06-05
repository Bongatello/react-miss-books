
export function BookPreview({book}) {

    return(
        <div className="book-preview">
            <h2>Title: {book.title}</h2>
            <h4>Description: {book.description}</h4>
            <h5>Price: {book.listPrice.amount} {book.listPrice.currencyCode}</h5>
            <h5>ID: {book.id}</h5>
            <h5>up for sale? {book.listPrice.isOnSale}</h5>
        </div>
    )
}