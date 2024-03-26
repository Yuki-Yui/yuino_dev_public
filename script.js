//ヘッダー
const main = document.querySelector('body');
const header = document.getElementsByTagName('header')[0];
const header_p = document.getElementById('top').querySelector('p');
const header_img = document.getElementById('icon');
const aside = document.getElementsByTagName('aside')[0];
const default_header_height = header.style.height;
const default_header_html = header.innerHTML;
const Header_height = [80,120];
const Header_diff = Header_height[1]-Header_height[0];
let isHeaderCompact = false;
let isHamburgerOpen = false;
let isHamburgerShow = false;

function updateHeaderSticky() {
    const scrollY = window.scrollY;
    aside_control();
    if (scrollY > Header_diff ) {
        // ヘッダーの差分下スクロールされたらヘッダーをコンパクト化
        header_p.style.display = 'none';
        header_img.style.display = 'none';
        isHeaderCompact = true;
    } else {
        // もとにもどす
        header_p.style.display = null;
        header_img.style.display = null;
        isHeaderCompact = false;
    }
}
window.addEventListener('scroll', updateHeaderSticky);
window.addEventListener('resize', ()=>{
    let tmpbool = document.defaultView.getComputedStyle(hamburger,null).display != 'none';
    if(isHamburgerShow != tmpbool){
        if(isHamburgerShow){
            aside.style.paddingTop = '0px';
            Close_Hamburger();
        }else{
            aside.style.paddingTop = `${Header_height[1]}px`;
        }
    };
    isHamburgerShow = tmpbool;
});

function aside_control(){
    let margin_top = 0;
    if(document.defaultView.getComputedStyle(hamburger,null).display != 'none'){
        if(scrollY > Header_diff){
            margin_top = Header_height[0];
        }else{
            margin_top = Header_height[1];
        }
    }
    aside.style.paddingTop = `${margin_top}px`;
}

// ハンバーガーメニュー
const hamburger = document.getElementById('header_hamburger');
const hamburger_bar = hamburger.getElementsByTagName('span');
const aside_click = document.getElementById('aside_background');

function hamburgerMenu(){
    if(!isHamburgerOpen){
        // main.style.overflow = 'hidden';
        Open_Hamburger();
    }else{
        // main.style.overflow = null;
        Close_Hamburger();
    }
}

function Open_Hamburger(){
    isHamburgerOpen = true;
    hamburger_bar[0].style.transform = 'translate(0,9px) rotate(45deg)';
    hamburger_bar[1].style.transform = 'rotate(-45deg)';
    hamburger_bar[2].style.transform = 'translate(0,-9px) rotate(45deg)';
    // aside.style.left = 'none';
    aside.style.right = '0px';
    aside_click.classList.add("aside_background_show");
    aside_click.classList.remove("aside_background_hide");
    aside_click.style.display = 'block';
}

function Close_Hamburger(){
    isHamburgerOpen = false;
    for(let i=0; i<3; i++){
        hamburger_bar[i].style.transform = '';
    }
    aside.style.right = '-100vw'
    aside_click.classList.remove("aside_background_show");
    aside_click.classList.add("aside_background_hide");
    aside_click.style.display = 'none';
}


// タイトルを自動生成　<-あほ
// const h1Elements = document.getElementsByTagName("h1");
// document.title = h1Elements[h1Elements.length-1].textContent+' - '+h1Elements[0].textContent;


// 上に戻るボタン
window.addEventListener('scroll', ()=>{
    const scroll_threshold = 50;
    if (document.body.scrollTop > scroll_threshold || document.documentElement.scrollTop > scroll_threshold) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});

const scrollToTopButton = document.getElementById('scrollToTopButton');
scrollToTopButton.addEventListener('click', ()=>{
    window.scrollTo({top:0,left:0,behavior:"smooth"});
});


//アクセスカウンター

// display_Counter();

// function display_Counter(){
//     const path = '/counter/access_data.json';
//     readJson(path)
//     .then(data => {
//         const counter_today = document.getElementById("counter_today");
//         const counter_all = document.getElementById("counter_all");
//         counter_today.innerText = data["daily"][0]["count"];
//         counter_all.innerText = data["all"];
//     })
// }


//OGP
async function getOGP(url) {
    const proxyurl = `https://proxy.yuino.dev/${url}`
    try {
        const response = await fetch(proxyurl);
        if(!response.ok){
            console.error("Error")
        }
        const html = await response.text();
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const ogp = {
            title: getLastElementContent(doc, 'meta[property="og:title"]' , 'content'),
            description: getLastElementContent(doc, 'meta[name="description"]', 'content'),
            image: getLastElementContent(doc, 'meta[property="og:image"]', 'content'),
            url: url,
            domain: (new URL(url)).hostname,
        };
        return ogp;
    } catch (error) {
        console.error('Error fetching or parsing HTML:', error.message);
        return null;
    }
}

function getLastElementContent(doc, selector, attribute) {
    const elements = doc.querySelectorAll(selector);
    const lastElement = elements[elements.length - 1];
    return lastElement ? (attribute ? lastElement.getAttribute(attribute) : lastElement.textContent) : '';
}

function generateBlogCard(dom,ogp) {
    let cardHTML = "";
    if(ogp.image!=""){
        cardHTML = `
            <img src="${ogp.image}" alt="Image">
            <div class="og-card_sentence">
                <h3>${ogp.title}</h3>
                <span>${ogp.description}</span>
                <span>${ogp.domain}</span>
            </div>
        `;
    }else{
        cardHTML = `
            <div class="og-card_sentence">
                <h3>${ogp.title}</h3>
                <span>${ogp.description}</span>
                <span>${ogp.domain}</span>
            </div>
        `;
    }
    dom.innerHTML = cardHTML;
}

document.addEventListener("DOMContentLoaded",()=>{
    const OGboxlist = document.getElementsByClassName("og-card");
    Array.prototype.forEach.call(OGboxlist,(dom)=>{
        const url = dom.href;
        getOGP(url)
        .then((ogp)=>{
        if (ogp) {
            // ブログカードを生成
            generateBlogCard(dom,ogp);
        } else {
            console.log('Failed to retrieve OGP information.');
        }
        })
        .catch((error)=>console.error('Error:', error));
    });
});


//ページ内リンクをずらす

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e)=>{
        e.preventDefault();

        const targetId = anchor.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
            top: targetElement.offsetTop - 120, // ヘッダーの高さに合わせて調整
            behavior: 'smooth',
            });
      }
    });
});


//共通

document.addEventListener('touchstart',()=>{});

function readJson(path) {
    return new Promise((resolve, reject)=>{
        let xhr = new XMLHttpRequest();
        xhr.overrideMimeType("application/json");
        xhr.open('GET', path, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    let jsonContent = JSON.parse(xhr.responseText);
                    resolve(jsonContent);
                } else {
                    reject(new Error('JSON データの取得に失敗しました'));
                }
            }
        };
        xhr.send(null);
    });
}