import fs from 'fs';
import dotenv from 'dotenv';
import axios from 'axios';
import logSymbols from 'log-symbols';
dotenv.config();

const timer = Date.now();
const apiKey = process.env.API_KEY;
const baseUrl = 'https://api.themoviedb.org/3/tv/';
const language = 'en-US';