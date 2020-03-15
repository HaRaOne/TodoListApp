import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { element, render } from "./view/html-util.js";

export class App {
    constructor() {
        // 1. TodoListの初期化
        this.todoListModel = new TodoListModel();
    }

    mount(){
        const formElement = document.querySelector("#js-form");
        const inputElement = document.querySelector("#js-form-input");
        //動的に変化する部分
        const containerElement = document.querySelector("#js-todo-list");
        const todoItemCountElement = document.querySelector("#js-todo-count");

        // 2. TodoListModelの状態が更新されたら表示を更新する
        // "change" というイベントを登録
        // この関数が呼び出されるのは emit("change")が起きた時
        // onChange -> "change" というイベントを登録する
        this.todoListModel.onChange(() => {
            // この処理がイベント名"change"に紐づけられる
            const todoListElement = element`<ul />`;
            const todoItems = this.todoListModel.getTodoItems();
            todoItems.forEach(item => {
                const todoItemElement = item.completed
                ? element`<li><input type="checkbox" class="checkbox" checked><s>${item.title}</s></input></li>`
                : element`<li><input type="checkbox" class="checkbox" checked>${item.title}</input></li>`;
                // チェックボックスをトグルしたときのイベントリスナーを登録
                const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
                inputCheckboxElement.addEventListener("change", () => {
                    // 指定したTodoアイテムの完了を反転させる
                    this.todoListModel.updateTodo({
                        id: item.id,
                        completed: !item.completed
                    });
                })
                todoListElement.appendChild(todoItemElement);
            });
            // containerElementの中身をtodoListElementで上書きする
            render(todoListElement, containerElement);
            // アイテム数の表示を更新
            todoItemCountElement.textContent = `Todoアイテム数: ${this.todoListModel.getTotalCount()}`;
        });

        // 3. フォーム送信後，新しいTodoItemModelを追加する
        formElement.addEventListener("submit", (event) => {
            console.log("書き換え！");
            // submitイベントの本来の動作を止める
            // 本来の動作 -> 指定されたURLに情報を投げる
            // 指定がなければ現在のURLに投げる
            event.preventDefault();
            // 新しいTodoItemをTodoListへ追加する
            // addTodo()の中で emitChange() -> emit(change) が呼び出される
            // emit(type) -> typeに関連づけられた処理を実行する
            this.todoListModel.addTodo(new TodoItemModel({
                title: inputElement.value,
                completed: false
            }));
            inputElement.value = "";
        });
    }
}