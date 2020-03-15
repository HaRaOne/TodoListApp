// commanderモジュールをprogramとしてインポートする
const program = require("commander");
// fsモジュールをfaオブジェクトとしてインポートする
const fs = require("fs");
// markedモジュール
const md2html = require("./md2html");

// gfmオプションを定義する
program.option("--gfm", "GFMを有効にする")
//コマンドライン引数をcommanderでパースする
//配列に引数の要素だけが入る
program.parse(process.argv);
//ファイルパスをprogram.args配列から取り出す
const filePath = program.args[0];

// コマンドライン引数のオプションを取得し、デフォルトのオプションを上書きする
const cliOptions = {
    gfm: false,
    ...program.opts(),
};

fs.readFile(filePath, "utf8", (err,file) => {
    if (err){
        console.error(err.message);
        // ステータス1: 一般的なエラー
        process.exit(1);
        return;
    }
    // MarkdownファイルをHTML文字列に変換する
    const html = md2html(file, cliOptions);
    console.log(html);
});