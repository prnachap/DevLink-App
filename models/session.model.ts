import { Schema, model, models } from "mongoose";

interface ISession {
  sessionToken: string;
  expires: Date;
  userId: Schema.Types.ObjectId;
}
const SessionSchema = new Schema<ISession>({
  sessionToken: String,
  expires: Date,
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

const SessionModel = models.Session || model("Session", SessionSchema);
export default SessionModel;
