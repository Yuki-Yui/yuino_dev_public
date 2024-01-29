function display_blog_link(){
    if(new URL(location.href).host == "yuino.dev"){return;}
    const path = 'article.json';
    readJson(path)
    .then(data => {
        const box = document.getElementById("blog_articles");
        let Element="";
        let n = data.length;
        let nu;
        for(let i=0; i<n; i++){
            nu = n-i-1;
            if(!data[nu].release && new URL(location.href).host == "yuino.dev" ){continue;}
            let tags = data[nu].tags;
            let tagsHTML = "";
            for (let j=0; j<tags.length; j++){
                tagsHTML += `<span>#${tags[j]}</span>`; 
            }
            let thumbnail = data[nu].thumbnail != "" ? `${data[nu].directory}/images/${data[nu].thumbnail}` : "/images/blogthumbnail.png";
            let E = 
            `<a class="blog_link" href="${data[nu].directory}/">
                <h3>${data[nu].title}</h3>
                <hr class="titlebar">
                <div class="blog_link_explanation">
                    <div class="blog_link_explanation_photo_container center">
                        <img src="${thumbnail}" alt="ブログ「${data[nu].title}」のサムネイル">
                    </div>
                    <div class="blog_link_explanation_description">
                        <div class="blog_link_tag">${tagsHTML}</div>
                        <p>${data[nu].description}</p>    
                        <span class="blog_link_date">${data[nu].date}</span>
                    </div>
                </div>
            </a>`
            Element += E;
        }
        box.innerHTML = Element;
    });
}

display_blog_link();