const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

async function generateQuotationPDF(content) {

  const templatePath = path.join(__dirname, "../template/quotationTemplate.html");

  let html = fs.readFileSync(templatePath, "utf8");

  // replace placeholder
  html = html.replace("{{CONTENT}}", content);

  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.setContent(html, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true
  });

  await browser.close();

  return pdfBuffer;
}

module.exports = generateQuotationPDF;