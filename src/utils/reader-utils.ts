const fs = require("fs");

function readMarkdown(filePath: string) {
  return fs.readFileSync(filePath, "utf-8");
}

export { readMarkdown }