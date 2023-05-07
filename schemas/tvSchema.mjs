import mongoose from 'mongoose';

const tvSchema = new mongoose.Schema({
  id: Number,
  name: String,
  original_name: String,
  overview: String,
  tagline: String,
  in_production: Boolean,
  status: String,
  original_language: String,
  origin_country: [
    String
  ],
  created_by: [
    {
      id: Number,
      name: String,
    }
  ],
  first_air_date: String,
  last_air_date: String,
  number_of_episodes: Number,
  number_of_seasons: Number,
  production_companies: [
    {
      id: Number,
      name: String,
      logo_path: String,
      origin_country: String,
    }
  ],
  poster_path: String,
  genres: [
    {
      id: Number,
      name: String,
    }
  ],
  vote_average: Number,
  vote_count: Number,
  popularity: Number
});

export default tvSchema;