import mongoose from 'mongoose';

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

export default tvSchema;