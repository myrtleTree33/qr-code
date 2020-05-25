import mongoose, { Schema } from 'mongoose';
import MongooseHidden from 'mongoose-hidden';

const mongooseHidden = MongooseHidden();

const UserSchema = new Schema({
  // either telegramId or messengerId; not both
  telegramId: { type: Number, index: true, sparse: true },
  messengerId: { type: String, index: true, sparse: true },
  instagramHandle: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  isMale: { type: Boolean },
  phoneNumber: { type: String },
  email: { type: String },
  dateJoined: { type: Date, required: true, default: Date.now }
});

UserSchema.set('toObject', { getters: true });
UserSchema.set('toJSON', { getters: true });

UserSchema.plugin(mongooseHidden, { hidden: { _id: false } });

// Index collection to improve search
UserSchema.index({
  _id: 1,
  telegramId: 1,
  messengerId: 1,
  instagramHandle: 1,
  firstName: 1,
  lastName: 1,
  isMale: 1,
  phoneNumber: 1,
  email: 1,
  dateJoined: 1
});

export default mongoose.model('Clients', UserSchema);
