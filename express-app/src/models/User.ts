import mongoose, { Schema } from 'mongoose';

const userSchema: Schema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
  });

const User = mongoose.model('User', userSchema);

export default User;