const card = document.getElementById("card");
const card_contents = document.getElementById("card_contents");
const card_title = document.getElementById("card_title2");
const card_message = document.getElementById("card_message");
const card_tweet = document.getElementById("card_tweet");

function omikuji(){
    const kuji = {
        "大吉":["今日はきっといい日になるよ","ツイてるね","チャレンジしてみよう"],
        "中吉":["いい感じじゃん","のんびりしよう","電車で座れそう"],
        "小吉":["悪くないんじゃない？","ノーコメントで","道で小銭を拾う","初期値"],
        "凶":["まあ、、、ね、、、","こんな日もあるよ","今日、凶"],
        "大凶":["ハズレ引いたらしい","「だいき」までは大吉","家で寝てよう"]
    }
    const keys = Object.keys(kuji);
    
    let unsei = keys[Math.floor(Math.random()*keys.length)];
    let messages = kuji[unsei];
    let message = messages[Math.floor(Math.random()*messages.length)]
    card_title.innerHTML = unsei;
    card_message.innerHTML = message;
    
    let tweet_text = encodeURIComponent(`今日の運勢は…${unsei}!!\nゆいのページでおみくじを引いたよ\n`);
    card_tweet.innerHTML = `<a href="https://twitter.com/intent/tweet?text=${tweet_text}&url=https://yuino.dev/" target="_blank">ツイートする</a>`;
    
    card.style.display = "block";
    card_contents.classList.add("omikuji_open");
}

function ClosePanel(){
    card.style.display = "none";
    card_contents.classList.remove("omikuji_open");
}