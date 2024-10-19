// ダークモードの状態を監視
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');



const sdomTest = document.getElementById('socialshare');
const colors1 = sdomTest.getAttribute('data-color').split(',').map(color => color.trim());
const colors2 = sdomTest.getAttribute('data-color2').split(',').map(color => color.trim());

// 初期の色を設定
let colors = darkModeMediaQuery.matches ? colors2 : colors1;




console.log(colors);

// Shadow DOMを作成する関数
function createShadowDom() {
  
  const shadow = sdomTest.attachShadow({ mode: 'open' });
  const shareListArray = JSON.parse(sdomTest.innerHTML.trim());
  console.log(shareListArray);



  const style = document.createElement('style');
  style.textContent = `
    button,a {
      width: 40px;
      height: 40px;
      border-radius: 50%; 
      background-color: ${colors[2]}; 
      color: ${colors[0]};
      border: 1px solid ${colors[0]}; 
      text-align: center; 
      text-decoration: none; 
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      margin: 2px;
      transition: background-color 0.3s;
      position: relative; /* ツールチップの位置を相対的に設定 */
    }
    

    ph{
       font-size:22px;
    }
    .tooltip-text {
      opacity: 0; /* はじめは隠しておく */
    visibility: hidden;
      position: absolute; /* 絶対配置 */
      left: 50%; /* 親に対して中央配置 */
      transform: translateX(-50%); /* 親に対して中央配置 */
      bottom: -30px; /* 親要素下からの位置 */
      display: inline-block;
      padding: 5px; /* 余白 */
      white-space: nowrap; /* テキストを折り返さない */
      font-size: 0.8rem; /* フォントサイズ */
      line-height: 1.3; /* 行間 */
      background: #333; /* 背景色 */
      color: #fff; /* 文字色 */
      border-radius: 3px; /* 角丸 */
      transition: opacity 0.3s ease-in; /* アニメーションをopacityに変更 */
    }
    button:hover,a:hover {
      background-color: ${colors[1]}; 
      border : dashed 1px;
    }
    button:hover .tooltip-text,a:hover .tooltip-text {
      opacity: 1;
      visibility: visible;
    }
    #copied,#copied2 {
    opacity: 0;
    visibility: hidden;
    position: absolute; /* 絶対配置 */
    left: 50%; /* 親に対して中央配置 */
    transform: translateX(-50%); /* 親に対して中央配置 */
    bottom: 40px; /* 親要素下からの位置 */
    color: ${colors[3]}
    }
  #copied.is-active,#copied2.is-active{
    opacity: 1;
    visibility: visible;
  }
  `;

  // ダークモードの変更を監視するリスナーを追加
darkModeMediaQuery.addEventListener('change', (event) => {
  colors = event.matches ? colors2 : colors1; // 色を更新
  const sty = style.textContent;
  style.textContent = style.textContent + `
      button,a {
        background-color: ${colors[2]};
        color: ${colors[0]};
        border: 1px solid ${colors[0]};
      }
      button:hover,a:hover {
        background-color: ${colors[1]};
      }
      #copied,#copied2 {
        color: ${colors[3]};
      }`;
});

  // スクリプトを追加
    // <!-- Phosphor Icons https://phosphoricons.com/ MIT License-->
  for (const weight of ["regular", "thin", "light", "bold", "fill", "duotone"]) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href =
      "https://unpkg.com/@phosphor-icons/web@2.1.1/src/" + weight + "/style.css";
    shadow.appendChild(link);

  }    // <!-- Phosphor Icons https://phosphoricons.com/ MIT License-->



  shadow.appendChild(style);
  // shareListArrayに従ってリンクをループ作成
  shareListArray.forEach(item => {
    const link = document.createElement('a');
    pageInfo = getPageInfo();
    // link.href = item[1] + encodeURIComponent(document.title) + ' ' + encodeURIComponent(window.location.href);
    link.href = item[1] + pageInfo.title + " " + pageInfo.url;
    link.target = '_blank'; 

    const icon = document.createElement('i');
    icon.className = item[2];
    // ツールチップを作成
    const tooltip = document.createElement('span');
    tooltip.textContent = item[0]; // アイテム名をツールチップに設定
    tooltip.className = 'tooltip-text';

    // リンクにツールチップとアイコンを追加
    link.appendChild(tooltip);
    link.appendChild(icon);

    // Shadow DOMにリンクを追加
    shadow.appendChild(link);
  });
  const copyInfoButton = document.createElement('button');
  copyInfoButton.className = 'sharebutton';
  copyInfoButton.onclick = () => {
    copyInfo();
    const copied = shadow.getElementById('copied'); // shadow内で要素を取得
    if (copied) { // nullチェックを追加
      copied.classList.add('is-active');
      setTimeout(() => {
        copied.classList.remove('is-active');
      }, 5000); // 5秒間.is-activeを追加
    }
  };
  copyInfoButton.innerHTML = `<span class="tooltip-text">Copy Info</span><i class="ph ph-copy-simple"></i><span id="copied">Copied!</span>`;
  shadow.appendChild(copyInfoButton);



  const copyMdButton = document.createElement('button');
  copyMdButton.className = 'sharebutton';
  copyMdButton.onclick = () => {
    copyMd();
    const copied2 = shadow.getElementById('copied2'); // shadow内で要素を取得
    if (copied2) { // nullチェックを追加
      copied2.classList.add('is-active');
      setTimeout(() => {
        copied2.classList.remove('is-active');
      }, 5000); // 5秒間.is-activeを追加
    }
  };
  copyMdButton.innerHTML = `<span class="tooltip-text">Copy Markdown</span><i class="ph ph-markdown-logo"></i><span id="copied2">Copied!</span>`;
  shadow.appendChild(copyMdButton);
}

