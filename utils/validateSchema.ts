import { AnyZodObject, ZodArray, ZodError } from "zod";

export const validateResources = (
  schema: AnyZodObject | ZodArray<AnyZodObject>,
  data: any
) => {
  try {
    schema.parse(data);
    return null;
  } catch (error) {
    return error as ZodError;
  }
};
