import mongoose from 'mongoose';

export default function exitHandler() {
  mongoose.connection.close();
  process.exit();
}