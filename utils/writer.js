const fs = require('fs')

const Category = [
    { name: "Engineering", file: "./README.md" },
    { name: "Releases", file: "./release.md" },
    { name: "News and Events", file: "./newsAndEvents.md" },
]

async function write2README(articleInfoList) {
    const promiseAll = []

    for (let type of Category) {
        const data = articleInfoList
            .filter(item => type.name === item.category)
            .map(item => articleInfo2MarkdownContent(item))
            .join('')

        if (data.length == 0) { continue; }

        promiseAll.push(fs.appendFile(type.file, data, err => {
            if (err) {
                console.error('write error', err)
            }
        }))
    }

    await Promise.all(promiseAll)
}

function articleInfo2MarkdownContent(article) {
    return `- ${getDate(article.postTime)} [${article.title}](${article.url}) \n`;
}

function getDate(postTime) {
    return postTime.split(' ')[0]
}

module.exports = { write2README }