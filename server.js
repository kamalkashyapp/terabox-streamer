const express = require("express");
const cors = require("cors");
const scrapeTeraBox = require("./scraper");

const app = express();
app.use(cors());

app.get("/api/download", async (req, res) => {
  const { url } = req.query;

  if (!url || !url.includes("terabox.com")) {
    return res.status(400).json({ error: "Invalid or missing TeraBox URL." });
  }

  const data = await scrapeTeraBox(url);
  res.json(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ TeraBox API running on port ${PORT}`));
