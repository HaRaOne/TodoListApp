const marked = require("marked")

// 与えたれたオプションを元にMarkdownをHTMLに変換する
module.exports = (markdown, clipOptions) => {
    return marked(markdown, {
        gfm: clipOptions.gfm,
    })
}