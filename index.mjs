import fs from "fs";
import axios from "axios";
import logSymbols from 'log-symbols';
import mongoose from 'mongoose';
import tvSchema from "./schemas/tvSchema.mjs";
import { database, apiKey, baseUrl, language, total } from "./config.mjs";
import formatDate from "./utils/formatDate.mjs";

mongoose.connect(database, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const TV = mongoose.model('TV', tvSchema);
let tvLength = await TV.countDocuments();
const startTimer = Date.now();

async function fetchData(id) {
  const url = `${baseUrl}${id}?api_key=${apiKey}&language=${language}`;
  try {
    const response = await axios.get(url);
    if (typeof response.data === "object") {
      console.log(`${logSymbols.success} Data fetched for ID ${id}`);
      return response.data;
    } else {
      console.log(`${logSymbols.error} Unexpected response data for ID ${id}: ${response.data}`);
      return null;
    }
  } catch (error) {
    console.log(`${logSymbols.error} Error fetching data for ID ${id}: ${error.message}`);
    return null;
  }
}

async function saveData(data) {
  try {
  //  await TV.insertMany(data);
    console.log(`${logSymbols.info} Batch saved to Mongoose database`);
  } catch (err) {
    console.error(`${logSymbols.error} Error saving data to Mongoose database:`, err);
    await fs.promises.writeFile(`error_${formatDate(Date())}.txt`, err)
  }
}

async function main() {
  let allData = [];
  let count = 0;
  for (let i = 1; i <= total; i++) {
    const data = await fetchData(i);
    count++;

    if (data) {
      allData.push(data);
    }

    if (count === 100) {
      await saveData(allData);
      allData = [];
      count = 0;
    }
  }
  const timeElapsed = Date.now() - startTimer;
  console.log(`\n${logSymbols.success} Total data fetched: ${tvLength}`);
  console.log(`${logSymbols.info} Time elapsed: ${Math.floor(timeElapsed / 3600000)} hours`);
  fs.writeFileSync(`log_${formatDate(Date())}.txt`, `Total data fetched: ${tvLength}\nTime elapsed: ${Math.floor(timeElapsed / 3600000)} hours`);
}

main();