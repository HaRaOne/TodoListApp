//エントリーポイント
//async => 非同期関数を定義する
//await => プロミス処理を記述することで結果が帰ってくるまで停止できる
async function main(){
    try{
        const userId = getUserId();
        const userInfo = await fetchUserInfo(userId);
        const view = createView(userInfo);
        displayView(view);
    } catch(error){
        console.error(`エラーが発生しました (${error})`);
    }
}

function fetchUserInfo(userId){
    //thenという関数があって
    //responseという変数を
    // => {} の {}の中で色々処理しますよって感じ
    return fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
        .then(response => {
            if(response.ok == false)
            {
                // エラーレスポンスからRejectedなPromiseを作成して返す
                return Promise.reject(new Error(`${response.status}: ${response.statusText}`));
            }
            else
            {
                return response.json();
            }
        });
}

function getUserId(){
    const value = document.getElementById("userId").value;
    return encodeURIComponent(value);
}

function createView(userInfo){
    return escapeHTML`
    <h4>${userInfo.name} (@${userInfo.login})</h4>
    <img src="${userInfo.avatar_url}" alt="${userInfo.login}" height="100">
    <dl>
        <dt>Location</dt>
        <dd>${userInfo.location}</dd>
        <dt>Repositories</dt>
        <dd>${userInfo.public_repos}</dd>
    </dl>
    `;
}

function displayView(view){
    const result = document.getElementById("result");
    result.innerHTML = view;
}

//危険な文字列を置換してくれる関数
//例えば <> とかが入ってるとHTMLの構造に支障をきたす可能性がある
function escapeSpecialChars(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

//タグ関数
//()での呼び出しではなくバッククォート`の前に関数名を書くことで関数がタグ付けされる
function escapeHTML(strings, ...values){
    return strings.reduce((result, str, i) => {
        const value = values[i-1];
        if (typeof value === "string"){
            return result + escapeSpecialChars(value)+str;
        }
        else{
            return result + String(value) + str;
        }
    }
    );
}