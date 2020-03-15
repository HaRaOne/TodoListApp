import { EventEmitter } from "../EventEmitter.js"

export class TodoListModel extends EventEmitter{
    // param {TodoItemModel[]} [items]
    // 初期アイテム一覧
    constructor(items = []){
        super();
        this.items = items;
    }

    // TodoItemの合計個数を返す
    // returns {number}
    getTotalCount(){
        return this.items.length;
    }

    // 表示できるTodoItemの配列を返す
    // returns {TodoItemModel[]}
    getTodoItems(){
        return this.items;
    }

    // TodoListの状態が更新された時に呼び出されるリスナー
    // param{Function} listener
    onChange(listener){
        this.addEventListener("change", listener);
    }

    //状態が変更された時に呼ぶ
    //登録済みリスナー関数を呼び出す
    emitChange(){
        //changeのイベントを呼び出す
        this.emit("change");
    }

    // TodoItemを追加する
    addTodo(todoItem){
        this.items.push(todoItem);
        console.log(this.items);
        this.emitChange();
    }

    //指定したIDのTodoItemのcompletedを更新する
    updateTodo({ id, completed }){
        // `id`が一致するTodoItemを見つけ，あるなら完了状態の値を更新する
        // findはtodo.id === idを満たす最初の値を返す
        // todo -> itemsの要素
        const todoItem = this.items.find(todo => todo.id === id);
        if (todoItem == false){
            return;
        }
        todoItem.completed = completed;
        this.emitChange();
    }
}