import fs from "fs";
import logSymbols from "log-symbols";
import dotenv from "dotenv";
dotenv.config()

let apiKey = process.env.API_KEY;

function latestId() {
  fetch(`https://api.themoviedb.org/3/tv/latest?api_key=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      let last = JSON.stringify(data.id);
      fs.writeFile("latestId.json", last, (err) => {
        if (err) throw err;
        console.log(logSymbols.info, `Latest ID from The Movie Database: ${last}`);
      });
    });
}

export default latestId;
