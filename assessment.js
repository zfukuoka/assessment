(function () {
    'use strict';
    const userNameInput = document.getElementById('user-name');
    const assessmentButton = document.getElementById('assessment');
    const resultDivided = document.getElementById('result-area');
    const tweetDivided = document.getElementById('tweet-area');

    /**
     * 指定した要素の子供を全て除去する
     * @param {HTMLElement} element HTMLの要素
     */
    function removeAllChildlen(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    assessmentButton.onclick = () => {
        const userName = userNameInput.value;
        if (userName.length === 0) {
            return;
        }

        // 診断結果表示エリアの作成
        removeAllChildlen(resultDivided);
        const header = document.createElement('h3');
        header.innerText = '診断結果';
        resultDivided.appendChild(header);

        const paragraph = document.createElement('p');
        const result = assessment(userName);
        paragraph.innerText = result;
        resultDivided.appendChild(paragraph);

        // ツイートエリアの作成
        removeAllChildlen(tweetDivided);
        const anchor = document.createElement('a');
        const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=%E3%81%82%E3%81%AA%E3%81%9F%E3%81%AE%E3%81%84%E3%81%84%E3%81%A8%E3%81%93%E3%82%8D&text=' + encodeURIComponent(result);
        anchor.setAttribute('href', hrefValue);
        anchor.className = 'twitter-hashtag-button';
        anchor.innerText = 'Twitt #%E3%81%82%E3%81%AA%E3%81%9F%E3%81%AE%E3%81%84%E3%81%A8%E3%81%93%E3%82%8D';
        tweetDivided.appendChild(anchor);
        
        twttr.widgets.load()
    };

    userNameInput.onkeydown = (event) => {
        if (event.keyCode === 13) {
            assessmentButton.onclick();
        }
    };

    const answers = [
        '{userName}のいいところは声です',
        '{userName}のいいところはまなざしです',
        '{userName}のいいところは情熱です',
        '{userName}のいいところは厳しさです',
        '{userName}のいいところはユニークさです',
        '{userName}のいいところは用心深さです',
        '{userName}のいいところは見た目です',
        '{userName}のいいところは決断力です',
        '{userName}のいいところは思いやりです',
        '{userName}のいいところは感受性です',
        '{userName}のいいところは節度です',
        '{userName}のいいところは好奇心です',
        '{userName}のいいところは気配りです',
        '{userName}のいいところはその全てです',
        '{userName}のいいところは自制心です'
    ];

    /**
     * 名前の文字列を渡すと診断結果を返す関数
     * @param {string} userName ユーザーの名前
     * @return {string} 診断結果
     */
    function assessment(userName) {
        // 全文字のコード番号を取得してそれを足し合わせる
        let sumOfcharCode = 0;
        for (let i = 0; i < userName.length; i++) {
            sumOfcharCode = sumOfcharCode + userName.charCodeAt(i);
        }

        // 文字のコード番号の合計を回答の数で割って添え字の数値を求める
        const index = sumOfcharCode % answers.length;
        let result = answers[index];

        result = result.replace(/{userName}/g, userName);
        return result;
    }

    // テストコード
    console.assert(
        assessment('太郎') === '太郎のいいところは決断力です',
        '診断結果の文言の特定の部分を名前に置き換えるしょりが正しくありません'
    );
    console.assert(
        assessment('太郎') === assessment('太郎'),
        '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません'
    );
})();