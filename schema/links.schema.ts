import { object, array, string, TypeOf } from "zod";

const links = object({
  platform: string({ required_error: "platform is required" }).optional(),
  url: string({ required_error: "url is required" }).optional(),
});
export const linksSchema = array(links).min(
  1,
  "You must add at least one object containing 'platform' and 'url' details in the array"
);
export type LinksInput = TypeOf<typeof linksSchema>;
