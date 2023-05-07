import fs from "fs";
import dotenv from "dotenv";
import axios from "axios";
import logSymbols from 'log-symbols';
import mongoose from 'mongoose';
dotenv.config();

const database = process.env.DATABASE;
const apiKey = process.env.API_KEY;
const baseUrl = "https://api.themoviedb.org/3/tv/"; 
const language = 'en-US';
const total = 100; // fs.readFileSync('latestId.json', 'utf8');
const startTimer = Date.now();
const timeElapsed = Date.now() - startTimer;

mongoose.connect(database, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const tvSchema = new mongoose.Schema({
  id: Number,
  name: String,
  overview: String,
  created_by: [
    {
      id: Number,
      name: String,
    }
  ],
  first_air_date: String,
  poster_path: String,
  genres: [
    {
      id: Number,
      name: String,
    }
  ],
  vote_average: Number,
});

const TV = mongoose.model('TV', tvSchema);

function formatDate(date) {
  let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [day, month, year].join('_');
}

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
    await TV.insertMany(data);
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
  let tvLength = await TV.countDocuments();
  console.log(`\n${logSymbols.success} Total data fetched: ${tvLength}`);
  console.log(`${logSymbols.info} Time elapsed: ${Math.floor(timeElapsed / 3600000)} hours`);
}

main();