const appLang = {
  ja: {
    appExitDialogCancel: "キャンセル",
    appExitDialogYes: "終了",
    appExitDialogTitle: "McGwireの終了",
    appExitDialogMessage: "終了しますか??\n保存する場合はキャンセルし、保存してください。",

    appExportPDFNoTextMessage: "メッセージ",
    appExportPDFNoTextDetail: "出力するテキストがありません",

    appExportOverWriteCancel: "キャンセル",
    appExportOverWriteYes: "上書き",
    appExportOverWriteTitle: "上書きの確認",
    appExportOverWriteMessage: "既に同名のファイルが存在します。\n上書きしますか??",

    appExportPDFComplate: "出力完了",

    appExportPDFErrorTitle: "書き込みエラー",
    appExportPDFErrorDetail: "ファイルを閉じて再度実行してください。",

    appPrintOutNoTextMessage: "メッセージ",
    appPrintOutNoTextDetail: "出力するテキストがありません",

    appCsvImportTitle: "文字コード",
    appCsvImportMessage: "文字コードの確認",
    appCsvImportDetail: "CSVファイルの文字コードを選択してください。\n\n※基本的にはShift-Jisですが、文字化けが起こる場合はUTF-8を選択してください。",
  },
  en: {
    appExitDialogCancel: "Cancel Back",
    appExitDialogYes: "Exit",
    appExitDialogTitle: "Exit McGwire",
    appExitDialogMessage: "Are you sure you want to exit?\nIf you want to save, please cancel and save.",

    appExportPDFNoTextMessage: "Message",
    appExportPDFNoTextDetail: "There is no text to output",

    appExportOverWriteCancel: "Cancel Back",
    appExportOverWriteYes: "Confirm overwrite",
    appExportOverWriteTitle: "Overwrite",
    appExportOverWriteMessage: "A file with the same name already exists.\nDo you want to overwrite it?",

    appExportPDFComplate: "Output Complete",

    appExportPDFErrorTitle: "Write Error",
    appExportPDFErrorDetail: "Close the file and try again.",

    appPrintOutNoTextMessage: "Message",
    appPrintOutNoTextDetail: "There is no text to output",

    appCsvImportTitle: "Character Encoding",
    appCsvImportMessage: "Check Character Encoding",
    appCsvImportDetail: "Please select the character encoding of the CSV file.\n\n※Generally it is Shift-JIS, but if garbled characters occur, please select UTF-8.",

  },
}

// CommonJSのモジュールエクスポート
module.exports = appLang;