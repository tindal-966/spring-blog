const jsdom = require('jsdom')
const { JSDOM } = jsdom

const articleSel = 'article',
    urlSel = 'h2.blog--title a',
    titleSel = 'h2.blog--title a',
    categorySel = 'a.category',
    authorSel = '.author',
    postTimeSel = '.meta-data--item time',
    introSel = 'section';

function getArticleInfoList(strData) {
    const document = new JSDOM(strData).window.document

    const articleInfoList = []
    document.querySelectorAll(articleSel).forEach(el => {
        articleInfoList.push({
            'url': el.querySelector(urlSel).getAttribute('href'),
            'title': el.querySelector(titleSel).textContent,
            'category': el.querySelector(categorySel).textContent,
            'author': el.querySelector(authorSel)?.textContent,
            'postTime': el.querySelector(postTimeSel).getAttribute('datetime'),
            'intro': removeNewLineChar(el.querySelector(introSel).innerHTML)
        })
    })

    return articleInfoList
}

const REMOVE_NEWLINE_CHAR_REG = /\n/g;
function removeNewLineChar(str) {
    return str.replace(REMOVE_NEWLINE_CHAR_REG, "")
}

module.exports = { getArticleInfoList }