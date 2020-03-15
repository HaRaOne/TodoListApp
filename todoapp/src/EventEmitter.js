export class EventEmitter {
    constructor() {
        // 登録する [イベント名, Set(リスナー関数)] を管理するMap
        // _ で始める変数 -> private であることを表している
        // Mapでは値に対応した値を管理できる，Dictionaryみたいなもの
        // this => グローバル
        this._listeners = new Map();
    }

    // functionなしでも以下のように書ける
    // https://jsprimer.net/basic/function-this/

    // 1. イベント実行時のリスナー関数を登録する
    // param{string} type イベント名
    // param{Function} listener イベントリスナー
    addEventListener(type, listener){
        // 1. 指定したイベントに対応するSetを作成
        // 2. リスナー関数を登録する

        // すでに登録されたイベントかを確認
        if (this._listeners.has(type) == false){
            this._listeners.set(type, new Set());
        }
        // new Set()が格納される
        const listenerSet = this._listeners.get(type);
        // Setの配列に要素としてlistenerを追加する
        listenerSet.add(listener);

        // 最終的にできるもの
        // listners
        // {type1} -> {fn1}
        // {type2} -> {fn2,fn3}
        // タイプごとに関数が登録される -> 複数登録される場合もある
    }

    // 指定したイベントをディスパッチする
    // param{string} type イベント名
    emit(type){
        // 指定したイベントに対応するSetを取り出す，全てのリスナー関数を呼び出す
        const listenerSet = this._listeners.get(type);
        if (listenerSet == false){
            return;
        }
        listenerSet.forEach(listener => {
            // call -> 関数を呼び出す
            listener.call(this);
        });
    }

    // 指定したイベントのイベントリスナーを解除する
    // param{string} type イベント名
    // param{function} listener イベントリスナー
    removeEventListener(type, listener){
        // Setを呼び出し削除する
        const listenerSet = this._listeners.get(type);
        if (listenerSet == false){
            return;
        }
        listenerSet.forEach(ownlistener => {
            if (ownlistener == listener){
                listenerSet.delete(listener);
            }
        });
    }
}