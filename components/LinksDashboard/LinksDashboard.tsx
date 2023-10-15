"use client";

import { PlatformType } from "@/global";
import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { isEmpty } from "lodash";
import { Fragment, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import LinkManagementPanel from "../LinkProfileBuilder/LinkManagementPanel";
import LinkViewPanel from "../LinkProfileBuilder/LinkViewPanel";
import NoContentScreen from "../LinkProfileBuilder/NoContentScreen";
import PlatformSelectorWithLink from "../LinkProfileBuilder/PlatformSelectorWithLink";

import useFetchLinksList from "@/hooks/useFetchLinksList";
import { useAppDispatch, useAppSelector } from "@/redux";
import { onFormChange } from "@/redux/features/linkSlice";
import BackdropWithLoader from "../BackdropWithLoader/BackdropWithLoader";

const linkSchema = yup.object({
  platform: yup.string().required("Can't be empty"),
  url: yup.string().url("Please check the URL").required("Can't be empty"),
});

const schema = yup.object({
  linksList: yup
    .array()
    .of(linkSchema)
    .required("Atleast one item is required"),
});

type FormValues = yup.InferType<typeof schema>;

const LinksDashboard = ({
  platformOptions,
}: {
  platformOptions: PlatformType[];
}) => {
  const linksList = useAppSelector((state) => state.links.linksList);
  const { isLoading } = useFetchLinksList();
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    getValues,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { linksList },
  });

  useEffect(() => {
    dispatch(onFormChange({ isDirty }));
  }, [isDirty, dispatch]);

  useEffect(() => {
    if (isEmpty(linksList)) return;
    reset({ linksList });
  }, [linksList, reset]);

  const { fields, append, remove } = useFieldArray({
    name: "linksList",
    control,
  });

  const handleToggleCreationForm = () => {
    append({ platform: "", url: "" });
  };

  const currentLinksValue = getValues().linksList;

  const renderListOrNoDataScreen = () => {
    return isEmpty(currentLinksValue) ? (
      <NoContentScreen />
    ) : (
      <PlatformSelectorWithLink
        control={control}
        handleSubmit={handleSubmit}
        watch={watch}
        fields={fields}
        remove={remove}
        errors={errors}
        platformOptions={platformOptions}
      />
    );
  };

  return (
    <Fragment>
      <Box className="pb-6 px-6 mt-4 grid grid-cols-1 lg:grid-cols-[2fr,3fr] lg:gap-6 lg:p-0">
        <Card
          className="hidden lg:block bg-white p-5 border-none"
          variant="outlined"
        >
          <Box className="flex justify-center items-center">
            <LinkViewPanel watch={watch} />
          </Box>
        </Card>
        <Card className="bg-white p-5 border-none " variant="outlined">
          <Box className="mb-6">
            <LinkManagementPanel onAddNewLinkClick={handleToggleCreationForm} />
          </Box>
          <Box className="mb-8">
            {isLoading && <BackdropWithLoader openModal={isLoading} />}
            {renderListOrNoDataScreen()}
          </Box>
        </Card>
      </Box>
    </Fragment>
  );
};

export default LinksDashboard;
