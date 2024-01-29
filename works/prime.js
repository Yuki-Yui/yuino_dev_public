function Calculation(inputnumber) {
    let input = BigInt(inputnumber);
    let n = BigInt(2);
    let n_n = BigInt(1);
    const prime = [];
    const count = {};
    let root = Root(input);
    let temp;
    let rem;

    for (let i = 0; i >= 0; i++) {
        if (n > root) {
            if (input != 1) {
                if (count[input.toString()] == null) {
                    count[input.toString()] = 1;
                } else {
                    count[input.toString()]++;
                }

                if (!prime.includes(input.toString())) {
                    prime.push(input.toString());
                }
            }
            return End(inputnumber, count, prime);
        }

        rem = input % n;
        if (rem == 0) {
            if (count[n.toString()] == null) {
                count[n.toString()] = 1;
            } else {
                count[n.toString()] += 1;
            }
            if (temp != n || temp == null) {
                prime.push(n.toString());
                temp = n;
            }
            input = (input - rem) / n;
            root = Root(input);
        } else {
            n = BigInt(2) * n_n + BigInt(1);
            n_n++;
        }
    }
}

function End(inputnumber, count, prime) {
    // const message = [];
    // let s = BigInt(1);
    // let check;
    // prime.forEach(element => {
    //     s *= Pow(BigInt(element),BigInt(count[element.toString()]));
    //     message.push(element + "^" + count[element.toString()]);
    // });
    // const result = message.join(" * ");
    // if(inputnumber == s){
    //     check = ""
    // }else{
    //     check = "fail"
    // }
    // return `${result} = ${s} ${check}`;    
    return {"state":1,"data":count};
}

function Root(base) {
    let left = BigInt(0);
    let right = BigInt(base);
    let mid = BigInt(0);

    for (let i = 0; i < 100; i++) {
        mid = (left + right) / BigInt(2);
        if (mid * mid - base < 0) left = mid;
        else right = mid;
    }
    return mid + BigInt(1);
}

function Pow(base, exponent){
    const x = BigInt(base);
    let result = BigInt(1);
    for(let i=0; i<exponent; i++){
        result *= x;
    }
    return result;
}

// ウェブワーカーからのメッセージを受信
self.addEventListener('message', function(event) {
    const num1 = event.data;

    // 計算中メッセージを送信
    self.postMessage({"state":0,"data":"計算中..."});

    // 計算を実行
    const result = Calculation(num1);

    // メインスレッドに結果を送信
    self.postMessage(result);
});
