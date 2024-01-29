const LimitTime = 30;
const ClickNUM = 200;
const ResetTime = 5000;

let GameStarted = false;
let Clear = false;
let Time = LimitTime;
let CurrentClick = 0;

let ClickCounter;
let TimeDisplay;
let State = document.getElementById("MiniGame_State");
let Button = document.getElementById("MiniGame_Button");

Reset();

function Timer(){
    if (Time <= 0){
        State.innerHTML = "どっかーん!!!!!!<br>あーあ…";
        setTimeout(Reset,ResetTime);
        return;
    }else if(!Clear){
        TimeDisplay.innerHTML = Time;
        Time -= 1;
        setTimeout(Timer,1000); 
    }
}

function Click(){
    ClickCounter.innerHTML = `${CurrentClick}/${ClickNUM}`;
    if (GameStarted){
        CurrentClick += 1;
        if(CurrentClick >= ClickNUM){
            GameStarted = false;
            Clear = true;
            State.innerHTML = "クリア！";
            setTimeout(Reset,ResetTime);
        }
    }else{
        GameStarted = true;
        Button.innerHTML = "連打!";
        Timer();
    }
}

function Reset(){
    GameStarted = false;
    Clear = false;
    Time = LimitTime;
    CurrentClick = 0;
    Button.innerHTML = "スタート";
    State.innerHTML = `残り時間：<span id=\"MiniGame_TimeDisplay\">${Time}</span>秒<br>連打回数：<span id=\"MiniGame_ClickCounter\">${CurrentClick}/${ClickNUM}</span>回`;
    ClickCounter = document.getElementById("MiniGame_ClickCounter");
    TimeDisplay = document.getElementById("MiniGame_TimeDisplay");
}