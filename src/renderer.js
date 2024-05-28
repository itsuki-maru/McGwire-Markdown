import { lang } from "./js/rendererLang.js";
import { initTour } from "./js/guide.js";

// Mermaidの初期読み込みを阻止（MarkedによるHTMLレンダリング後にinitで読み込み）
mermaid.initialize({startOnLoad: false});

// Aceの設定
const editor = ace.edit("editor");
editor.getSession().setMode("ace/mode/markdown");
editor.getSession().setUseWrapMode(true);
editor.setFontSize(18);
// 80文字の縦ラインを消す
editor.setShowPrintMargin(false);
// ファイル保存のショートカットキー登録
editor.commands.addCommand(
    {
        Name: "saveFile",
        bindKey: {
            win: "Ctrl-S",
            mac: "Command-S"
        },
        exec: function(editor) {
            saveFile();
        }
    }
);

// markedのスラッグ化機能をカスタマイズ
const renderer = new marked.Renderer();
renderer.heading = (text, level, raw) => {
  return `<h${level} class="head${level}">${text}</h${level}>\n`;
};

// mermaidの処理
const originalCodeRenderer = renderer.code.bind(renderer);
renderer.code = (code, language) => {
  let html = originalCodeRenderer(code, language, false);
  if (language == "mermaid") {
    return '<pre class="mermaid">' + escapeHtml(code) + '\n</pre>';
  } else {
    return originalCodeRenderer(code, language, false);
  }
}
// HTMLエスケープ関数
function escapeHtml(html) {
  return html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// [テキスト](URL)で定義されたリンクを別タブで開かせるカスタムレンダラ設定
// 元のlink関数を保存
const originalLinkRenderer = renderer.link.bind(renderer);
// link関数をオーバーライド
renderer.link = (href, title, text) => {
  const html = originalLinkRenderer(href, title, text);
  return html.replace(/^<a /, '<a target="_blank" rel="noopener noreferrer" title="外部リンク" ');
};

// markedの設定をカスタマイズ
marked.setOptions({
  renderer,
});

// markedの設定
marked.use(
  {
      mangle: false,
      headerIds: false
  }
);

const footerArea = document.querySelector(".footer");
let lastSaveTextData = "";
let currentPath = null;

// キー入力検知
const element = document.querySelector("#editor");
element.addEventListener("keyup", handleChange);

let isEditorScrolling = false;
let isPreviewScrolling = false;
// editorからpreviewへのスクロールの同期
// previewからeditorの同期は不可（画像の差分を微調整するため）
editor.getSession().on("changeScrollTop", function() {
    if (isPreviewScrolling) return;
    const editorScroll = editor.getSession().getScrollTop();
    const editorMaxScroll = editor.renderer.layerConfig.maxHeight - editor.renderer.$size.scrollerHeight;
    const preview = document.getElementById("result");
    if (!preview) return;
    const previewMaxScroll = preview.scrollHeight - preview.clientHeight;
    isEditorScrolling = true;
    preview.scrollTop = (editorScroll / editorMaxScroll) * previewMaxScroll;
    setTimeout(() => isEditorScrolling = false, 50);
});

/** キー入力の検知しマークダウンをHTMLに変換する関数 */
function handleChange(event) {
    const inputText = editor.getValue();
    if (lastSaveTextData !== inputText) {
        if (footerArea.textContent.includes("*") === false) {
            footerArea.textContent = `*${footerArea.textContent}`;
        }
    }
    const html = marked.parse(inputText);
    document.querySelector('#result').innerHTML = html;
};


// Ctrl + M を押下している間はMermaid.jsの描画を実行する（離すと解除）
const handleKeyDown = (event) => {
  if (event.ctrlKey && event.key === "m") {
    event.preventDefault();
    // mermaid.jsによるフロー図レンダリング
    drawMermaid();
  }
}

async function drawMermaid() {
  try {
    await mermaid.init();
  } catch(error) {
    console.error("Mermaid Syntax Error.");
  }
}

window.addEventListener("keydown", handleKeyDown);

/** エディターとプレビュー部分の高さの自動調整 */
window.onload = function() {
  function setElementHeight() {
    let viewportHeight = window.innerHeight;
    let editorElm = document.getElementById("editor");
    let resultElm = document.getElementById("result");
    let heightEditorResult = parseInt(viewportHeight * 0.7 - 20);
    editorElm.style.minHeight = heightEditorResult.toString() + "px";
    resultElm.style.maxHeight = heightEditorResult.toString() + "px";
  }

  // ウィンドウがリサイズされたときに要素の高さを再設定
  window.addEventListener("resize", setElementHeight);

  // 初期化時に要素の高さを設定
  setElementHeight();
};


/** ボタンイベント */
// OPEN BUTTON
document.querySelector("#btnOpen").addEventListener("click", () => {
  openFile();
});
// SAVE BUTTON
document.querySelector("#btnSave").addEventListener("click", () => {
  saveFile();
});
// PDF OUTPUT PREVIEW WINDOW BUTTON
document.querySelector("#btnPreviewOutput").addEventListener("click", () => {
  openPreviewWindow();
});
// HELP BUTTON
document.querySelector("#btnHelp").addEventListener("click", () => {
  howTo();
});
// PRINT OUT
document.querySelector("#btnPrintOut").addEventListener("click", () => {
  printOut();
});
// OSS LICENSES WINDOW
document.querySelector("#btnOssLicenses").addEventListener("click", () => {
  ossLicensesTo();
});

// COPY CLIPBOARD
document.querySelector("#btnCopyClipBoard1").addEventListener("click", () => {
  const text = document.getElementById("btnCopyClipBoard1").value;
  copyClipBoard(text);
  insertClipBoard(text);
});
document.querySelector("#btnCopyClipBoard2").addEventListener("click", () => {
  const text = document.getElementById("btnCopyClipBoard2").value;
  copyClipBoard(text);
  insertClipBoard(text);
});
document.querySelector("#btnCopyClipBoard3").addEventListener("click", () => {
  const text = document.getElementById("btnCopyClipBoard3").value;
  copyClipBoard(text);
  insertClipBoard(text);
});
document.querySelector("#btnCopyClipBoard4").addEventListener("click", () => {
  const text = document.getElementById("btnCopyClipBoard4").value;
  copyClipBoard(text);
  insertClipBoard(text);
});
document.querySelector("#btnCopyClipBoard5").addEventListener("click", () => {
  const text = document.getElementById("btnCopyClipBoard5").value;
  copyClipBoard(text);
  insertClipBoard(text);
});
document.querySelector("#btnCopyClipBoard6").addEventListener("click", () => {
  const text = document.getElementById("btnCopyClipBoard6").value;
  copyClipBoard(text);
  insertClipBoard(text);
});
document.querySelector("#btnCopyClipBoard7").addEventListener("click", () => {
  const text = document.getElementById("btnCopyClipBoard7").value;
  copyClipBoard(text);
  insertClipBoard(text);
});
document.querySelector("#btnCopyClipBoard8").addEventListener("click", () => {
  const text = document.getElementById("btnCopyClipBoard8").value;
  copyClipBoard(text);
  insertClipBoard(text);
});
document.querySelector("#btnCopyClipBoard9").addEventListener("click", () => {
  const text = document.getElementById("btnCopyClipBoard9").value;
  copyClipBoard(text);
  insertClipBoard(text);
});
document.querySelector("#btnCopyClipBoard10").addEventListener("click", () => {
  const text = document.getElementById("btnCopyClipBoard10").value;
  copyClipBoard(text);
  insertClipBoard(text);
});
document.querySelector("#btnCopyClipBoard11").addEventListener("click", () => {
  const text = document.getElementById("btnCopyClipBoard11").value;
  copyClipBoard(text);
  insertClipBoard(text);
});
document.querySelector("#btnCopyClipBoard12").addEventListener("click", () => {
  const text = "- [ ] チェックボックス1\n" + "- [x] チェックボックス2\n"
  copyClipBoard(text);
  insertClipBoard(text);
});
document.querySelector("#btnCopyClipBoard13").addEventListener("click", () => {
  const text = '<div style="page-break-before:always"></div>'
  copyClipBoard(text);
  insertClipBoard(text);
});
document.querySelector("#btnCopyClipBoard14").addEventListener("click", () => {
  const text = "<details><summary>ラベル</summary>\n\n" + "(上に空行を入れる)\n" + "内容を記述\n" + "</details>\n"
  copyClipBoard(text);
  insertClipBoard(text);
});
document.querySelector("#btnCopyClipBoard15").addEventListener("click", () => {
  getPictureFilePath();
});
document.querySelector("#btnCopyClipBoard16").addEventListener("click", () => {
  csvToMarkdownTable();
});


/** OPEN FILE */
async function openFile() {
  const result = await window.myApp.openFile();

  if (result) {
    const { filePath, textData } = result;
    footerArea.textContent = currentPath = filePath;
    lastSaveTextData = textData;
    editor.setValue(textData);
    // 画像を相対パスでレンダリング可能とするためのセッティング
    const fileParentPath = getParentPath(filePath);
    imageRendererOverride(fileParentPath);
  }
};

/** SAVE FILE */
async function saveFile() {
  const result = await window.myApp.saveFile(currentPath, editor.getValue());
  footerArea.textContent = footerArea.textContent.replace(/\*/g, "");
  lastSaveTextData = editor.getValue();
  if (result) {
    footerArea.textContent = currentPath = result.filePath;
  }
};

/** OUTPUT PDF */
async function openPreviewWindow() {
  const inputText = editor.getValue();
  const html = marked.parse(inputText);
  const result = await window.myApp.openPreviewWindow(html, currentPath);
  console.log(result);
};

/** PRINT OUT */
async function printOut() {
  const inputText = editor.getValue();
  const html = marked.parse(inputText);
  const result = await window.myApp.printOut(html);
  console.log(result);
};

/** HOW TO */
async function howTo() {
  const result = await window.myApp.howTo();
  console.log(result);
};

/** COPY CLIPBOARD */
async function copyClipBoard(text) {
  const result = await window.myApp.copyClipBoard(text);
  console.log(result);
};

/** INSERT CLIPBORD */
async function insertClipBoard(text) {
  const corsorPosition = editor.getCursorPosition();
  editor.session.insert(corsorPosition, text);
  editor.focus();
};

/** HOW TO */
async function ossLicensesTo() {
  const result = await window.myApp.ossLicensesTo();
  console.log(result);
};

/** GET PICTURE PATH */
async function getPictureFilePath() {
  const result = await window.myApp.getPictureFilePath();
  let text = ""
  if (result === null) {
    text = "![画像名](画像のパスかURL)\n";
  } else {
    // 全てのバックスラッシュをスラッシュに置換
    let replacedPath = result.filePath.replace(/\\/g, "/");
    text = `![画像名](${replacedPath})\n`;
  }
  copyClipBoard(text);
  insertClipBoard(text);
};

/** CSV TO MARKDOWN TEXT */
async function csvToMarkdownTable() {
  const text = await window.myApp.csvToMarkdownTable();
  if (text) {
    copyClipBoard(text);
    insertClipBoard(text);
  }
};

/** SAVE THEME SETTINGS */
async function saveSettings(theme, language) {
  const result = await window.myApp.saveSettings(theme, language);
  console.log(result);
};

/** LOAD THEME & LANGUAGE SETTINGS */
let currentThemeIndex = 0;
const themes = ["light-theme", "dark-theme"];
let currentLangIndex = 0;
const langs = ["ja", "en"];
async function loadSettings() {
  const result = await window.myApp.loadSettings();
  const theme = result.theme;
  const userLanguage = result.language;
  if (theme === "dark-theme") {
    // 変更する要素
    const titleH1Element = document.querySelector(".title_h1");
    // 変更する要素のリスト（厳密にはNodeList）を取得
    const titleH5Elements = document.querySelectorAll(".title_h5");

    // 現在のテーマを削除
    document.body.classList.remove(themes[currentThemeIndex]);
    titleH1Element.classList.remove(themes[currentThemeIndex]);
    // NodeListの各要素に対してテーマの削除操作を行う
    titleH5Elements.forEach(function(titleH5Element) {
      titleH5Element.classList.remove(themes[currentThemeIndex]);
    });

    // 次のテーマに進む
    currentThemeIndex++;
    if (currentThemeIndex >= themes.length) {
      currentThemeIndex = 0;
    }

    // 新しいテーマを追加
    document.body.classList.add(themes[currentThemeIndex]);
    titleH1Element.classList.add(themes[currentThemeIndex]);
    titleH5Elements.forEach(function(titleH5Element) {
      // NodeListの各要素に対してテーマの追加操作を行う
      titleH5Element.classList.add(themes[currentThemeIndex]);
    });
  }
  // 言語設定
  setLanguage(userLanguage);
  
  if (userLanguage === "ja") {
    currentLangIndex = 0;
  } else {
    currentLangIndex = 1;
  }
};
loadSettings();


/** FILE DROP */
document.addEventListener("dragover", (event) => {
  event.preventDefault();
});

document.addEventListener("drop", (event) => {
  event.preventDefault();
  const file = event.dataTransfer.files[0];

  const fileExtension = file.name.split(".").pop();
  const fileTypeMime = file.type;

  switch(fileTypeMime) {
    case "text/plain":
      break;
    
    default:
      // 拡張子が.mdならファイルオープン
      if (fileExtension === "md") {
        break;
      };
      // 拡張子が画像形式なら画像挿入
      if (fileExtension === "jpg" || fileExtension === "png" || fileExtension === "jpeg") {
        let replacedPath = file.path.replace(/\\/g, "/");
        let text = `![画像名](${replacedPath})\n`;
        console.log("Draw Picture.")
        insertClipBoard(text);
        return;
      }
      console.log(`Drop Error. [FileExtension: ${fileExtension} FileTypeMime: ${fileTypeMime}]`);
      return;
  };

  // ドロップされたファイルのパスを読み込み
  const fileParentPath = getParentPath(file.path);

  // .mdファイルがドロップされた場合の処理（ファイル読み込み、エディタへの書き込む）
  if (file instanceof Blob) {  // Ensure that 'file' is a File (or Blob) object
    const reader = new FileReader();
    reader.onload = function () {
      const textData = reader.result;
      lastSaveTextData = textData;

      footerArea.textContent = currentPath = file.path;
      editor.setValue(textData, -1);
      imageRendererOverride(fileParentPath)
      
    };
    reader.readAsText(file);
  } else {
    console.error('Dropped item is not a file.');
  }
});

function setLanguage(userLanguage) {
  document.querySelector("#functions").textContent = lang[userLanguage].func;
  document.querySelector("#insert").textContent = lang[userLanguage].insert;
  document.querySelector("#btnOpen").textContent = lang[userLanguage].open;
  document.querySelector("#btnSave").textContent = lang[userLanguage].save;
  document.querySelector("#btnHelp").textContent = lang[userLanguage].help;
  document.querySelector("#btnPreviewOutput").textContent = lang[userLanguage].output;
  document.querySelector("#btnPrintOut").textContent = lang[userLanguage].print;
  document.querySelector("#title_h3_1").textContent = lang[userLanguage].edit;
  document.querySelector("#title_h3_2").textContent = lang[userLanguage].preview;

  document.querySelector("#btnCopyClipBoard1").title = lang[userLanguage].head1;
  document.querySelector("#btnCopyClipBoard2").title = lang[userLanguage].head2;
  document.querySelector("#btnCopyClipBoard3").title = lang[userLanguage].bold;
  document.querySelector("#btnCopyClipBoard4").title = lang[userLanguage].bgbold;
  document.querySelector("#btnCopyClipBoard5").title = lang[userLanguage].thead;
  document.querySelector("#btnCopyClipBoard6").title = lang[userLanguage].tseperate;
  document.querySelector("#btnCopyClipBoard7").title = lang[userLanguage].list;
  document.querySelector("#btnCopyClipBoard8").title = lang[userLanguage].numlist;
  document.querySelector("#btnCopyClipBoard9").title = lang[userLanguage].quote1;
  document.querySelector("#btnCopyClipBoard10").title = lang[userLanguage].quote2;
  document.querySelector("#btnCopyClipBoard11").title = lang[userLanguage].cancelline;
  document.querySelector("#btnCopyClipBoard12").title = lang[userLanguage].checkbox;
  document.querySelector("#btnCopyClipBoard13").title = lang[userLanguage].seperatepage;
  document.querySelector("#btnCopyClipBoard14").title = lang[userLanguage].hidden;
  document.querySelector("#btnCopyClipBoard15").title = lang[userLanguage].image;
  document.querySelector("#btnAppGuide").textContent = lang[userLanguage].guide;
  document.querySelector("#themeButton").textContent = lang[userLanguage].theme;
  document.querySelector("#langButton").textContent = lang[userLanguage].language;
};

// main.js-preload.jsから伝搬されてAceエディタの操作（テキストをセット）を行う
window.addEventListener("file-data", event => {
  footerArea.textContent = currentPath = event.path;
  lastSaveTextData = event.detail;
  editor.setValue(event.detail);
});

// main.js-preload.jsから伝搬されてファイルパスのセットを行う
window.addEventListener("file-path", event => {
  footerArea.textContent = currentPath = event.detail;
  // 画像を相対パスでレンダリング可能とするためのセッティング
  const fileParentPath = getParentPath(currentPath);
  imageRendererOverride(fileParentPath);
});

document.getElementById("themeButton").addEventListener("click", function() {
  // 変更する要素
  const titleH1Element = document.querySelector(".title_h1");
  // 変更する要素のリスト（厳密にはNodeList）を取得
  const titleH5Elements = document.querySelectorAll(".title_h5");

  // 現在のテーマを削除
  document.body.classList.remove(themes[currentThemeIndex]);
  titleH1Element.classList.remove(themes[currentThemeIndex]);
  // NodeListの各要素に対してテーマの削除操作を行う
  titleH5Elements.forEach(function(titleH5Element) {
    titleH5Element.classList.remove(themes[currentThemeIndex]);
  });

  // 次のテーマに進む
  currentThemeIndex++;
  if (currentThemeIndex >= themes.length) {
    currentThemeIndex = 0;
  }

  // 新しいテーマを追加
  document.body.classList.add(themes[currentThemeIndex]);
  titleH1Element.classList.add(themes[currentThemeIndex]);
  titleH5Elements.forEach(function(titleH5Element) {
    // NodeListの各要素に対してテーマの追加操作を行う
    titleH5Element.classList.add(themes[currentThemeIndex]);
  });
  saveSettings(themes[currentThemeIndex], "");
});

document.querySelector("#langButton").addEventListener("click", () => {
  // 次の言語に進む
  currentLangIndex++;
  if (currentLangIndex >= langs.length) {
    currentLangIndex = 0;
  }
  setLanguage(langs[currentLangIndex]);
  saveSettings("", langs[currentLangIndex]);
});

/** アプリケーションガイドの開始 */
document.getElementById("btnAppGuide").addEventListener("click", function () {
  let tour = initTour(langs[currentLangIndex]);
  tour.start();
});

/**
 * ファイルパスを入力して親のパスを取得
 *  @param {string} filePath
 *  @returns {string}
 */
function getParentPath(filePath) {
  // 最後の`/`を見つける
  let lastSlashIndex = filePath.lastIndexOf("/");


  // `/`が見つからない場合
  if (lastSlashIndex === -1) {
    // 区切り文字を`\`に変えて再度試みる
    lastSlashIndex = filePath.lastIndexOf("\\");
    if (lastSlashIndex === -1) {
      return "";
    }
  }

  // 最後の`/`若しくは`\`までの文字列を返す
  return filePath.substring(0, lastSlashIndex);
}


/** 
 * 相対パスで画像のレンダリングを行うためにMarked.jsのimageをオーバーライドする関数
 * マークダウンファイルが存在するディレクトリを起点にする。
 *  @param {string} fileParentPath
 * 
 */
function imageRendererOverride(fileParentPath) {
      // image関数をオーバーライド
      renderer.image = function(href, title, text) {
        let src = href;
        // 相対パスが指定された場合、絶対パスに変換してレンダリングするカスタマイズ
        if (!href.startsWith("http://") && !href.startsWith("https://") && href.startsWith("./")) {
          // 絶対パスに変換
          src = src.replace(/^./, fileParentPath);
          src = `file://${src}`;
        }
        return `<img src="${src}" alt="${text}" title="${title || ''}">`;
      }
}