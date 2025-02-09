import mongoose, { Document, Model } from 'mongoose';

export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
};

export interface IUser extends Document {
  name?: string; // * Optional while login
  email: string;
  password: string;
  role?: string; // * Optional while login
}

const UserSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
  role: {
    type: String,
    enum: Object.values(USER_ROLES),
    default: USER_ROLES.USER,
  }
});

// * Prevent model overwrite upon hot-reloading in development
const User: Model<IUser> =
  mongoose?.models?.User || mongoose.model<IUser>('User', UserSchema);

export default User;
