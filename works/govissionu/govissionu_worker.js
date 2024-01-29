self.addEventListener('message', function(event) {
    let n = 0;
    let al = 0;
    const h = 10000;

    while(true){
        let re = c(h,n);
        if (re[0] == 1) {
            al += re[3];
            self.postMessage([1,re[1],al]);
            self.close;
            break;
        }else{
            n = re[2]++;
            al+=h;
            self.postMessage([0,re[1],al]);
        }
    }
});

function c(h,n){
    const tlist=["(","´","･","_","･","`",")"];
    let txt = "";
    for (let i = 0; i < h; i++) {
        t = tlist[Math.floor(Math.random()*tlist.length)];
        if(tlist[n]==t) {
            n++;
        } else {
            n=0;
        }
        txt += t;
        if(n==tlist.length) return [1,txt,n,i+1];
    }
    return [0,txt,n,h];
}