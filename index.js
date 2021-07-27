const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://en.wikipedia.org/wiki/Faker_(gamer)"

async function scrapeData() {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const title = $("h1");
    console.log(title.text());
  } catch (err) {
    console.log(err);
  }
}

scrapeData();
