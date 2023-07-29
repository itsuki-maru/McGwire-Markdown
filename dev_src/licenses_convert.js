const fs = require('fs');
const path = require('path');

// JSONファイルからデータを読み込む
const licenses = JSON.parse(fs.readFileSync('licenses.json', 'utf8'));

// 変換されたデータを保存するための変数
let output = '# Open Source Licenses\n\nThis application uses open source software. Here is a list of the open source software and their licenses.\n';

// 各パッケージの情報を整形してoutputに追加
for (const [key, value] of Object.entries(licenses)) {
  output += `\n- \`${key}\`\n  - License: ${value.licenses}\n  - Repository: \`${value.repository}\`\n`;
}

output += '\n... (and so on for each package)\n\nFor more details about each license, please follow the repository links.\n';

// 出力ディレクトリとファイルパスを設定
const outputDir = './src/third_party_licenses';
const outputPath = path.join(outputDir, 'LICENSES.md');

// 出力ディレクトリが存在しない場合は作成
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 結果を新たなファイルに書き出す
fs.writeFileSync(outputPath, output);
