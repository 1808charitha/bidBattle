import mongoose, { Schema } from 'mongoose';
import { connectDatabase } from '../../db';
import { ObjectId } from 'mongodb';

connectDatabase();

// User schema
const timelineSchema = new Schema({
  obj_id: {
    type: ObjectId,
    unique: true,
  },
  bid_amount: {
    type: Number,
    default: 0,

  },
  bidder: {
    type: ObjectId,
    default: null,
  },
});

export const timeline_models = mongoose.model('timelines', timelineSchema);