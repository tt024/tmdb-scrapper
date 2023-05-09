import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  id: Number,
  title: String,
  original_title: String,
  tagline: String,
  overview: String,
  status: String,
  release_date: String,
  runtime: Number,
  original_language: String,
  genres: [
    {
      id: Number,
      name: String,
    }
  ],
  revenue: Number,
  budget: Number,
  vote_average: Number,
  vote_count: Number,
  popularity: Number,
  spoken_languages: [
    {
      iso_639_1: String,
      name: String,
      english_name: String,
    }
  ],
  production_companies: [
    {
      id: Number,
      logo_path:  String,
      name: String,
      origin_country: String,
    }
  ],
  production_countries: [
    {
      iso_3166_1: String,
      name: String,
    }
  ],
  imdb_id: String,
  poster_path: String,
  backdrop_path: String,
  adult: Boolean
});

export default movieSchema;