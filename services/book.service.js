import { loadFromStorage, makeId, saveToStorage, makeLorem, getRandomIntInclusive } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'booksDB'

export const bookService ={
    query,
    get,
}

_createBooks()

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regExp.test(book.title))
            }
            if (filterBy.maxPrice) {
                books = books.filter(book => book.listPrice.amount <= filterBy.maxPrice)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}



function getListPrice(amount = 79, currencyCode = 'ILS', isOnSale = true){
    return {amount, currencyCode, isOnSale}
}

function getEmptyBook(title = makeLorem(2), description = makeLorem(5)){
    return {title, description}
}

function _createBook(title, description, amount, currencyCode, isOnSale) {
    const book = getEmptyBook(title,description)
    book.listPrice = getListPrice(amount, currencyCode, isOnSale)
    book.id = makeId()
    return book
}



function _createBooks(){
    const ctgs=['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
    const books=[] 
    for (let i=0; i<20; i++) {
        const book = {
            id: utilService.makeId(),
            title: utilService.makeLorem(2),
            subtitle: utilService.makeLorem(4),
            authors: [utilService.makeLorem(1)],
            publishedDate: utilService.getRandomIntInclusive(1950,2024),
            description: utilService.makeLorem(20),
            pageCount: utilService.getRandomIntInclusive(20,600),
            categories: [ctgs[utilService.getRandomIntInclusive(0,ctgs.length-1)]],
            thumbnail: `http://coding-academy.org/books-photos/${i+1}.jpg`,
            language: "en",
            listPrice: {
                amount: utilService.getRandomIntInclusive(80,500),
                currencyCode: "EUR",
                isOnSale: Math.random()>0.7
            }
        }
        books.push(book)
    }
    console.log('books',books)
    saveToStorage(BOOK_KEY, books)
}