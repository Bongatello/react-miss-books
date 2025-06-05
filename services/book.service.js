import { loadFromStorage, makeId, saveToStorage, makeLorem, getRandomIntInclusive } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'booksDB'

export const bookService ={
    query,
}



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

function _createBooks() {
    let books = loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = [
            _createBook('Mitsipedia', 'A wikipedia about cats', 50, 'ILS', true),
            _createBook('Javascript Basics', 'Your entry ticket to the js world!', 75, 'ILS', true),
            _createBook('Coding Tips', 'Everybody needs a tip once in a while', 70, 'ILS', false),
            _createBook()
        ]
        saveToStorage(BOOK_KEY, books)
    }
}


_createBooks()