const axios = require('axios')
const axiosRetry = require('axios-retry')
const parser = require('./utils/parser')
const writer = require('./utils/writer')

const host = 'https://spring.io'
const blogURL = `${host}/blog`
const totalPages = 426;
const pageList = Array.from({ length: totalPages }, (v, i) => i++)
    .slice(1)
    .map(num => `${blogURL}?page=${num}`)

axiosRetry(axios, {
    retries: 3, retryDelay: (retryCount) => {
        return retryCount * 1000;
    }
})

async function main() {
    for (let pageURL of pageList) {
        await axios.get(pageURL)
            .then(async function (response) {
                console.log(pageURL)
                const articleInfoList = parser.getArticleInfoList(response.data)
                relURL2Abs(articleInfoList)

                await writer.write2README(articleInfoList)
            })
            .catch(function (error) {
                console.log('errrrrrrror...', pageURL)
            });
    }
}

function relURL2Abs(list) {
    return list.forEach(i => i.url = `${host}${i.url}`)
}

main()