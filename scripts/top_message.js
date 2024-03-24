function showmessage(){
    const messages = [
        "はじめまして、<br>ゆいだよ！<br>ねこがすき🐈",
        "ようこそ！<br>ゆっくりみていってね～",
        "サイドバーからおみくじが引けるよ！",
        "気が向いたときに更新してます（笑）",
        "ページに追加したら楽しいなっていう機能があったら教えてね！",
        "「ゆいのページ」でGoogle検索しよう",
        "真心こめた手打ちHTML&CSSで動いています",
        "たまにページが破壊されることも……？？？",
        "あったかいおふとん、<br>好き",
        "ようこそ!!!!!!!!",
        "お絵描きに挑戦したいな…",
        "カウンターの「詳細」をクリックすると履歴が見られるよ"
    ];
    const Rmessages = [
        "だじゃれ生成AI",
        "ねこ🐈(=^・^=)🐱",
        "…",
        "げげげ",
        "みょみょんみょみょみょみょん",
        "かわいい美少女です"
    ];
    const SRmessages = [
        "おめでとう！<br>このメッセージが表示される確率は0.1%です!!"
    ];
    const messagebox = document.getElementById("top_message");
    // messagebox.innerHTML = messages[messages.length-1];
    messagebox.innerHTML = Math.floor(Math.random()*5) != 0 ? messages[Math.floor(Math.random()*messages.length)] : Math.floor(Math.random()*20) != 0 ? Rmessages[Math.floor(Math.random()*Rmessages.length)] : SRmessages[Math.floor(Math.random()*SRmessages.length)];
    // const t = 7/28;
    // messagebox.style.top = `${t*selfphoto.offsetHeight}px`
}

function changesize (){
    const selfphoto = document.getElementById("top_self_photo");
    let fontsize = selfphoto.offsetHeight / 16;
    selfphoto.style.fontSize = `${fontsize}px`;
}

window.addEventListener('load',()=>{
    changesize();
    // showmessage();
})

window.addEventListener('resize',()=>{
    changesize();
})