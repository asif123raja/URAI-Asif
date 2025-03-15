// import mongoose, { Schema, Document, Model } from "mongoose";
// import bcryptjs from "bcryptjs";

// // Define the IUser interface
// export interface IUser extends Document {
//   _id: mongoose.Types.ObjectId;
//   username: string;
//   email: string;
//   password: string;
//   country: string; // 🌍 Added country instead of pincode
//   level: number; // 🆙UserSlevel in the Solo Leveling system
//   experience: number; // 🔥 XP points for leveling up
//   points: number; // 🎯 Points earned from challenges
//   cryptoBalance: number; // 💰 Crypto rewards balance
//   walletAddress?: string; // 🏦 Optional wallet address
//   challengesCompleted: {
//     challengeName: string;
//     date: Date;
//     pointsEarned: number;
//   }[];
//   challengeStreak: number; // 🔥 Daily challenge streak
// }

// // Define the UserSchema
// const UserSchema = new Schema<IUser>(
//   {
//     username: { type: String, required: true, unique: true, trim: true },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//       lowercase: true,
//       validate: {
//         validator: (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
//         message: "Invalid email format",
//       },
//     },
//     password: { type: String, required: true, minlength: 6 },
//     country: { type: String, required: true, trim: true }, // 🌍 Required country field
//     level: { type: Number, default: 1, min: 1 }, // 🆙 Level system starts at 1
//     experience: { type: Number, default: 0, min: 0 }, // 🔥 XP for level progression
//     points: { type: Number, default: 0, min: 0 }, // 🎯 Earned points
//     cryptoBalance: { type: Number, default: 0, min: 0 }, // 💰 Crypto balance
//     walletAddress: { type: String, unique: true, sparse: true, trim: true },
//     challengesCompleted: [
//       {
//         challengeName: { type: String, required: true },
//         date: { type: Date, default: Date.now },
//         pointsEarned: { type: Number, required: true, min: 0 },
//       },
//     ],
//     challengeStreak: { type: Number, default: 0, min: 0 }, // 🔥 Streak tracking
//   },
//   { timestamps: true }
// );

// // Add indexes for frequently queried fields
// UserSchema.index({ email: 1, username: 1 });

// // Hash password before saving
// UserSchema.pre<IUser>("save", async function (next) {
//   if (!this.isModified("password")) return next();

//   try {
//     const salt = await bcryptjs.genSalt(10);
//     this.password = await bcryptjs.hash(this.password, salt);
//     next();
//   } catch (error) {
//     next(error as Error);
//   }
// });

// // 🔥 Middleware to reset streak at 12 AM if no challenge was completed
// UserSchema.pre<IUser>("save", function (next) {
//   if (!this.isModified("challengesCompleted")) return next();

//   const lastChallenge = this.challengesCompleted[this.challengesCompleted.length - 1];
//   const today = new Date();
//   today.setHours(0, 0, 0, 0); // Reset to 12 AM

//   if (!lastChallenge || new Date(lastChallenge.date) < today) {
//     this.challengeStreak = 0; // Reset streak
//   }

//   next();
// });

// // Ensure model is only compiled once to prevent duplicate models in dev mode
// const User: Model<IUser> =
//   mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

// export default User;


import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  country: string;
  phoneNumber?: string;
  paymentDetails?: {
    cardNumber?: string;
    expiryDate?: string;
    cvv?: string;
    paymentMethod?: 'credit_card' | 'paypal' | 'crypto';
  };
  subscription?: {
    plan: string;
    startDate: Date;
    endDate: Date;
    status: 'active' | 'inactive' | 'cancelled';
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
        message: "Invalid email format",
      },
    },
    password: { type: String, required: true },
    country: { type: String, required: true },
    phoneNumber: { type: String },
    paymentDetails: {
      cardNumber: { type: String },
      expiryDate: { type: String },
      cvv: { type: String },
      paymentMethod: { type: String, enum: ['credit_card', 'paypal', 'crypto'] },
    },
    subscription: {
      plan: { type: String },
      startDate: { type: Date },
      endDate: { type: Date },
      status: { type: String, enum: ['active', 'inactive', 'cancelled'], default: 'inactive' },
    },
  },
  { timestamps: true }
);

// ✅ Fix: Use existing model if already compiled
export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
