'use strict'

function onInit() {
    renderBooks()
    renderCurrentPage()
}

function renderBooks() {
    var books = getBooks()
    var headStrHTML =
        `<tr>\n
    <th data-trans="id" class = "th id" onclick="onSortClick()"> id </th>\n
    <th data-trans="book-title" class = "th title" onclick="onSortClick()"> title </th>\n
    <th data-trans="img" class = "th img"> preview </th>\n
    <th data-trans="rate" class = "th rate" onclick="onSortClick()"> rate </th>\n
    <th data-trans="popular" class = "th popular"> popular </th>\n
    <th data-trans="price" class = "th price" onclick="onSortClick()"> price </th>\n
    <th data-trans="read" class = "th read"> read </th>\n
    <th data-trans="update" class = "th update"> update </th>\n
    <th data-trans="delete" class = "th delete"> delete </th>\n
    </tr>\n`
    document.querySelector('.thread-container').innerHTML = headStrHTML
    var cellStrHTML = books.map(book =>
        `<tr>\n
    <td class = "cell id" > #${book.id} </td>\n
    <td class = "cell title"> 📗 ${book.title} </td>\n
    <td class = "cell img"><img src="Book-shop/img/${book.title}.webp" alt="No preview"></td>\n
    <td class = "cell rate"> ${book.rate}# </td>\n
    <td class = "cell popular"> ${checkPopularity(book)} </td>\n
    <td class = "cell price"> 💲${book.price} </td>\n
    <td class = "cell read" onclick = "onReadModal('${book.title}', ${book.id})"> 📖 </td>\n
    <td class = "cell update" onclick = "onUpdateModal('${book.title}', ${book.id}, ${book.rate}, ${book.price})"> 🗂️ </td>\n
    <td class = "cell delete" onclick = "onDeletebook(${book.id})"> ⛔ </td>\n
    </tr>\n
    `)
    document.querySelector('.tbody-container').innerHTML = cellStrHTML.join('')
}

function checkPopularity(book) {
    return (book.rate > 7) ? '❤️' : '🤍'
}

function onAddBook() {
    const name = prompt('Please insert the name')
    const price = prompt('Please insert the price')
    const newBook = getNewBook(name, price)
    addNewBook(newBook)
    renderBooks()
    updateLocalStorage()
    popMsg(`Book was added ✔️`, true)
}

function onDeletebook(bookId) {
    const permission = confirm('Are you sure?')
    if (!permission) return
    deleteBook(bookId)
    renderBooks()
    updateLocalStorage()
    popMsg(`Book was deleted ⛔`, false)
}

function popMsg(msg, isGreen) {
    const elPopMsg = document.querySelector('.user-msg')
    elPopMsg.innerText = msg
    const backgroundColor = (isGreen) ? 'green' : 'red'
    elPopMsg.classList.add(backgroundColor)
    setTimeout(() => {
        elPopMsg.classList.remove(backgroundColor)
    }, 3000)
}

function onReadModal(book, id) {
    const elReadModalName = document.querySelector('.read-h1')
    elReadModalName.innerText = book
    const elReadModalId = document.querySelector('.read-h2')
    elReadModalId.innerText = '#' + id
    const elReadModalDesc = document.querySelector('.read-h3')
    elReadModalDesc.innerText = gLorem
    const elReadModal = document.querySelector('.read-modal')
    elReadModal.classList.add('shown')
    setTimeout(() => {
        elReadModal.classList.remove('shown')
    }, 5000)
}

function onUpdateModal(book, id, rate, price) {
    currBookForUpdate(book)
    const elUpdateModalName = document.querySelector('.name-h1')
    elUpdateModalName.innerText = book
    const elUpdateModalId = document.querySelector('.id-h2')
    elUpdateModalId.innerText = '#' + id
    const elUpdateModalPrice = document.querySelector('.price-h1')
    elUpdateModalPrice.innerHTML = `<input class="price-form" type="text" value = ${price + '💲'}  placeholder="old price: ${price}💲" />`
    const elUpdateModalRate = document.querySelector('.rate-h1')
    elUpdateModalRate.innerText = rate + '#'
    const elUpdateModal = document.querySelector('.update-modal')
    elUpdateModal.classList.add('shown')
}

function onRateClick(event, action) {
    event.stopPropagation()
    event.preventDefault()
    const elPriceRateBook = document.querySelector('.rate-h1')
    var currRate = Number(elPriceRateBook.innerText.replace('#', ''))
    if (action === '-' && currRate >= 1) currRate--
    else if (action === '+' && currRate < 10) currRate++
    elPriceRateBook.innerText = currRate + '#'
}

function onBookUpdate(event) {
    event.stopPropagation()
    event.preventDefault()
    const elUpdateModalPrice = document.querySelector('.price-form')
    const newPrice = Number(elUpdateModalPrice.value.replace('💲', ''))
    const elUpdateModalRate = document.querySelector('.rate-h1')
    const newRate = elUpdateModalRate.innerText.replace('#', '')
    updateChosenBook(newPrice, newRate)
    onCloseModal()
    renderBooks()
    updateLocalStorage()
    popMsg(`Book was update 🗃️`, true)
}

function onCloseModal() {
    const elUpdateModal = document.querySelector('.update-modal')
    elUpdateModal.classList.remove('shown')
}

function onSetFilterBy(filterBy) {
    filterBy = setBookFilter(filterBy)
    renderBooks()
}

function onSetSortBy() {
    const prop = document.querySelector('.sort-by').value
    const isDesc = document.querySelector('.sort-desc').checked

    const sortBy = {}
    sortBy[prop] = (isDesc) ? -1 : 1

    setBookSort(sortBy)
    renderBooks()
}

function onKeyUpSearch() {
    setTimeout(() => {
        const searchStr = document.querySelector('.search-input').value
        const filterBy = setBookFilter(searchStr)
        renderBooks()
        document.querySelector('.search-input').value = searchStr

        const queryStringParams = `?title=${filterBy.title}`
        const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
        window.history.pushState({ path: newUrl }, '', newUrl)
    }, 1000);
}

function onNextPage() {
    nextPage()
    renderBooks()
    renderCurrentPage()
}

function onPrevPage() {
    prevPage()
    renderBooks()
    renderCurrentPage()
}

function renderCurrentPage() {
    const elPage = document.querySelector('.page-number')
    if (getLang() === 'en') elPage.innerText = `page ${getPageNumber()}`
    else elPage.innerText = `עמוד ${getPageNumber()}`
}

function onSetLang(lang) {
    setLang(lang)
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')
    doTrans()
    renderCurrentPage()
}
