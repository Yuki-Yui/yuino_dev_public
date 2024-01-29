// document.addEventListener('DOMContentLoaded', function () {
// });
fetch('sitemap.xml')
  .then(response => response.text())
  .then(data => {
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(data, 'text/xml');
    let siteMapElements = xmlDoc.querySelectorAll('url');
    let siteMapContainer = document.getElementById('siteMap');

    let pages = [];

    function processPage(index) {
      if (index < siteMapElements.length) {
        let element = siteMapElements[index];
        let loc = element.querySelector('loc').textContent;
        let title = element.querySelector('title').textContent;

        if (loc.includes('error')) {
          processPage(index + 1);
          return;
        }

        let depth = loc.split('/').length - 3;

        if (loc.endsWith('index.html')) {
          depth--;
        }
        
        pages.push({ loc, title, depth });

        // リストアイテムの生成と追加
        let link = document.createElement('a');
        link.href = loc;
        link.textContent = title;

        let listItem = document.createElement('li');
        listItem.style.marginLeft = depth * 20 + 'px'; // インデントを適用
        listItem.appendChild(link);

        siteMapContainer.appendChild(listItem);
        processPage(index + 1); // 次のページを処理
      }
    }

    // ページの処理を開始
    processPage(0);
  })
  .catch(error => {
    console.error('XML読み込みエラー: ', error);
  });
          
          // fetch(loc)
          //   .then(response => {
          //     if (response.status === 403 || response.status === 404) {
          //       // ステータスコードが403または404の場合はページをスキップ
          //       return null;
          //     }
          //     return response.text();
          //   })
          //   .then(data => {
          //     if (data) {
                // let parser = new DOMParser();
                // let htmlDoc = parser.parseFromString(data, 'text/html');
                // let h1Elements = htmlDoc.querySelectorAll('h1');
                // let title = '';

                // if (h1Elements.length > 0) {
                //   title = h1Elements[h1Elements.length - 1].textContent;
                // }

      //         }

            // })
            // .catch(error => {
            //   console.error('ページの読み込みエラー: ', error);
            //   processPage(index + 1); // 次のページを処理

            // });