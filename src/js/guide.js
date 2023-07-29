const guideLang = {
    ja: {
        tourTitleStep0: "アプリケーションガイド",
        tourTextStep0: `<div class="container-fluid"><p><strong>McGwire Markdown（マグワイヤ・マークダウン）</strong> のガイドを開始します。</p>
<p><code>McGwire</code>は<strong>マークダウン記法</strong>と呼ばれる方法で、<strong>文書・ドキュメントを作成するアプリケーション</strong>です。</p>
<p>他の文書作成ソフトは非常に高機能ですが、高機能がゆえに<strong>学習コストが高く、文書のフォーマットに悩んだり、使い方を調べたりすることに時間を要す</strong>場合が多くあります。</p>
<p><strong>マークダウン</strong>はいくつかの半角記号を使い、<strong>文書の体裁（フォーマット）を自動で整えるため、シンプルで強力な文書・ドキュメント作成の手法です</strong>。</p>
<p>これから<strong>基本的なマークダウンの記述方法について、一緒に学んでいきましょう</strong>。</p>
</div>`,
        tourTitleStep1: "マークダウンとは??",
        tourTextStep1: `<div class="container-fluid"><p>マークダウンはいくつかの<strong>半角記号</strong>を使って「<strong>ここは見出し</strong>」「<strong>ここを太字で強調</strong>」といった書式を指定していきます。例えば次のように書いていきます。</p>
<pre><code>## 見出し
        
強調したい文字を**太字**にします。
        
- 箇条書き
- 箇条書き
        
&gt; 引用
</code></pre>
</div>`,
        tourTitleStep2: "見出しの作成1",
        tourTextStep2: `<div class="container-fluid"><p>それでは文書をマークダウンで記述してみましょう。</p>
<p>まずは文書の「<strong>見出し</strong>」から作成します。次のように入力してみてください。</p>
<pre><code># 見出し1
</code></pre>
<p><code>#</code>と<code>見出し1</code>の間には<strong>半角スペース</strong>を空けます。</p>
</div>`,
        tourTitleStep3: "プレビュー",
        tourTextStep3: `<div class="container-fluid"><p>文章の作成や編集は<strong>キーの入力に応じて、プレビュー画面に反映されます</strong>。</p>
<h1>見出し1</h1>
<p>と表示されていれば、正しく入力されています。</p>
</div>`,
        tourTitleStep4: "見出しの作成2",
        tourTextStep4: `<div class="container-fluid"><p>マークダウンは<strong>1行ごとに空行を入れて</strong>続きを書きます。</p>
<p>次は2つ目の見出しを作成しましょう。次のように<code># 見出し1</code>に空行を入れて<code>## 見出し2</code>を入力してください。</p>
<pre><code># 見出し1
        
## 見出し2
</code></pre>
</div>`,
        tourTitleStep5: "見出しの大きさ",
        tourTextStep5: `<div class="container-fluid"><p><code>#</code>の数によって、見出しの大きさを6段階まで変えることができます。</p>
<h1>見出し1</h1>
<h2>見出し2</h2>
<p>と表示されていれば、正しく入力されています。</p>
</div>`,
        tourTitleStep6: "文字の強調",
        tourTextStep6: `<div class="container-fluid"><p>続いて、文字を<strong>太字で強調</strong>してみましょう。書き方は強調したい部分を<code>**</code>で囲います。</p>
<p>次のように<code># 見出し2</code>に1行空行を入れて、<code>こんにちわ。私の名前は**マル**です。</code>と記述してみましょう。</p>
<pre><code># 見出し1
        
## 見出し2
        
こんにちわ。私の名前は**マル**です。
</code></pre>
</div>`,
        tourTitleStep7: "文字の強調",
        tourTextStep7: `<div class="container-fluid"><p><code>**</code>で挟んだ「マル」という文字が<strong>太字で強調</strong>されていれば正しく入力されています。</p></div>`,
        tourTitleStep8: "箇条書き",
        tourTextStep8: `<div class="container-fluid"><p>続いて、<strong>箇条書き</strong>を作成してみましょう。箇条書きは<code>-（ハイフン）</code>を使用します。</p>
<p>次のように<code>- 箇条書き1</code>と<code>箇条書き2</code>を作成しましょう。</p>
<pre><code># 見出し1
        
## 見出し2
        
こんにちわ。私の名前は**マル**です。
        
- 箇条書き1
- 箇条書き2
</code></pre>
<p>注意点は次のとおりです。</p>
<ul>
<li><code>-</code>の後には半角スペースを入れる</li>
<li>箇条書きは<strong>空行を入れずに続けて記述</strong>する</li>
</ul>
</div>`,
        tourTitleStep9: "箇条書き",
        tourTextStep9: `<div class="container-fluid"><p>正しく入力されていれば次のように<code>- 箇条書き1</code>が<code>・箇条書き1</code>に変換されます。</p>
<ul>
<li>箇条書き1</li>
<li>箇条書き2</li>
</ul>
</div>`,
        tourTitleStep10: "番号付き箇条書き",
        tourTextStep10: `<div class="container-fluid"><p>続いて、<strong>番号付きの箇条書き</strong>を作成してみましょう。番号付きの箇条書きは<code>1. 内容</code>と記述します。</p>
<p>次のように<code>1. 番号箇条書き</code>と<code>2. 番号箇条書き</code>を作成しましょう。</p>
<pre><code># 見出し1
        
## 見出し2
        
こんにちわ。私の名前は**マル**です。
        
- 箇条書き1
- 箇条書き2

1. 番号付き箇条書き
2. 番号付き箇条書き
</code></pre>
<p>注意点は次のとおりです。</p>
<ul>
<li><code>1.</code>の後には半角スペースを入れる</li>
<li>数値は<code>1. 2. 3. </code>と増やしていく</li>
<li>箇条書きは<strong>空行を入れずに続けて記述</strong>する</li>
</ul>
</div>`,
        tourTitleStep11: "番号箇条書き",
        tourTextStep11: `<div class="container-fluid"><p>次のように番号付き箇条書きがプレビューされていれば、正しく入力されています。</p>
<ol>
<li>番号付き箇条書き</li>
<li>番号付き箇条書き</li>
</ol>
</div>`,
        tourTitleStep12: "マークダウン",
        tourTextStep12: `<div class="container-fluid"><p>以上がマークダウンの基本的な記述例ですが、この他にもマークダウンは次のようなものを表現（記述）することが可能です。</p>
<ul>
<li><strong>表（テーブル）</strong></li>
<li><strong>引用</strong></li>
<li><strong>画像の挿入</strong></li>
</ul>
<p>これらは左上の<strong>ヘルプ</strong>で確認することができますので、<strong>是非、挑戦してみてください</strong>。</p>
<p>続いて<code>McGwire Markdown</code>が持つその他の機能を紹介します。</p>
</div>`,
        tourTitleStep13: "挿入とクリップボードコピー",
        tourTextStep13: `<div class="container-fluid"><p>ここにあるボタン一覧で、<strong>マークダウンに使用する記号を編集画面に挿入し、クリップボードにコピー</strong>することができます。</p>
<p><strong>記号の入力に慣れるまでは、活用しましょう</strong>。</p>
</div>`,
        tourTitleStep14: "機能",
        tourTextStep14: `<div class="container-fluid"><p>ここにあるボタン一覧は</p>
<ul>
<li><strong>ファイルを開く</strong></li>
<li><strong>ファイルを保存</strong></li>
<li><strong>ヘルプ（マークダウンの書き方）</strong></li>
<li><strong>PDFとHTMLファイルを出力</strong></li>
<li><strong>印刷</strong></li>
</ul>
<p>といった<strong>機能を提供します</strong>。</p>
</div>`,
        tourTitleStep15: "アプリケーションガイド",
        tourTextStep15: `<div class="container-fluid"><p>ここまでが<code>McGwire Markdown</code>アプリケーションの簡単なガイドです。</p>
<p><strong>マークダウンの記述方法</strong>など、詳細な内容は<strong>ヘルプボタン</strong>などを参考にしてください。</p>
        </div>`,
        tourNextBtnText: "次へ",
        tourBackBtnText: "戻る",
        tourStartBtnText: "開始",
        tourEndBtnText: "終了",
    },

    en: {
        tourTitleStep0: "Application Guide",
        tourTextStep0: `<div class="container-fluid"><p><strong>Welcome to the McGwire Markdown guide.</strong></p>
<p><code>McGwire</code> is an <strong>application for creating documents using a method called Markdown.</strong></p>
<p>While other document creation software is very powerful, the high functionality often leads to <strong>high learning costs, confusion about document formatting, and a lot of time spent on learning how to use it.</strong></p>
<p><strong>Markdown uses several symbols to automatically format your documents, making it a simple and powerful way to create documents.</strong></p>
<p>Let's <strong>learn the basics of markdown together from here</strong>.</p>
</div>`,
        tourTitleStep1: "What is Markdown?",
        tourTextStep1: `<div class="container-fluid"><p>Markdown uses several <strong>symbols</strong> to specify formatting such as "<strong>make this a header</strong>" or "<strong>emphasize this in bold</strong>". For example, you would write it like this:</p>
<pre><code>## Header
        
Emphasize text in **bold**.
        
- Bulleted list
- Bulleted list
        
&gt; Quotation
</code></pre>
</div>`,
        tourTitleStep2: "Creating a Header 1",
        tourTextStep2: `<div class="container-fluid"><p>Let's try to write a document in Markdown.</p>
<p>First, let's create the "<strong>header</strong>" of the document. Please input as follows:</p>
<pre><code># Header 1
</code></pre>
<p>Put a <strong>space</strong> between <code>#</code> and <code>Header 1</code>.</p>
</div>`,
        tourTitleStep3: "Preview",
        tourTextStep3: `<div class="container-fluid"><p>As you create and edit the text, it will be <strong>reflected in the preview screen in response to your keystrokes</strong>.</p>
<h1>Header 1</h1>
<p>If it appears as above, you have input correctly.</p>
</div>`,
        tourTitleStep4: "Creating a Header 2",
        tourTextStep4: `<div class="container-fluid"><p>In Markdown, <strong>you insert a blank line for each new line</strong>.</p>
<p>Next, let's create the second header. After inserting a blank line after <code># Header 1</code>, input <code>## Header 2</code> as follows:</p>
<pre><code># Header 1
        
## Header 2
</code></pre>
</div>`,
        tourTitleStep5: "Header Size",
        tourTextStep5: `<div class="container-fluid"><p>You can change the size of the headers in six levels depending on the number of <code>#</code>s.</p>
<h1>Header 1</h1>
<h2>Header 2</h2>
<p>If it appears as above, you have input correctly.</p>
</div>`,
        tourTitleStep6: "Text Emphasis",
        tourTextStep6: `<div class="container-fluid"><p>Next, let's <strong>emphasize text in bold</strong>. To do this, enclose the text you want to emphasize with <code>**</code>.</p>
<p>After inserting a blank line after <code># Header 2</code>, write <code>Hello. My name is **Maru**.</code> as follows:</p>
<pre><code># Header 1
        
## Header 2
        
Hello. My name is **Maru**.
</code></pre>
</div>`,
        tourTitleStep7: "Text Emphasis",
        tourTextStep7: `<div class="container-fluid"><p>If the text "Mark" enclosed in <code>**</code> is <strong>emphasized in bold</strong>, you have input correctly.</p></div>`,
        tourTitleStep8: "Bulleted List",
        tourTextStep8: `<div class="container-fluid"><p>Next, let's create a <strong>bulleted list</strong>. For a bulleted list, we use <code>- (hyphen)</code>.</p>
<p>Create a list as follows: <code>- Item 1</code> and <code>Item 2</code>.</p>
<pre><code># Header 1
        
## Header 2
        
Hello. My name is **Maru**.
        
- Item 1
- Item 2
</code></pre>
<p>Pay attention to the following:</p>
<ul>
<li>Insert a space after <code>-</code></li>
<li><strong>Continue writing the list without inserting a blank line</strong></li>
</ul>
</div>`,
        tourTitleStep9: "Bullet Points",
        tourTextStep9: `<div class="container-fluid"><p>If correctly inputted, <code>- item1</code> will be converted to <code>・item1</code> as follows.</p>
<ul>
<li>Item1</li>
<li>Item2</li>
</ul>
</div>`,
        tourTitleStep10: "Numbered List",
        tourTextStep10: `<div class="container-fluid"><p>Next, let's create a <strong>numbered list</strong>. A numbered list is written as <code>1. Content</code>.</p>
<p>Let's create <code>1. Numbered item</code> and <code>2. Numbered item</code> as follows.</p>
<pre><code># Heading1

## Subheading2

Hello. My name is **Maru**.

- Item1
- Item2

1. Numbered item
2. Numbered item
</code></pre>
<p>Pay attention to the following points:</p>
<ul>
<li>Place a half-width space after <code>1.</code></li>
<li>Numbers increase like <code>1. 2. 3. </code></li>
<li>Continue writing items <strong>without a blank line</strong></li>
</ul>
</div>`,
        tourTitleStep11: "Numbered List",
        tourTextStep11: `<div class="container-fluid"><p>If the numbered list is previewed as follows, it has been correctly inputted.</p>
<ol>
<li>Numbered item</li>
<li>Numbered item</li>
</ol>
</div>`,
        tourTitleStep12: "Markdown",
        tourTextStep12: `<div class="container-fluid"><p>The examples above are the basics of markdown, but markdown also enables you to express (write) the following:</p>
<ul>
<li><strong>Tables</strong></li>
<li><strong>Quotes</strong></li>
<li><strong>Inserting images</strong></li>
</ul>
<p>You can check these in the <strong>Help</strong> on the top left, so please <strong>give it a try</strong>.</p>
<p>Next, let's introduce other features that <code>McGwire Markdown</code> has.</p>
</div>`,
        tourTitleStep13: "Insertion and Clipboard Copy",
        tourTextStep13: `<div class="container-fluid"><p>Using these buttons, you can <strong>insert markdown symbols into the editing screen and copy them to the clipboard</strong>.</p>
<p><strong>Until you get used to inputting symbols, make use of it</strong>.</p>
</div>`,
        tourTitleStep14: "Features",
        tourTextStep14: `<div class="container-fluid"><p>The buttons here provide the following features:</p>
<ul>
<li><strong>Open a file</strong></li>
<li><strong>Save a file</strong></li>
<li><strong>Help (How to write markdown)</strong></li>
<li><strong>Export to PDF and HTML files</strong></li>
<li><strong>Print</strong></li>
</ul>
<p><strong>These features are available for your use</strong>.</p>
</div>`,
        tourTitleStep15: "Application Guide",
        tourTextStep15: `<div class="container-fluid"><p>This is a simple guide to the <code>McGwire Markdown</code> application.</p>
<p>For detailed content such as <strong>how to write markdown</strong>, please refer to the <strong>Help button</strong> and the like.</p>
</div>`,
        tourNextBtnText: "Next",
        tourBackBtnText: "Back",
        tourStartBtnText: "Start",
        tourEndBtnText: "End",
    }
};

