import mongoose, { Document, Schema } from 'mongoose';
import { connectDatabase } from '../../db';
import { ObjectId } from 'mongodb';

connectDatabase();

// User schema
const objectSchema = new Schema({
  obj_name: {
    type: String,
    required: [true, "object name is required"],
    unique: [true, "object name already exists"],
  },
  obj_pic: {
    type: String,
    required: [true, "object name is required"],
  },
  end_time: {
    type: Date,
    required: [true, "End time is required"],
  },
  owner: {
    type: ObjectId,
    required: [true, "Owner is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  status: {
    type: Boolean,
    default: false,
  },
  initial_bid: {
    type: Number,
    required: [true, "Initial is required"],
  },
});

export const obj_models = mongoose.model('objects', objectSchema);