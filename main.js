const axios = require('axios')
const parser = require('./utils/parser')
const writer = require('./utils/writer')

const host = 'https://spring.io'
const blogURL = `${host}/blog`
const totalPages = 426;
const pageList = Array.from({ length: totalPages }, (v, i) => i++)
    .slice(1)
    .map(num => `${blogURL}?page=${num}`)


pageList.forEach(async pageURL => {
    await axios.get(pageURL)
        .then(async function (response) {
            const articleInfoList = parser.getArticleInfoList(response.data)
            relURL2Abs(articleInfoList)

            await writer.write2README(articleInfoList)
        })
        .catch(function (error) {
            console.log(error)
        });
})

function relURL2Abs(list) {
    return list.forEach(i => i.url = `${host}${i.url}`)
}