const path = require("path");
const fs = require("fs");
const os = require("os");
const electron = require("electron");
const { BrowserWindow, ipcMain, dialog, clipboard, screen, Menu } = electron;
const iconv = require("iconv-lite");
const htmlTemplate = require("./js/htmlTemplate");
const appLang = require("./js/mainLang");

const app = electron.app;
let mainWindow;

// PDF・HTML出力のウィンドウ（非表示起動）の数を管理するリスト
let printPDFWindowsList = [];

// 設定ファイルの格納ディレクトリ
const appSettingDir = path.join(os.homedir(), ".mcgwire-markdown");

if (!fs.existsSync(appSettingDir)) {
  console.info("INIT CREATE DIRECTORY: '~/.mcgwire-markdown'");
  fs.mkdirSync(appSettingDir);
}

// McGwireの設定ファイルのパスを定義
const settingPath = path.join(appSettingDir, "mcgwire-settings.json");

// McGwireの言語設定を読み込み
let applicationLang = "ja";
const defaultCssPath = path.join(app.getAppPath(), "./src/css/mcgwire_default_style.css");
let cssFilePath = path.join(appSettingDir, "mcgwire_default_style.css");

async function appInit() {
  const settingInit = await loadSettings();
  applicationLang = settingInit.language;
  cssFilePath = settingInit.cssPath;
};
appInit();

// アプリケーションメインウィンドウ
function createWindow() {
  // 画面サイズを取得
  let mainScreen = screen.getPrimaryDisplay();
  let dimensions = mainScreen.size;

  // 現在のカーソル位置を取得（readyイベントより後に使用可能）
  const cursorPoint = screen.getCursorScreenPoint();
  // カーソルがあるディスプレイの情報を取得
  const activeDisplay = screen.getDisplayNearestPoint(cursorPoint);
  
  // メニューのテンプレート配列
  const menuTemplate = [
    { role: "copy" },
    { role: "cut" },
    { role: "paste"},
    { type: "separator" },
    { label: "DevTools", click: () => mainWindow?.webContents.openDevTools() },
  ];
  
  // macOSで必要な設定
  if (process.platform === "darwin") menuTemplate.unshift({ role: "appMenu" });
  
  const menu = Menu.buildFromTemplate(menuTemplate);

  mainWindow = new BrowserWindow({
    minWidth: dimensions.width / 1.2,
    minHeight: dimensions.height / 1.2,
    maxWidth: dimensions.width,
    maxHeight: dimensions.height,
    // ウィンドウを開く場所をアクティブウィンドウの中心位置に設定
    x: activeDisplay.workArea.x + (activeDisplay.workArea.width - dimensions.width) / 2,
    y: activeDisplay.workArea.y + (activeDisplay.workArea.height - dimensions.height) / 2,
    webPreferences: {
      preload: path.join(app.getAppPath(), "./src/preload.js"),
    }
  });

  mainWindow.loadFile("./src/index.html");
  mainWindow.setMenuBarVisibility(false);
  mainWindow.maximize();
  mainWindow.show();

  // コンテキストメニューのセット
  Menu.setApplicationMenu(menu);

  // 開発環境での起動時にDevToolsを開く
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }

  // アプリケーション終了時の確認ダイアログ
  mainWindow.on("close", (event) => {
    const options = {
      type: "info",
      buttons: [appLang[applicationLang].appExitDialogCancel, appLang[applicationLang].appExitDialogYes],
      defaultId: 0,
      title: appLang[applicationLang].appExitDialogTitle,
      message: appLang[applicationLang].appExitDialogMessage
    };
    const num = dialog.showMessageBoxSync(options);
    if (num === 0) {
      event.preventDefault()
    }
  });

  // アプリケーションメインウィンドウクローズ時にappを終了
  mainWindow.on("closed", () => {
    mainWindow = null;
    app.quit();
  });
  
  // 右クリックを使えるようにフック
  mainWindow.webContents.on("context-menu", () => {
    if (mainWindow) {
      menu.popup();
    }
  });

  // 別タブでウィンドウが開かれた際にフック
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    const cursorPoint = screen.getCursorScreenPoint();
    const activeDisplay = screen.getDisplayNearestPoint(cursorPoint);

    const subWindow = new BrowserWindow({
      title: "McGwire",
      width: 1200,
      height: 850,
      x: activeDisplay.workArea.x + (activeDisplay.workArea.width - 1200) / 2,
      y: activeDisplay.workArea.y + (activeDisplay.workArea.height - 850) / 2,
    });
    subWindow.setMenuBarVisibility(false);
    subWindow.loadURL(url);
  });
};

