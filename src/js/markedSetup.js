// videoカスタムトークンの追加
export const videoToken = {
    name: "video",
    level: "inline",
    start(src) {
        return src.match(/\?\[.*\]\(.*\)/)?.index;
    },

    tokenizer(src, tokens) {
        const rule = /^\?\[(.*?)\]\((.*?)\)/;
        const match = rule.exec(src);
        if (match) {
            return {
                type: "video",
                raw: match[0],
                text: match[1],
                href: match[2],
                tokens: this.lexer.inlineTokens(match[1], [])
            };
        }
    },
    renderer(token) {
        return `<video controls src="${token.href}">${token.text}</video>`;
    }
}

// カスタムトークン"details"の定義（型は緩くanyとする）
export const detailsToken = {
    name: "details",
    level: "block", // ブロック要素として取り扱い
    start(src) {
        return src.match(/^:::details\s/m)?.index;
    },
    tokenizer(src, tokens) {
        if (!src.startsWith(":::details")) return null;
        // src の先頭に :::details がある場合のみ処理
        const rule = /^:::details\s+(.+?)\r?\n([\s\S]*?)^\s*:::\s*$/m;
        const match = src.match(rule);
        if (match) {
            const raw = match[0];
            const title = match[1].trim();
            const content = match[2].replace(/\r\n/g, "\n"); // 改行正規化
            return {
                type: "details", // カスタムトークンタイプ
                raw,
                title,
                tokens: this.lexer.blockTokens(content),
            };
        }
    },
    renderer(token) {
        const body = marked.parser(token.tokens);
        return `<details>\n<summary>${token.title}</summary>\n${body}\n</details>\n`;
    }
};

// カスタムトークン"note"の定義（型は緩くanyとする）
export const noteToken = {
    name: "note",
    level: "block", // ブロック要素として取り扱い
    start(src) {
        return src.match(/^:::note\s/m)?.index;
    },
    tokenizer(src, tokens) {
        if (!src.startsWith(":::note")) return null;
        // src の先頭に :::note がある場合のみ処理
        const rule = /^:::note\s+(.+?)\r?\n([\s\S]*?)^\s*:::\s*$/m;
        const match = src.match(rule);
        if (match) {
            const raw = match[0];
            const title = match[1].trim();
            const content = match[2].replace(/\r\n/g, "\n"); // 改行正規化
            return {
                type: "note", // カスタムトークンタイプ
                raw,
                title,
                tokens: this.lexer.blockTokens(content),
            };
        }
    },
    renderer(token) {
        const body = marked.parser(token.tokens);
        return `<div class="box ${token.type}">\n<summary>${token.title}</summary>\n${body}\n</div>\n`;
    }
};

// カスタムトークン"warning"の定義（型は緩くanyとする）
export const warningToken = {
    name: "warning",
    level: "block", // ブロック要素として取り扱い
    start(src) {
        return src.match(/^:::warning\s/m)?.index;
    },
    tokenizer(src, tokens) {
        if (!src.startsWith(":::warning")) return null;
        // src の先頭に :::warning がある場合のみ処理
        const rule = /^:::warning\s+(.+?)\r?\n([\s\S]*?)^\s*:::\s*$/m;
        const match = src.match(rule);
        if (match) {
            const raw = match[0];
            const title = match[1].trim();
            const content = match[2].replace(/\r\n/g, "\n"); // 改行正規化
            return {
                type: "warning", // カスタムトークンタイプ
                raw,
                title,
                tokens: this.lexer.blockTokens(content),
            };
        }
    },
    renderer(token) {
        const body = marked.parser(token.tokens);
        return `<div class="box ${token.type}">\n<summary>${token.title}</summary>\n${body}\n</div>\n`;
    }
};