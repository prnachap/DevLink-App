import { Document, Schema, model, models, type Model } from "mongoose";

export interface IPlatform extends Document {
  platform: string;
}
const PlatformSchema = new Schema<IPlatform>(
  {
    platform: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const PlatformModel =
  (models.Platform as Model<IPlatform>) ||
  model<IPlatform>("Platform", PlatformSchema);

export default PlatformModel;