// 初期化完了時にメインウィンドウを起動
app.on("ready", createWindow);

// 全ウィンドウがクローズ時にappを終
app.on("window-all-closed", () => {
  // macOS以外のOS
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// アプリケーションのアクティベート時の処理
app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// アプリに関連付けられたファイルからの起動処理
app.on("will-finish-launching", () => {
  // アプリアイコンにドロップ時
  app.on("open-file", (event, filePath) => {
    console.log(filePath);
  });
  let pathToOpen;
  // 開発環境時の引数読み込み
  if (!app.isPackaged) {
    console.debug("DEVELOP");
    if (process.argv.length < 3) {
      return;
    }
    pathToOpen = process.argv[2];
    // 本番環境時の引数読み込み
  } else {
    console.debug("BUILD");
    if (process.argv.length < 2) {
      return;
    }
    pathToOpen = process.argv[1];
  }

  // ファイルを読み込みレンダラープロセスへ渡す
  fs.readFile(pathToOpen, "utf8", (err, data) => {
    if (err) {
      console.error(`Failed to read file ${pathToOpen}: ${err}`);;
      return;
    }
    mainWindow.webContents.send("file-opened", pathToOpen, data);
  })
})


// レンダラープロセスとの連携を定義
ipcMain.handle("getCssFilePath", getCssFilePath);
ipcMain.handle("openFile", openFile);
ipcMain.handle("saveFile", saveFile);
ipcMain.handle("openPreviewWindow", openPreviewWindow);
ipcMain.handle("howTo", howTo);
ipcMain.handle("copyClipBoard", copyClipBoard);
ipcMain.handle("printOut", printOut);
ipcMain.handle("ossLicensesTo", ossLicensesTo);
ipcMain.handle("getPictureFilePath", getPictureFilePath);
ipcMain.handle("saveSettings", saveSettings);
ipcMain.handle("loadSettings", loadSettings);
ipcMain.handle("csvToMarkdownTable", csvToMarkdownTable);


/** 
 *  アプリケーションの設定ファイルを保存
 *  @param {*} event
 *  @param {string} theme
 *  @param {string} language
 *  @returns {string}
 */
async function saveSettings(event, theme, language) {
  const settings = await loadSettings();
  if (theme === "") {
    applicationLang = language;
    fs.writeFileSync(settingPath, JSON.stringify({ theme: settings.theme, language: language, cssPath: cssFilePath }));
  } else if (language === "") {
    fs.writeFileSync(settingPath, JSON.stringify({ theme: theme, language: settings.language, cssPath: cssFilePath }));
  }
  return `Save Settings Ok.`;
};


/**
 *  アプリケーションの設定ファイルを読み込み
 *  @returns {Object} - settings = {theme: theme, language: language}
 */
async function loadSettings() {
  let settings;
  // 設定ファイルがすでに存在する場合
  if (fs.existsSync(settingPath)) {
    settings = JSON.parse(fs.readFileSync(settingPath));

    // 設定ファイルが存在しない場合
  } else {
    fs.writeFileSync(settingPath, JSON.stringify({ theme: "light-theme", language: "ja", cssPath: cssFilePath }));
    settings = JSON.parse(fs.readFileSync(settingPath));
  }

  // CSSファイルの存在を確認
  if (!fs.existsSync(cssFilePath)) {
    const styleText = fs.readFileSync(defaultCssPath);
    fs.writeFileSync(cssFilePath, styleText, (err) => {
      if (err) throw err;
      console.log("CSS is default. Write Ok.");
    });
  }
  return settings;
};

/**
 * CSSファイルのパスを返却
 * @returns {string}
 */
async function getCssFilePath() {
  return cssFilePath;
}

/**
 *  ファイルオープン処理
 *  @returns {string, string|null} - { filePath, textData} か nullを返却
 */
async function openFile() {
  const win = BrowserWindow.getFocusedWindow();
  const result = await dialog.showOpenDialog(
    win,
    {
      properties: ["openFile"],
      filters: [
        {
          name: "Documents",
          extensions: ["txt", "md"],
        },
      ],
    }
  );

  // ダイアログをクローズボタンで閉じられた際の処理
  if (result.filePaths.length > 0) {
    const filePath = result.filePaths[0];

    // ファイルを読み込みパスとテキストデータを返却
    const textData = fs.readFileSync(filePath, "utf8");
    return {
      filePath,
      textData,
    };
  }
  // ファイルが選択されなかった場合はnullを返却
  return null;
}

/** 
 * ファイル保存処理
 *  @returns {string|null} - { filePath: saveFilePath} か nullを返却
 */
async function saveFile(event, currentPath, textData) {
  let saveFilePath;
  if (currentPath) {
    saveFilePath = currentPath;
  } else {
    const win = BrowserWindow.getFocusedWindow();
    const result = await dialog.showSaveDialog(
      win,
      {
        properties: ["openFile"],
        filters: [
          {
            name: "Markdown", extensions: ["md"]
          },
          {
            name: "PlainText", extensions: ["txt"]
          }
        ],
      }
    );
    // キャンセル時
    if (result.canceled) {
      return;
    }
    saveFilePath = result.filePath;
  }

  // 保存処理
  fs.writeFileSync(saveFilePath, textData);

  return { filePath: saveFilePath };
}

/** 
 * PDF出力処理
 * ChromiumブラウザのPDF出力APIを使用
 * @param {Electron.event} event
 * @param {string} html
 * @param {string} filePath
 * @returns {string}
 */
async function openPreviewWindow(event, html, filePath) {
  // openPreviewWindowによって開かれた非表示のウィンドウがすでに存在する場合はクローズ
  if (printPDFWindowsList[0]) {
    printPDFWindowsList[0].close()
    printPDFWindowsList.shift()
  }

  // HTMLが空文字である場合
  if (html === "") {
    const options = {
      type: "info",
      title: "MarkDown Editer",
      message: appLang[applicationLang].appExportPDFNoTextMessage,
      detail: appLang[applicationLang].appExportPDFNoTextDetail
    };
    dialog.showMessageBox(options);
    return "Text Data is None."
  }

  // 出力先の処理
  // ファイルパスがnullである場合はDesktopにoutput-mcgwire-markdown.pdfを出力
  let basePath = path.join(os.homedir(), "Desktop");
  let outputFilename = "output-mcgwire-markdown.pdf";

  // filePathがnullでなければ元の.mdのパスとファイル名を使用
  if (filePath !== null) {
    basePath = path.dirname(filePath);
    outputFilename = path.parse(filePath).name + ".pdf";
  }

  previewHtmlFile = path.join(basePath, "preview.html");
  outputPath = path.join(basePath, outputFilename);

  // 既に出力済みPDFファイル存在時に上書きするか確認
  if (fs.existsSync(outputPath)) {
    const options = {
      type: "info",
      buttons: [appLang[applicationLang].appExportOverWriteCancel, appLang[applicationLang].appExportOverWriteYes],
      defaultId: 0,
      title: appLang[applicationLang].appExportOverWriteTitle,
      message: appLang[applicationLang].appExportOverWriteMessage
    };
    const num = dialog.showMessageBoxSync(options);
    if (num === 0) {
      return "PDF Export Cancel.";
    }
  }

  // htmlTemplate.jsを使用してHTMLファイルを生成
  const style = fs.readFileSync(cssFilePath);
  const htmlTxt = htmlTemplate(html, style);
  fs.writeFile(previewHtmlFile, htmlTxt, (err) => {
    if (err) throw err;
    console.log("Preview HTML Write Ok.");
  });

  // 非表示でPDF出力用のpreviewWinを定義
  let previewWin = new BrowserWindow({
    width: 950,
    height: 700,
    show: false,
    webPreference: {
    }
  });

  // 非表示ウィンドウを管理するリストに追加
  printPDFWindowsList.push(previewWin);

  // previewWinが読み込むHTMLファイルとメニューバーの非表示
  previewWin.loadFile(previewHtmlFile);
  previewWin.setMenuBarVisibility(false);

  // 非表示でPDF出力用のpreviewWinを起動
  previewWin.webContents.on("did-finish-load", () => {
    previewWin.webContents.printToPDF({
      scale: 0.75,
      pageSize: "A4",
      printBackground: true,
      margins: {
        bottom: 1,
      }
    }).then(data => {
      try {
        fs.writeFileSync(outputPath, data);
        // PDF出力の正常終了の通知
        const options = {
          type: "info",
          title: "MarkDown Editer",
          message: appLang[applicationLang].appExportPDFComplate,
          detail: appLang[applicationLang].appExportPDFComplate
        };
        dialog.showMessageBox(options);

      } catch (error) {
        // Error時の表示
        dialog.showErrorBox(appLang[applicationLang].appExportPDFErrorTitle, appLang[applicationLang].appExportPDFErrorDetail);
        console.error("An error occurred while writing the file: ", error);
      }
    }).catch((error) => {
      console.log(error);
    });
  });

  // 非表示ウィンドウを管理するリストから削除
  previewWin.on("closed", () => {
    const index = printPDFWindowsList.indexOf(previewWin)
    if (index !== -1) {
      printPDFWindowsList.splice(index, 1)
    }
  });

  return "openPreviewWindow function end.";
}

/** 
 * 印刷処理
 * @returns {string} 
 */
async function printOut(event, html) {
  // HTMLが空文字である場合
  if (html === "") {
    const options = {
      type: "info",
      title: "MarkDown Editer",
      message: appLang[applicationLang].appPrintOutNoTextMessage,
      detail: appLang[applicationLang].appPrintOutNoTextDetail
    };
    dialog.showMessageBox(options);
    return "Text Data is None."
  }

  const desktopPath = path.join(os.homedir(), "Desktop");
  const previewHtmlFile = path.join(desktopPath, "preview.html");

  // htmlTemplate.jsを使用してHTMLファイルを生成
  const htmlTxt = htmlTemplate(html);

  fs.writeFile(previewHtmlFile, htmlTxt, (err) => {
    if (err) throw err;
    console.log("Preview HTML Write Ok.");
  });

  let printOutWin = new BrowserWindow({
    width: 950,
    height: 700,
  });

  const options = {
    silent: false,
  };

  printOutWin.loadFile(previewHtmlFile);
  printOutWin.setMenuBarVisibility(false);

  // 非表示でPDF出力用のprintOutWinを起動
  printOutWin.webContents.on("did-finish-load", () => {
    printOutWin.webContents.print(options);
  })
  return "Print Out Ok."
}

/**
 * ヘルプウィンドウの起動
 * @returns {string}
 */
async function howTo() {
  let howtoWin = new BrowserWindow({
    width: 950,
    height: 700,
    webPreference: {
    }
  });
  const settings = await loadSettings();
  if (settings.language === "en") {
    howtoWin.loadFile("./src/sample-en.html");
  } else {
    howtoWin.loadFile("./src/sample.html");
  }
  howtoWin.setMenuBarVisibility(false);
  return "Open Help."
}


/**
 * OSSライセンスの表示ウィンドウの起動
 * @returns {string}
 */
async function ossLicensesTo() {
  let ossLicensesWin = new BrowserWindow({
    width: 950,
    height: 700,
    webPreference: {
    }
  });
  ossLicensesWin.loadFile("./src/third_party_licenses/LICENSES.html");
  ossLicensesWin.setMenuBarVisibility(false);
  return "Open OSS Licenses."
}

/**
 * クリップボードへのコピー
 * @param {Electron.Event} event 
 * @param {string} text 
 * @returns {string}
 */
async function copyClipBoard(event, text) {
  clipboard.writeText(text);
  return `${text} Copied Clipboard.`
}


/**
 * 画像ファイルパス取得
 * @returns {string|null} - 画像パスが取得出来たらstringを返却
 */
async function getPictureFilePath() {
  const win = BrowserWindow.getFocusedWindow();
  const result = await dialog.showOpenDialog(
    win,
    {
      properties: ["openFile"],
      filters: [
        {
          name: "Documents",
          extensions: ["jpg", "jpeg", "png"],
        },
      ],
    }
  );

  // ダイアログをクローズボタンで閉じられた際の処理
  if (result.filePaths.length > 0) {
    const filePath = result.filePaths[0];

    // ファイルパスを返却
    return {
      filePath,
    };
  }
  // ファイルが選択されなかった場合はnullを返却
  return null;
}

/** 
 * CSVファイルを読み込みマークダウン形式のテキストに変換
 * readCsvWithEncoding関数に依存
 * @returns {string|null} - CSVから変換されたテーブル形式のマークダウンかnullを返す
 */
async function csvToMarkdownTable() {
  const win = BrowserWindow.getFocusedWindow();
  const result = await dialog.showOpenDialog(
    win,
    {
      properties: ["openFile"],
      filters: [
        {
          name: "CSV",
          extensions: ["csv"],
        },
      ],
    }
  );

  // ダイアログをクローズボタンで閉じられた際の処理
  if (result.filePaths.length > 0) {
    const filePath = result.filePaths[0];

    // 文字コードの選択ダイアログ（ユーザーが行う）
    const options = {
      type: "question",
      title: appLang[applicationLang].appCsvImportTitle,
      message: appLang[applicationLang].appCsvImportMessage,
      detail: appLang[applicationLang].appCsvImportDetail,
      buttons: ["Shift-Jis", "UTF-8"],
      canceled: -1
    };
    const selectedCharCode = dialog.showMessageBoxSync(options);

    // ファイルを読み込みパスとテキストデータを返却
    let csvContent;
    switch (selectedCharCode) {
      case -1:
        csvContent = readCsvWithEncoding(filePath, "shift_jis");
        break;
      case 0:
        csvContent = readCsvWithEncoding(filePath, "shift_jis");
        break;
      case 1:
        csvContent = readCsvWithEncoding(filePath, "utf-8");
        break;
    }

    // Windowsの改行コードをUnixの改行コードに変換
    csvContent = csvContent.replace(/\r\n/g, "\n");
    const lines = csvContent.trim().split("\n");
    // タイトル部分
    const header = `| ${lines[0].split(",").join(" | ")} |`;
    // 区切り部分
    const divider = lines[0].split(",").map(() => "----").join(" | ");
    // 内容部分
    const rows = lines.slice(1).map(line => `| ${line.split(",").join(" | ")} |`).join("\n");
    return `${header}\n| ${divider} |\n${rows}`;
  }
  // ファイルが選択されなかった場合はnullを返却
  return null;
};

/** 
 *  エンコーディングを指定してCSVファイルを読み込む関数
 *  csvToMarkdownTableにてWindowsのShift-jisを吸収するために使用
 *  @param {string} path
 *  @param {string} encoding 
 *  @returns {string}
 */
function readCsvWithEncoding(path, encoding) {
  const buffer = fs.readFileSync(path);
  return iconv.decode(buffer, encoding);
}