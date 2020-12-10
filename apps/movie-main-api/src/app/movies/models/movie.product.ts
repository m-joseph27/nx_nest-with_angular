import * as mongoose from 'mongoose';

export const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String, required: true },
  created_at: Date
});

export interface Movie extends mongoose.Document {
  id: string;
  title: string;
  description: string;
  author: string;
  created_at: Date;
}