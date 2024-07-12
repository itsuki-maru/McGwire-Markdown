module.exports = (html, style) => `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>McGwire</title>
  <style>
  ${style}
  </style>
  <script src="https://cdn.jsdelivr.net/npm/mermaid@10.5.0/dist/mermaid.min.js"></script>
</head>

<body>
<div class="container-fluid">${html}</div>
</body>
</html>`;
