import { Schema, model, models, type Document, type Model } from "mongoose";
import { IUser } from "./user.model";

export interface ILinks extends Document {
  linksList: { platform: string; link: string };
  createdBy: IUser["_id"];
}

const LinksSchema = new Schema<ILinks>({
  linksList: [
    {
      platform: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
});

const LinksModel =
  (models.Link as Model<ILinks>) || model<ILinks>("Link", LinksSchema);

export default LinksModel;
