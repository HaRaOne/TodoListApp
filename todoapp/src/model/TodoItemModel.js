// 各Todoアイテムに必要な情報を定義する
// id, title, completed

// ユニークなIDを管理する変数
let todoIdx = 0;

export class TodoItemModel {
    // param{string} title Todoアイテムのタイトル
    // param{boolean} completed Todoアイテムが完了済み
    constructor({ title, completed }){
        // idはインスタンスごとに異なる
        this.id = todoIdx++;
        this.title = title;
        this.completed = completed;
    }
}