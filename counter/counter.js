function display_history(){
    const path = 'access_data.json';
    readJson(path)
    .then(data => {
        const historybox = document.getElementById('counterAll');
        const dailydata = data.daily;
        const n = dailydata.length;
        let Element = '';
        for(let i = 0; i<n; i++){
            let E = `<dt>${dailydata[i].day}</dt><dd>${dailydata[i].count}</dd>`;
            Element += E;
        }
        historybox.innerHTML = Element;
    });
}

display_history()