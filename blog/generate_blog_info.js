function display_blog_info(){
    const path = '../article.json';
    readJson(path)
    .then(data => {
        const datebox = document.getElementById("blog_info_date");
        const tagbox = document.getElementById("blog_info_tag");
        const currentPath = window.location.pathname;
        const pathParts = currentPath.split('/');
        const folderName = pathParts[pathParts.length-2];
        let articledata;

        for(let i=0; i<data.length; i++){
            if(data[i].directory==folderName){ 
                articledata=data[i];
                break;
            }
        }

        // document.querySelector('meta[property="og:title"]').content = articledata.title;
        // document.querySelector('meta[property="og:description"]').content = articledata.description;
        // document.querySelector('meta[property="og:image"]').content = `${location.href}images/${articledata.thumbnail}`;

        if(datebox != null){
            let dateHTML = "";
            let updata = articledata.updata;
            dateHTML += `公開 ${articledata.release_date}`;
            if(updata.length != 0){
                dateHTML += `<br>最終更新 ${updata[updata.length-1]}`;
            } 
            datebox.innerHTML = dateHTML;
        }

        if(tagbox != null){
            let tagsHTML = "";
            let tags = articledata.tags;
            for (let i=0; i<tags.length; i++){
                tagsHTML += `<a href="">#${tags[i]}</a>`; 
            }
            tagbox.innerHTML = tagsHTML;
        }
    });
}

display_blog_info();