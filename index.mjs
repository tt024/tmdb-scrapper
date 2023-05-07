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