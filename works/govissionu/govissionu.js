let worker_array = [];
        
function startgovissionu() {
    const txtbox = document.getElementById("contents");
    const resultbox = document.getElementById("result");
    const smooth = document.getElementsByName("smooth")[0];
    txtbox.textContent = "";
    resultbox.textContent = "";
    worker_array.forEach(element => {
        element.terminate();
    });
    let worker = new Worker('govissionu_worker.js');
    worker_array.push(worker);
    worker.postMessage("");
    worker.onmessage = function(event) {
        txtbox.textContent += event.data[1];
        if (event.data[0] == 1) {
            let resmes = `${event.data[2]}文字目でゴヴィッショヌが完成!!`;
            resultbox.innerHTML = `${resmes}<br><a href="https://twitter.com/intent/tweet?text=${resmes}&url=https://yuino.dev/works/govissionu/" target="_blank">ツイートする</a>`;
            let element = document.documentElement;
            let bottom = element.scrollHeight - element.clientHeight;
            if(smooth.checked){
                window.scrollTo({left:0, top:bottom ,behavior: "smooth"});
            }else{
                window.scrollTo({left:0, top:bottom });
            }
        }
    };
}

const button = document.getElementById("start");
button.addEventListener("click",startgovissionu);