import fs from "fs";
import logSymbols from "log-symbols";

function latestId(apiKey) {
  fetch(`https://api.themoviedb.org/3/tv/latest?api_key=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      let last = JSON.stringify(data.id);
      fs.writeFile("latestId.json", last, (err) => {
        if (err) throw err;
        console.log(logSymbols.success, `Latest ID: ${last}`);
      });
    });
}

export default latestId;
