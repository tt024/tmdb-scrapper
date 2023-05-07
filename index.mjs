import fs from "fs";
import dotenv from "dotenv";
import axios from "axios";
import logSymbols from "log-symbols";
import latestId from "./latestId.mjs";
dotenv.config();

const timer = Date.now();
const apiKey = process.env.API_KEY;
latestId(apiKey);
let total = fs.readFileSync("latestId.json", "utf-8");
const baseUrl = "https://api.themoviedb.org/3/tv/";
const language = "en-US";

async function fetchData(id, data = []) {
  let url = `${baseUrl}${id}?api_key=${apiKey}&language=${language}`;
  try {
    const response = await axios.get(url);
    if (typeof response.data === "object") {
      console.log(`${logSymbols.success} Data fetched for ID ${id}`);
      return [...data, response.data];
    } else {
      console.log(`${logSymbols.error} Unexpected response data for ID ${id}: ${response.data}`);
      return data;
    }
  } catch (error) {
    console.log(`${logSymbols.error} Error fetching data for ID ${id}: ${error.message}`);
    return data;
  }
}

