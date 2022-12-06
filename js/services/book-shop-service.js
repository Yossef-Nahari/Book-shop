'use strict'

const STORAGE_KEY = 'books'
const idKey = 'idKey'
const PAGE_SIZE = 5

var gBooks
var gCurrBookForUpdate
var idNextId = (loadFromStorage(idKey)) ? loadFromStorage(idKey) : 1000
var gFilterBy = { minRate: 0, maxPrice: 300 }
var gPageIdx = 0
var gBookNames = ['Outliers - The Story of Success', 'Who Moved My Cheese', 'Harry Potter and the Deathly Hallows',
    'Number the stars', 'Before We Were Yours - A Novel', 'Frankenstein', '21st Birthday', 'Pride and Prejudice',
    'The Guardians - A Novel', 'Harry Potter and the Half - Blood Prince', 'Harry Potter and the Chamber of Secrets',
    'A Gentleman in Moscow - A Novel', 'Old Man and the Sea', 'Charlotte\'s Web - Full Color Edition', 'The Woman in Cabin 10',
    'The Power of Now', 'Of Mice and Men', 'Harry Potter and the Sorcerer\'s Stone', 'The Book on Pie']

function _createBook(title, price = getRandomIntIncl(50, 200)) {
    return {
        id: idNextId++,
        title,
        price,
        rate: getRandomIntIncl(1, 10),
    }
}

function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)
    if (!books || !books.length) {
        books = []
        const bookNamesLength = gBookNames.length
        for (let i = 0; i < bookNamesLength; i++) {
            var title = getRandomBookName()
            books.push(_createBook(title))
        }
    }
    gBooks = books
    saveToStorage(STORAGE_KEY, gBooks)
    saveToStorage(idKey, idNextId)
}

function getBooks() {
    const startIdx = gPageIdx * PAGE_SIZE
    if (!gBooks) _createBooks()
    const books = gBooks.filter(book => book.rate >= gFilterBy.minRate &&
        book.price <= gFilterBy.maxPrice)
    if (gFilterBy.title !== undefined) {
        const booksFilter = books.filter(book => book.title.toLowerCase().includes(gFilterBy.title.toLowerCase()))
        return booksFilter.slice(startIdx, startIdx + PAGE_SIZE)
    }
    return books.slice(startIdx, startIdx + PAGE_SIZE)
}

function getRandomBookName() {
    const randomName = gBookNames[getRandomIntIncl(0, gBookNames.length - 1)]
    const index = gBookNames.indexOf(randomName)
    gBookNames.splice(index, 1)
    return randomName
}

function getNewBook(name, price) {
    return _createBook(name, price)
}

function addNewBook(newBook) {
    gBooks.push(newBook)
    updateLocalStorage()
}

function updateLocalStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
    saveToStorage(idKey, idNextId)
}

function deleteBook(bookId) {
    const index = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(index, 1)
}

function currBookForUpdate(name) {
    const book = gBooks.find(book => book.title === name)
    gCurrBookForUpdate = book
}

function updateChosenBook(newPrice, newRate) {
    gCurrBookForUpdate.price = newPrice
    gCurrBookForUpdate.rate = newRate
}

function setBookFilter(filterBy = {}) {
    if (typeof filterBy !== 'object') gFilterBy.title = filterBy
    if (filterBy.minRate !== undefined) gFilterBy.minRate = +filterBy.minRate
    if (filterBy.maxPrice !== undefined) gFilterBy.maxPrice = +filterBy.maxPrice
    return gFilterBy
}

function setBookSort(sortBy = {}) {
    if (sortBy.maxPrice) {
        gBooks.sort((b1, b2) => (b1.price - b2.price) * sortBy.maxPrice)
    } else if (sortBy.rate) {
        gBooks.sort((b1, b2) => (b1.rate - b2.rate) * sortBy.rate)
    }
    updateLocalStorage()
}

function getPageNumber() {
    return gPageIdx + 1
}

function nextPage() {
    gPageIdx++
    if (gPageIdx * PAGE_SIZE >= gBooks.length) {
        gPageIdx--
    }
}

function prevPage() {
    gPageIdx--
    if (gPageIdx * PAGE_SIZE <= 0) {
        gPageIdx = 0
    }
}

