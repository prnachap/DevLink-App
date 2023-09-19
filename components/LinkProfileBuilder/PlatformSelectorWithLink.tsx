import { FormValues } from "@/global";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import { type SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { isEmpty } from "lodash";
import { ChangeEvent, ReactNode } from "react";
import {
  Controller,
  type Control,
  type FieldArrayWithId,
  type FieldErrors,
  type UseFieldArrayRemove,
  type UseFormHandleSubmit,
} from "react-hook-form";
import CustomInput from "../FormElements/CustomInput";
import CustomSelect from "../FormElements/CustomSelect";
import DragAndDropIcon from "../Icons/DragAndDropIcon";
import LinkIcon from "../Icons/LinkIcon";

type PlatformSelectorWithLinkProps = {
  control: Control<FormValues, any>;
  handleSubmit: UseFormHandleSubmit<FormValues, undefined>;
  fields: FieldArrayWithId<FormValues, "linksList", "id">[];
  remove: UseFieldArrayRemove;
  errors: FieldErrors<{
    linksList: {
      platform: string;
      url: string;
    }[];
  }>;
};

type SelectOnChangeType = ((
  event: SelectChangeEvent<unknown>,
  child: ReactNode
) => void) &
  ((event: string | ChangeEvent<Element>) => void);

const PlatformSelectorWithLink = (props: PlatformSelectorWithLinkProps) => {
  const { control, fields, handleSubmit, remove, errors } = props;

  const handleRemoveLink = (index: number) => () => {
    remove(index);
  };
  const { linksList: linkListError } = errors;

  const onSumbit = handleSubmit((data) => {
    console.log("data", data);
  });

  return (
    <Box>
      <form onSubmit={onSumbit}>
        {fields.map((item, index) => {
          return (
            <Card
              variant="outlined"
              className="bg-lotion p-5 border-none flex flex-col gap-3 mb-6"
              key={item.id}
            >
              <Box className="flex justify-between items-center">
                <Box className="flex gap-2 items-center">
                  <DragAndDropIcon />
                  <Typography
                    variant="body1"
                    className="bodyOne !font-bold !text-nickel"
                  >
                    Link #{index + 1}
                  </Typography>
                </Box>
                <Box>
                  <Button
                    className="bodyTwo !font-normal !text-nickel"
                    onClick={handleRemoveLink(index)}
                  >
                    Remove
                  </Button>
                </Box>
              </Box>
              <Controller
                render={({ field: { onChange, ...otherProps } }) => (
                  <CustomSelect
                    error={!isEmpty(linkListError?.[index]?.["platform"])}
                    helperText={linkListError?.[index]?.["platform"]?.message}
                    label="Platform"
                    onChange={onChange as SelectOnChangeType}
                    {...otherProps}
                  />
                )}
                name={`linksList.${index}.platform`}
                control={control}
              />
              <Controller
                render={({ field }) => (
                  <CustomInput
                    label="Link"
                    startAdornment={
                      <InputAdornment position="start">
                        <LinkIcon />
                      </InputAdornment>
                    }
                    error={!isEmpty(linkListError?.[index]?.["url"])}
                    helperText={linkListError?.[index]?.["url"]?.message}
                    {...field}
                  />
                )}
                name={`linksList.${index}.url`}
                control={control}
              />
            </Card>
          );
        })}
        <Divider className="mt-4" />
        <Box className="flex justify-end mt-4">
          <Button
            variant="contained"
            className="capitalize body-one bg-hanPurple !text-white
         px-4 hover:bg-hanPurple transition-all ease-in-out duration-500"
            type="submit"
          >
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default PlatformSelectorWithLink;
