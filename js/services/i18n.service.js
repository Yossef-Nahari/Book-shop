var gTrans = {
    title: {
        en: 'Welcome to iBook',
        he: '!ברוכים הבאים לאייבוק'
    },
    filter: {
        en: 'Filter',
        he: 'סינון',
    },
    "min-rate": {
        en: 'Min Rate',
        he: 'רייטינג מינ\'',
    },
    "max-price": {
        en: 'Max Price',
        he: 'מחיר מקס\'',
    },
    placeHolder: {
        en: 'Search book...',
        he: 'חיפוש ספר',
    },
    "sort-head": {
        en: 'Sort by',
        he: ':סינון לפי',
    },
    "select-sorting": {
        en: 'Select Sorting',
        he: 'בחירת סינון',
    },
    "rate-sort": {
        en: 'By Rate',
        he: 'לפי רייטינג',
    },
    "price-sort": {
        en: 'By Price',
        he: 'לפי מחיר',
    },
    Descending: {
        en: 'Descending',
        he: 'סינון-סדר-יורד',
    },
    new: {
        en: 'New',
        he: 'חדש',
    },
    lang: {
        en: 'Language:',
        he: 'שפה:',
    },
    eng: {
        en: 'English:',
        he: 'אנגלית',
    },
    heb: {
        en: 'Hebrew:',
        he: 'עברית',
    },
    id: {
        en: 'id',
        he: 'מק"ט',
    },
    "book-title": {
        en: 'title',
        he: 'שם הספר',
    },
    "img": {
        en: 'preview',
        he: 'תצוגה',
    },
    rate: {
        en: 'rate',
        he: 'דירוג'
    },
    popular: {
        en: 'popular',
        he: 'פופולריות',
    },
    price: {
        en: 'price',
        he: 'מחיר',
    },
    read: {
        en: 'read',
        he: 'קריאה',
    },
    update: {
        en: 'update',
        he: 'עדכון',
    },
    delete: {
        en: 'delete',
        he: 'מחיקה',
    },
}

var gCurrLang = 'en'

function getTrans(transKey) {
    const key = gTrans[transKey]
    if (!key) return 'UNKNOWN'

    var translation = key[gCurrLang]

    if (!translation) translation = key.en

    return translation
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        const transKey = el.dataset.trans
        const translation = getTrans(transKey)

        el.innerText = translation

        if (el.placeholder) el.placeholder = translation
    })
}

function setLang(lang) {
    gCurrLang = lang
    return gCurrLang
}

function getLang() {
    return gCurrLang
}