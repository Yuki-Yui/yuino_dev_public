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
        let loc = element.querySelector('loc').textContent.replace('https://yuino.dev','')
        let title = element.querySelector('title').textContent;

        if (loc.includes('error')) {
          processPage(index + 1);
          return;
        }

        let depth = loc.split('/').length - 1;

        if (loc.endsWith('/')) {
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