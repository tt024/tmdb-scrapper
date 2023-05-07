import dotenv from "dotenv";
dotenv.config();

const database = process.env.DATABASE;
const apiKey = process.env.API_KEY;
const baseUrl = "https://api.themoviedb.org/3/tv/"; 
const language = 'en-US';
const total = fs.readFileSync('latestId.json', 'utf8');

export { database, apiKey, baseUrl, language, total };