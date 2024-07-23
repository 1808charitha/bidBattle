import mongoose, { Document, Schema } from 'mongoose';
import { connectDatabase } from '../../db';

connectDatabase();

// User schema
const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "User name is required"],
    unique: [true, "User name already exists"],
  },
  email: {
    type: String,
    required: [true, "User name is required"],
    unique: [true, "User name already exists"],
  },
  password: {
    type: String,
    required: [true, "User name is required"],
  },
});

export const User = mongoose.model('users', userSchema);