import { LinkDetails } from "./redux/features/linkSlice";

type CustomInputProps = OutlinedInputProps & { helperText?: string };
type FormValues = {
  linksList: LinkDetails[];
};
