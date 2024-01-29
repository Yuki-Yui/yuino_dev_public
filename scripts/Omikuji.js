function omikuji(){
    const kuji = {
        "大吉":["今日はきっといい日になるよ","ツイてるね","チャレンジしてみよう"],
        "中吉":["いい感じじゃん","のんびりしよう","電車で座れそう"],
        "小吉":["悪くないんじゃない？","ノーコメントで","道で小銭を拾う","初期値"],
        "凶":["まあ、、、ね、、、","こんな日もあるよ","今日、凶"],
        "大凶":["ハズレ引いたらしい","「だいき」までは大吉","家で寝てよう"]
    }
    const keys = Object.keys(kuji);

    let card = document.getElementById("card");
    let card_contents = document.getElementById("card_contents");
    let card_title = document.getElementById("card_title");
    let card_message = document.getElementById("card_message");
    let count;
    let unsei = keys[Math.floor(Math.random()*keys.length)];
    let messages = kuji[unsei];
    let message = messages[Math.floor(Math.random()*messages.length)]
    card.style.display = "block";
    let c = 0;
    card_title.innerHTML = unsei;
    card_message.innerHTML = message;
    let timer = setInterval(() => {
        c += 0.1;
        if (c > 1){
            clearInterval(timer);
        }else{ 
            card_contents.style.transform = "translateY(-50%) translateX(-50%) scale(" + c + ")";
        }
    }, 10);
    count += 1;
    
}

function ClosePanel(){
  card.style.display = "none";
  card_contents.style.transform = "translateY(-50%) translateX(-50%) scale(0)";
}