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


// 上に戻るボタン
window.addEventListener('scroll', ()=>{
    const scroll_threshold = 50;
    const scrollButtonWrapper = document.getElementById('scrollButtonWrapper');
    if (document.body.scrollTop > scroll_threshold || document.documentElement.scrollTop > scroll_threshold) {
        scrollButtonWrapper.style.display = 'block';
    } else {
        scrollButtonWrapper.style.display = 'none';
    }
});

const scrollToTopButton = document.getElementById('scrollToTopButton');
scrollToTopButton.addEventListener('click', ()=>{
    window.scrollTo({top:0,left:0});
});
const scrollToBottomButton = document.getElementById('scrollToBottomButton');
scrollToBottomButton.addEventListener('click', ()=>{
    window.scrollTo({top:document.body.scrollHeight,left:0,behavior:'smooth'});
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
async function OGPmain(){
    const OGboxlist = document.getElementsByClassName("og-card");
    const OG_JSON_PATH = '/files/ogp_info.json';
    let og_data_list = [];
    await readJson(OG_JSON_PATH).then(data => {
        og_data_list = Array.from(data);
    });
    Array.prototype.forEach.call(OGboxlist,(dom)=>{
        const url = dom.getAttribute('href');
        console.log(`Retrieving OGP information for: ${url}`);
        let og_data = {};
        og_data_list.forEach((tar)=>{
            if (tar.url == url || tar.url == `${url}/` || `${tar.url}/` == url) {
                og_data.title = tar.title;
                og_data.description = tar.description;
                og_data.image = tar.image;
                og_data.domain = tar.domain;
            }
        });
        if (og_data) {
            generateBlogCard(dom,og_data);
        } else {
            console.log(`Failed to retrieve OGP information. ${url}`);
        }
    });
}

function generateBlogCard(dom,ogp) {
    let cardHTML = "";
    if(ogp.image!=""){
        cardHTML = `
            <img src="${ogp.image}" alt="Image">
            <div class="og-card_sentence">
                <span class="og-card_title">${ogp.title}</span>
                <span class="og-card_description">${ogp.description}</span>
                <span class="og-card_domain">${ogp.domain}</span>
            </div>
        `;
    }else{
        cardHTML = `
            <div class="og-card_sentence">
                <span class="og-card_title">${ogp.title}</span>
                <span class="og-card_description">${ogp.description}</span>
                <span class="og-card_domain">${ogp.domain}</span>
            </div>
        `;
    }
    dom.innerHTML = cardHTML;
}

//リンクの改造
function addExternalLinkAttributes() {
    const links = document.querySelectorAll("a");
    links.forEach(link => {
        const href = link.getAttribute("href");
        if (href && !href.startsWith("#")) {
            const url = new URL(href, window.location.origin);
            if (url.origin !== window.location.origin) {
                link.setAttribute("target", "_blank");
                link.setAttribute("rel", "noopener noreferrer");
            }
        }
    });
}

// テキストの検索→ハイライトとスクロール
function searchTextInElement(){
    const query = new URLSearchParams(window.location.search).get('search');
    if (!query) return;
    const regex = new RegExp(query, 'gi');
    const elements = document.querySelectorAll('main');
    elements.forEach(el => highlightText(el, regex));
    const firstMatch = document.querySelector('mark');
    if (firstMatch) {
        firstMatch.scrollIntoView({
            behavior: document.documentElement.classList.contains('no-animations') ? 'auto' : 'smooth',
            block: 'center'
        });
    }
}

function highlightText(root, regex) {
    const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    const textNodes = [];
    let node;
    while ((node = walker.nextNode())) {
        if (regex.test(node.nodeValue)) textNodes.push(node);
    }
    textNodes.forEach(textNode => {
        const frag = document.createDocumentFragment();
        let lastIndex = 0;
        regex.lastIndex = 0;
        let match;
        while ((match = regex.exec(textNode.nodeValue))) {
            const before = textNode.nodeValue.slice(lastIndex, match.index);
            if (before) frag.appendChild(document.createTextNode(before));
            const mark = document.createElement('mark');
            mark.textContent = match[0];
            frag.appendChild(mark);
            lastIndex = regex.lastIndex;
        }
        const after = textNode.nodeValue.slice(lastIndex);
        if (after) frag.appendChild(document.createTextNode(after));
        textNode.parentNode.replaceChild(frag, textNode);
    });
}

function highLightCurrentLink() {
    const segments = window.location.pathname.replace(/\/$/, '').split('/');
    const current = segments[1] ? '/' + segments[1] : '/';
    document.querySelectorAll(".aside_link_box").forEach(link => {
        const path = new URL(link.href, location.origin).pathname.replace(/\/$/, "") || "/";
        if (path === current) {
            // link.style.color = "var(--border2-color)";
            link.style.fontWeight = "bold";
            link.style.fontSize = "1.5em";
            link.classList.add("active");
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    addExternalLinkAttributes();
    searchTextInElement();
    highLightCurrentLink();
    OGPmain();
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
