import { MESSAGES } from "@/constants/constant";
import { PlatformType, type FormValues } from "@/global";
import { useAppDispatch, useAppSelector } from "@/redux";
import { onSave } from "@/redux/features/linkSlice";
import { createLinksList } from "@/services/links";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import { type SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { useMutation } from "@tanstack/react-query";
import { Reorder } from "framer-motion";
import { cloneDeep, isEmpty, isEqual, lte } from "lodash";
import { ChangeEvent, ReactNode, useLayoutEffect, useState } from "react";
import {
  Controller,
  SubmitHandler,
  type Control,
  type FieldErrors,
  type UseFieldArrayRemove,
  type UseFormHandleSubmit,
  type UseFormWatch,
} from "react-hook-form";
import BackdropWithLoader from "../BackdropWithLoader/BackdropWithLoader";
import CustomInput from "../FormElements/CustomInput";
import DragAndDropIcon from "../Icons/DragAndDropIcon";
import LinkIcon from "../Icons/LinkIcon";
import CustomSnackbar from "../Snackbar/CustomSnackbar";
import SelectPlatform from "./SelectPlatform";

type PlatformSelectorWithLinkProps = {
  control: Control<FormValues, any>;
  watch: UseFormWatch<FormValues>;
  handleSubmit: UseFormHandleSubmit<FormValues, undefined>;
  fields: Record<"id", string>[];
  remove: UseFieldArrayRemove;
  errors: FieldErrors<FormValues>;
  platformOptions: PlatformType[];
};

type SelectOnChangeType = ((
  event: SelectChangeEvent<unknown>,
  child: ReactNode
) => void) &
  ((event: string | ChangeEvent<Element>) => void);

const PlatformSelectorWithLink = (props: PlatformSelectorWithLinkProps) => {
  const {
    control,
    fields,
    platformOptions,
    watch,
    handleSubmit,
    remove,
    errors,
  } = props;
  const [dragOrderList, setDragOrderList] = useState(fields);
  const [lastItemError, setLastItemError] = useState(false);
  const dispatch = useAppDispatch();
  const { linksList } = useAppSelector((state) => state.links);
  const { isSuccess, isLoading, isError, error, mutateAsync } = useMutation({
    mutationFn: createLinksList,
  });
  const currentFormValues = watch()?.linksList;

  useLayoutEffect(() => {
    setDragOrderList(fields);
  }, [fields]);

  const handleRemoveLink = (index: number) => () => {
    if (lte(currentFormValues?.length, 1) && !isEmpty(linksList)) {
      setLastItemError(true);
      return;
    }

    setDragOrderList((prevList) =>
      prevList.filter((_item, idx) => !isEqual(idx, index))
    );
    remove(index);
    setLastItemError(false);
  };
  const { linksList: linkListError } = errors;

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const copiedData = cloneDeep(data.linksList);
    dispatch(
      onSave({
        linksList: copiedData,
      })
    );

    await mutateAsync({ linksList: data.linksList });
  };

  const renderSnackbar = () => {
    if (isSuccess || isError || lastItemError) {
      return (
        <CustomSnackbar severity={isSuccess ? "success" : "error"}>
          {isSuccess && MESSAGES.LINKS_SAVE_SUCCESSFUL}
          {isError && (error as string)}
          {lastItemError && MESSAGES.LAST_ITEM_REMOVAL_ERROR}
        </CustomSnackbar>
      );
    }
    return null;
  };

  const renderLoader = () => {
    if (isLoading) {
      return <BackdropWithLoader openModal={isLoading} />;
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Reorder.Group
          axis="y"
          onReorder={setDragOrderList}
          values={dragOrderList}
        >
          {dragOrderList.map((item, index) => {
            return (
              <Reorder.Item value={item} id={item.id} key={item.id}>
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
                      <SelectPlatform
                        label="Platform"
                        onChange={onChange as SelectOnChangeType}
                        {...otherProps}
                        index={index}
                        errors={errors}
                        platformOptions={platformOptions}
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
              </Reorder.Item>
            );
          })}
        </Reorder.Group>
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
      {renderSnackbar()}
      {renderLoader()}
    </Box>
  );
};

export default PlatformSelectorWithLink;