export function initTour(language) {
    // 新しいツアーオブジェクトを作成
    var tour = new Shepherd.Tour({
        defaultStepOptions: {
            cancelIcon: {
                enabled: true
            }
        },
        useModalOverlay: true
    });
    let guideLanguage = language;

    // アプリケーションガイドの開始
    tour.addStep({
        title: guideLang[guideLanguage].tourTitleStep0,
        text: guideLang[guideLanguage].tourTextStep0,
        buttons: [
            {
                text: guideLang[guideLanguage].tourStartBtnText,
                action: tour.next
            }
        ]
    });

    // マークダウンについての説明
    tour.addStep({
        title: guideLang[guideLanguage].tourTitleStep1,
        text: guideLang[guideLanguage].tourTextStep1,
        buttons: [
            {
                text: guideLang[guideLanguage].tourNextBtnText,
                action: tour.next
            }
        ]
    });

    // 見出しの入力練習
    tour.addStep({
        title: guideLang[guideLanguage].tourTitleStep2,
        text: guideLang[guideLanguage].tourTextStep2,
        attachTo: {
            element: ".editor-div",
            on: "right"
        },
        buttons: [
            {
                text: guideLang[guideLanguage].tourNextBtnText,
                action: tour.next
            }
        ]
    });

    // プレビュー機能の説明
    tour.addStep({
        title: guideLang[guideLanguage].tourTitleStep3,
        text: guideLang[guideLanguage].tourTextStep3,
        attachTo: {
            element: ".result-div",
            on: "left"
        },
        buttons: [
            {
                text: guideLang[guideLanguage].tourBackBtnText,
                action: tour.back
            },
            {
                text: guideLang[guideLanguage].tourNextBtnText,
                action: tour.next
            }
        ]
    });

    // 見出しの入力練習
    tour.addStep({
        title: guideLang[guideLanguage].tourTitleStep4,
        text: guideLang[guideLanguage].tourTextStep4,
        attachTo: {
            element: ".editor-div",
            on: "right"
        },
        buttons: [
            {
                text: guideLang[guideLanguage].tourBackBtnText,
                action: tour.back
            },
            {
                text: guideLang[guideLanguage].tourNextBtnText,
                action: tour.next
            }
        ]
    });

    // プレビュー機能の説明と見出しの説明
    tour.addStep({
        title: guideLang[guideLanguage].tourTitleStep5,
        text: guideLang[guideLanguage].tourTextStep5,
        attachTo: {
            element: ".result-div",
            on: "left"
        },
        buttons: [
            {
                text: guideLang[guideLanguage].tourBackBtnText,
                action: tour.back
            },
            {
                text: guideLang[guideLanguage].tourNextBtnText,
                action: tour.next
            }
        ]
    });

    // 太字強調の入力練習
    tour.addStep({
        title: guideLang[guideLanguage].tourTitleStep6,
        text: guideLang[guideLanguage].tourTextStep6,
        attachTo: {
            element: ".editor-div",
            on: "right"
        },
        buttons: [
            {
                text: guideLang[guideLanguage].tourBackBtnText,
                action: tour.back
            },
            {
                text: guideLang[guideLanguage].tourNextBtnText,
                action: tour.next
            }
        ]
    });

    // 太字強調のプレビュー
    tour.addStep({
        title: guideLang[guideLanguage].tourTitleStep7,
        text: guideLang[guideLanguage].tourTextStep7,
        attachTo: {
            element: ".result-div",
            on: "left"
        },
        buttons: [
            {
                text: guideLang[guideLanguage].tourBackBtnText,
                action: tour.back
            },
            {
                text: guideLang[guideLanguage].tourNextBtnText,
                action: tour.next
            }
        ]
    });

    // 箇条書きの入力練習
    tour.addStep({
        title: guideLang[guideLanguage].tourTitleStep8,
        text: guideLang[guideLanguage].tourTextStep8,
        attachTo: {
            element: ".editor-div",
            on: "right"
        },
        buttons: [
            {
                text: guideLang[guideLanguage].tourBackBtnText,
                action: tour.back
            },
            {
                text: guideLang[guideLanguage].tourNextBtnText,
                action: tour.next
            }
        ]
    });

    // 箇条書きのプレビュー
    tour.addStep({
        title: guideLang[guideLanguage].tourTitleStep9,
        text: guideLang[guideLanguage].tourTextStep9,
        attachTo: {
            element: ".result-div",
            on: "left"
        },
        buttons: [
            {
                text: guideLang[guideLanguage].tourBackBtnText,
                action: tour.back
            },
            {
                text: guideLang[guideLanguage].tourNextBtnText,
                action: tour.next
            }
        ]
    });


    // 番号付き箇条書きの入力練習
    tour.addStep({
        title: guideLang[guideLanguage].tourTitleStep10,
        text: guideLang[guideLanguage].tourTextStep10,
        attachTo: {
            element: ".editor-div",
            on: "right"
        },
        buttons: [
            {
                text: guideLang[guideLanguage].tourBackBtnText,
                action: tour.back
            },
            {
                text: guideLang[guideLanguage].tourNextBtnText,
                action: tour.next
            }
        ]
    });

    // 番号付き箇条書きのプレビュー
    tour.addStep({
        title: guideLang[guideLanguage].tourTitleStep11,
        text: guideLang[guideLanguage].tourTextStep11,
        attachTo: {
            element: ".result-div",
            on: "left"
        },
        buttons: [
            {
                text: guideLang[guideLanguage].tourBackBtnText,
                action: tour.back
            },
            {
                text: guideLang[guideLanguage].tourNextBtnText,
                action: tour.next
            }
        ]
    });

    // マークダウンの記述方法のまとめ
    tour.addStep({
        title: guideLang[guideLanguage].tourTitleStep12,
        text: guideLang[guideLanguage].tourTextStep12,
        buttons: [
            {
                text: guideLang[guideLanguage].tourBackBtnText,
                action: tour.back
            },
            {
                text: guideLang[guideLanguage].tourNextBtnText,
                action: tour.next
            }
        ]
    });

    // 挿入&クリップボードコピーの説明
    tour.addStep({
        title: guideLang[guideLanguage].tourTitleStep13,
        text: guideLang[guideLanguage].tourTextStep13,
        attachTo: {
            element: ".preview-area .btn-text-copy",
            on: "top"
        },
        buttons: [
            {
                text: guideLang[guideLanguage].tourBackBtnText,
                action: tour.back
            },
            {
                text: guideLang[guideLanguage].tourNextBtnText,
                action: tour.next
            }
        ]
    });

    // PDF出力などの機能群の説明
    tour.addStep({
        title: guideLang[guideLanguage].tourTitleStep14,
        text: guideLang[guideLanguage].tourTextStep14,
        attachTo: {
            element: ".editor-area .btn-function",
            on: "top"
        },
        buttons: [
            {
                text: guideLang[guideLanguage].tourBackBtnText,
                action: tour.back
            },
            {
                text: guideLang[guideLanguage].tourNextBtnText,
                action: tour.next
            }
        ]
    });

    // ガイドの終了
    tour.addStep({
        title: guideLang[guideLanguage].tourTitleStep15,
        text: guideLang[guideLanguage].tourTextStep15,
        buttons: [
            {
                text: guideLang[guideLanguage].tourEndBtnText,
                action: tour.next
            }
        ]
    });

    return tour;
};