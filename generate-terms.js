import fs from "fs";
import path from "path";

const data = fs.readFileSync("./data.js", "utf-8");
const match = data.match(/window\.GLOSSARY_TERMS\s*=\s*(\[[\s\S]*?\]);/);

if (!match) {
  console.error("Cannot find GLOSSARY_TERMS in data.js");
  process.exit(1);
}

const terms = eval(match[1]);

const template = fs.readFileSync("./term-template.html", "utf8");
const outputDir = "./";

terms.forEach((term) => {
  const html = template
    .replace(/{{term}}/g, term.term)
    .replace(/{{definition}}/g, term.definition)
    .replace(/{{id}}/g, term.id);

  const filename = `term-${term.id}.html`;

  fs.writeFileSync(path.join(outputDir, filename), html);

  console.log("Generated:", filename);
});
