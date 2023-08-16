import { Schema, model, models } from "mongoose";

interface VerificationToken {
  identifier?: string;
  token?: string;
  expires?: string;
}

const VerificationTokenSchema = new Schema({
  identifier: String,
  token: String,
  expires: String,
});

const VerificationTokenModel =
  models.VerificationToken ||
  model("VerificationToken", VerificationTokenSchema);

export default VerificationTokenModel;
