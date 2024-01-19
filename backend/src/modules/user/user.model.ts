import { Document, Schema, Types, model } from 'mongoose';
import * as bcrypt from 'bcrypt';

export interface IUser extends Document<Types.ObjectId> {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  permission: {
    category: { read: boolean; update: boolean; delete: boolean; create: boolean };
    product: { read: boolean; update: boolean; delete: boolean; create: boolean };
    productIncome: { read: boolean; update: boolean; delete: boolean; create: boolean };
    productOutcome: { read: boolean; update: boolean; delete: boolean; create: boolean };
    users: { read: boolean; update: boolean; delete: boolean; create: boolean };
    productReport: { read: boolean; update: boolean; delete: boolean; create: boolean };
    incomeReport: { read: boolean; update: boolean; delete: boolean; create: boolean };
    expenses: { read: boolean; update: boolean; delete: boolean; create: boolean };
  };
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
    permission: {
      category: {
        read: {
          type: Boolean,
          default: true,
        },
        create: {
          type: Boolean,
          default: false,
        },
        update: {
          type: Boolean,
          default: false,
        },
        delete: {
          type: Boolean,
          default: false,
        },
      },
      product: {
        read: {
          type: Boolean,
          default: true,
        },
        create: {
          type: Boolean,
          default: false,
        },
        update: {
          type: Boolean,
          default: false,
        },
        delete: {
          type: Boolean,
          default: false,
        },
      },
      productIncome: {
        read: {
          type: Boolean,
          default: true,
        },
        create: {
          type: Boolean,
          default: false,
        },
        update: {
          type: Boolean,
          default: false,
        },
        delete: {
          type: Boolean,
          default: false,
        },
      },
      productOutcome: {
        read: {
          type: Boolean,
          default: true,
        },
        create: {
          type: Boolean,
          default: false,
        },
        update: {
          type: Boolean,
          default: false,
        },
        delete: {
          type: Boolean,
          default: false,
        },
      },
      productReport: {
        read: {
          type: Boolean,
          default: true,
        },
        create: {
          type: Boolean,
          default: false,
        },
        update: {
          type: Boolean,
          default: false,
        },
        delete: {
          type: Boolean,
          default: false,
        },
      },
      incomeReport: {
        read: {
          type: Boolean,
          default: true,
        },
        create: {
          type: Boolean,
          default: false,
        },
        update: {
          type: Boolean,
          default: false,
        },
        delete: {
          type: Boolean,
          default: false,
        },
      },
      users: {
        read: {
          type: Boolean,
          default: true,
        },
        create: {
          type: Boolean,
          default: false,
        },
        update: {
          type: Boolean,
          default: false,
        },
        delete: {
          type: Boolean,
          default: false,
        },
      },
      expenses: {
        read: {
          type: Boolean,
          default: true,
        },
        create: {
          type: Boolean,
          default: false,
        },
        update: {
          type: Boolean,
          default: false,
        },
        delete: {
          type: Boolean,
          default: false,
        },
      },
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
