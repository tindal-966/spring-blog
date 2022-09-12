const fs = require('fs')

async function write2README(articleInfoList) {
    const data = articleInfoList.map((val) => articleInfo2MarkdownContent(val)).join("\n")

    await fs.appendFile('./README.md', data, err => {
        if (err) {
            console.error(err)
        }
    });
}

/**
 * Format: 
 * ### Title
 * Author | PostTimt | Category | [READ MORE](http://xxx)
 * 
 * Intro
 * 
 * ---
 */
function articleInfo2MarkdownContent(article) {
    return `## ${article.title}
${article.author} | ${article.postTime} | ${article.category} | [READ MORE](${article.url})

${article.intro}

---
`;
}

module.exports = { write2README }