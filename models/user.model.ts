import { Document, Model, Schema, model, models } from "mongoose";

export interface IUser extends Document {
  email: string;
  name?: string;
  password?: string;
  emailVerified?: boolean | Date;
  image?: string;
  accounts?: string[];
  sessions?: string[];
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      lowerCase: true,
      unique: true,
    },
    name: {
      type: String,
    },
    password: {
      type: String,
      minlength: [8, "Minimum of 8 characters is required for password"],
    },
    emailVerified: Date,
    image: String,
    accounts: [{ type: Schema.Types.ObjectId, ref: "Account" }],
    sessions: [{ type: Schema.Types.ObjectId, ref: "Session" }],
  },
  {
    timestamps: true,
  }
);

const UserModel =
  (models.User as Model<IUser>) || model<IUser>("User", UserSchema);
export default UserModel;
