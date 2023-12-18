import { Document, Schema, Types, model } from 'mongoose';
import * as bcrypt from 'bcrypt';

export interface IUser extends Document<Types.ObjectId> {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: 'ADMIN' | 'ACCOUNTANT' | 'USER';
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ['ADMIN', 'ACCOUNTANT', 'USER'],
      default: 'USER',
    },
  },
  { timestamps: true },
);

UserSchema.pre('save', async function (next) {
  if (this.password && this.isModified('password')) {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
  }
  next();
});

export const UserModel = model<IUser>('User', UserSchema);
