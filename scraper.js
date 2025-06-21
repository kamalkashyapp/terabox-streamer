const puppeteer = require("puppeteer");

async function scrapeTeraBox(url) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });

  try {
    await page.waitForSelector("video", { timeout: 10000 });

    const videoData = await page.evaluate(() => {
      const video = document.querySelector("video");
      return {
        title: document.title,
        videoUrl: video?.src || null
      };
    });

    await browser.close();
    return { success: true, ...videoData };

  } catch (error) {
    await browser.close();
    return { success: false, error: "Video not found or unsupported." };
  }
}

module.exports = scrapeTeraBox;
