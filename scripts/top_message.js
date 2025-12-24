function showmessage(){
    const Messages = [
        "こんにちは！<br>ゆいのページへ<br>ようこそ！",
        "ようこそ!!",
        "ようこそ！<br>ゆっくりみていってね～",
        "はじめまして、<br>ゆいです！<br>ねこがすき🐈",
        "「ゆいのページ」でGoogle検索してね！",
        "気が向いたときに更新してるよ",
        "たまにページが破壊されることも……？？？",
        "真心こめた手打ちHTML&CSSだよ",
        "ページに追加したら楽しいなっていう機能があったら教えてね！",
        "ブログも読んでね",
        "サイドバーからおみくじが引けるよ！",
        "カウンターの「詳細」をクリックすると履歴が見られるよ"
    ];
    const R_Messages = [
        "ねこ🐈(=^・^=)🐱",
        "…",
        "げげげ",
        "みょみょんみょみょみょみょん",
        "あったかいおふとん、<br>好き",
        "Xperiaはいいぞ",
        "おなかすいた",
        "最近サーバを引っ越ししました",
    ];
    const twittermes = encodeURIComponent("私はレアメッセージを引きました！\n\n");
    const SR_Messages = [
        `<a href="https://twitter.com/intent/tweet?text=${twittermes}&url=https://yuino.dev/" target="_blank">おめでとう！<br>このメッセージが表示される確率は0.1%です!!</a>`
    ];
    const messagebox = document.getElementById("top_message");
    const randomValue = Math.random();
    if (randomValue < 0.0001) { // 0.01%
        messagebox.innerHTML = SR_Messages[Math.floor(Math.random() * SR_Messages.length)];
    } else if (randomValue < 0.3) { // 30%
        messagebox.innerHTML = R_Messages[Math.floor(Math.random() * R_Messages.length)];
    } else { // 70% 
        messagebox.innerHTML = Messages[Math.floor(Math.random() * Messages.length)];
    }
    changesize();
    messagebox.style.opacity = 1;
}

function changesize (){
    const selfphoto = document.getElementById("top_self_photo");
    let fontsize = selfphoto.offsetHeight / 16;
    selfphoto.style.fontSize = `${fontsize}px`;
}

// window.addEventListener('load',()=>{
//     changesize();
//     // showmessage();
// })

window.addEventListener('resize',()=>{
    changesize();
})

showmessage();