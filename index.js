const axios = require("axios");
const cheerio = require("cheerio");

let url = "https://en.wikipedia.org/wiki/Hasan_Piker";

const wikiLink = /^\/wiki\/(?!.*:).*/;

const linkJumps = 12;

async function scrapeData() {
  try {
    for (let i = 0; i < linkJumps; i++) {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);

      const links = $("#bodyContent a");

      let totalLinks = [];
      links.each((_, el) => {
        const link = $(el).attr("href");
        if (wikiLink.test(link)) {
          totalLinks.push(link);
        }
      });

      console.log($("h1").text());
      console.log(` - ${url}`);

      url = `https://wikipedia.org${randomLink(totalLinks)}`;
    } 
  } catch (err) {
    console.log(err);
  }
}

function randomLink(links) {
  return links[Math.floor(Math.random() * links.length)];
}

scrapeData();
