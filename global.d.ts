export type CustomInputProps = OutlinedInputProps & { helperText?: string };
export type FormValues = {
  linksList: { platform: string; url: string }[];
};
export type PlatformType = {
  _id: string;
  platform: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
};

type CreateLinksListResponse = {
  data: {
    _id: string;
    linksList: FormValues["linksList"];
    createdBy: string;
  };
};