// ページが読み込まれたときにShadow DOMを作成
window.onload = createShadowDom;


// const textElement = document.getElementById('sharelist');
// console.log(textElement.innerText.trim());
// const shareListText = document.getElementById('sharelist').innerText.trim();
// const shareListArray = JSON.parse(shareListText);
// console.log(shareListArray)

 
 
 function copyToClipboard(text) {
   var textarea = document.createElement("textarea");
   textarea.value = text;
   document.body.appendChild(textarea);
   textarea.select();
   document.execCommand('copy');
   document.body.removeChild(textarea);
 }
 
 function getPageInfo() {
   var pageTitle = document.title;
   var pageURL = window.location.href;
   
  const dataText = sdomTest.getAttribute('data-text');
  const dataUrl = sdomTest.getAttribute('data-url');
  if (dataText) {
    pageTitle = dataText; // dataTextが空でない場合、pageTitleを上書き
  }
  if (dataUrl) {
    pageURL = dataUrl; // dataUrlが空でない場合、pageURLを上書き
  }
   return { title: pageTitle, url: pageURL };
 }
 
 function PageInfotxt() {
   var pageTitle = document.title;
   var pageURL = window.location.href;
   return encodeURIComponent(pageTitle+"\r\n"+pageURL);
 }
 
 function copyMd() {
   pageInfo = getPageInfo();
   copyToClipboard(`[${pageInfo.title}](${pageInfo.url})`);
  //  const copied2 = document.getElementById('copied2')
  //  copied2.classList.add('is-active')
  //  setTimeout(() => {
  //    copied2.classList.remove('is-active')
  //  }, 1600)
 }
 
 function copyInfo() {
   pageInfo = getPageInfo();
   copyToClipboard(`${pageInfo.title} ${pageInfo.url}`);
  //  const copied = document.getElementById('copied')
  //  copied.classList.add('is-active')
  //  setTimeout(() => {
  //    copied.classList.remove('is-active')
  //  }, 1600)
 }
 
 
 
 function openUrl(url) {
   pageInfo = getPageInfo();
  window.open(url+`${pageInfo.title} ${pageInfo.url}`, '_blank');
 }

