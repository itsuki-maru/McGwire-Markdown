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

// ネスト対応トークナイザの共通関数
function createNestedTokenizer(typeName) {
    return {
        name: typeName,
        level: "block",
        start(src) {
            const re = new RegExp(`^:::${typeName}\\s`, "m");
            return src.match(re)?.index;
        },
        tokenizer(src, tokens) {
            if (!src.startsWith(`:::${typeName}`)) return null;

            const lines = src.split(/\r?\n/);
            let nestLevel = 0;
            let endIndex = -1;

            for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim();
                if (/^:::(\w+)/.test(line)) {
                    nestLevel++;
                } else if (/^:::\s*$/.test(line)) {
                    nestLevel--;
                    if (nestLevel === 0) {
                        endIndex = i;
                        break;
                    }
                }
            }

            if (endIndex === -1) return null;

            const rawLines = lines.slice(0, endIndex + 1);
            const raw = rawLines.join("\n");

            const titleMatch = lines[0].match(new RegExp(`^:::${typeName}\\s+(.+)`));
            const title = titleMatch ? titleMatch[1].trim() : typeName.toUpperCase();

            const content = lines.slice(1, endIndex).join("\n");

            return {
                type: typeName,
                raw,
                title,
                tokens: this.lexer.blockTokens(content),
            };
        },
        renderer(token) {
            const body = marked.parser(token.tokens);
            if (token.type === "details") {
                return `<details>\n<summary>${token.title}</summary>\n${body}\n</details>\n`;
            } else {
                return `<div class="box ${token.type}">\n<summary>${token.title}</summary>\n${body}\n</div>\n`;
            }
        },
    };
}

// それぞれのトークンを生成
export const detailsToken = createNestedTokenizer("details");
export const noteToken = createNestedTokenizer("note");
export const warningToken = createNestedTokenizer("warning");