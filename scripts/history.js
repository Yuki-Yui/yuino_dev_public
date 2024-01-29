function display_history(){
    const path = '/history.json';
    readJson(path)
    .then(data => {
        const path = location.pathname;
        const maxnum = 10;
        const historybox = document.getElementsByClassName('history')[0];
        let Element="";
        let n = data.length;
        let m = path=="/"&&n>maxnum ? n-maxnum : 0;
        for(let i = n-1; i>=m; i--){
            if(!data[i].show){m=0<m?m-1:0;continue;}
            let E = `<dt>${data[i].date}</dt><dd>${data[i].description}</dd>`
            Element += E;
        }
        historybox.innerHTML = Element;
    });
}

display_history();