const fs = require("fs")
const path = require("path")

function generateHTML(pages, letterhead){

const template = fs.readFileSync(
path.join(__dirname,"../template/quotationTemplate.html"),
"utf8"
)

const pagesHTML = pages.map(page => `
<div class="page">

<img class="letterhead" src="${letterhead}" />

<div class="content">
${page.content}
</div>

</div>
`).join("")

return template.replace("{{PAGES}}", pagesHTML)

}

module.exports = generateHTML