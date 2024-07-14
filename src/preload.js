const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("myApp", {
  /** CSSファイルのパスを取得 */
  async getCssFilePath() {
    const result = await ipcRenderer.invoke("getCssFilePath");
    return result;
  },

  /** ファイルオープン */
  async openFile() {
    const result = await ipcRenderer.invoke("openFile");
    return result;
  },

  /** ファイル保存 */
  async saveFile(currentPath, textData) {
    const result = await ipcRenderer.invoke("saveFile", currentPath, textData);
    return result;
  },

  /** PDF出力用ウィンドウの起動 */
  async openPreviewWindow(html, filePath) {
    const result = await ipcRenderer.invoke("openPreviewWindow", html, filePath);
    return result;
  },

  /** 印刷 */
  async printOut(html) {
    const result = await ipcRenderer.invoke("printOut", html);
    return result
  },

  /** ヘルプウィンドウの起動 */
  async howTo() {
    const result = await ipcRenderer.invoke("howTo");
    return result;
  },

  /** クリップボードコピー */
  async copyClipBoard(text) {
    const result = await ipcRenderer.invoke("copyClipBoard", text);
    return result;
  },

  /** ライセンスウィンドウの起動 */
  async ossLicensesTo() {
    const result = await ipcRenderer.invoke("ossLicensesTo");
    return result;
  },

  /** 画像ファイルのパス取得 */
  async getPictureFilePath() {
    const result = await ipcRenderer.invoke("getPictureFilePath");
    return result;
  },

  /** テーマを保存 */
  async saveSettings(theme, language) {
    const result = ipcRenderer.invoke("saveSettings", theme, language);
    return result;
  },

  /** テーマを取得 */
  async loadSettings() {
    const result = ipcRenderer.invoke("loadSettings");
    return result;
  },

  /** CSVファイルをマークダウンのテーブル形式に変換 */
  async csvToMarkdownTable() {
    const result = await ipcRenderer.invoke("csvToMarkdownTable");
    return result;
  }
});

// メインプロセスからファイル内容を受け取り
ipcRenderer.on("file-opened", (event, path, data) => {
  window.addEventListener("DOMContentLoaded", () => {
    // renderer.jsへ渡す
    window.dispatchEvent(new CustomEvent("file-data", { detail: data }));
    window.dispatchEvent(new CustomEvent("file-path", { detail: path }));
  });
});