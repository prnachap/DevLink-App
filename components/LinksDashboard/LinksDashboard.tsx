"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { isEmpty } from "lodash";
import { Fragment } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import LinkManagementPanel from "../LinkProfileBuilder/LinkManagementPanel";
import LinkViewPanel from "../LinkProfileBuilder/LinkViewPanel";
import NoContentScreen from "../LinkProfileBuilder/NoContentScreen";
import PlatformSelectorWithLink from "../LinkProfileBuilder/PlatformSelectorWithLink";

const formInitialState = {
  linksList: [],
};

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

const LinksDashboard = () => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: formInitialState,
  });

  const { fields, append, remove } = useFieldArray({
    name: "linksList",
    control,
  });

  const listOfLinks = getValues()?.linksList;

  const handleToggleCreationForm = () => {
    append({ platform: "", url: "" });
  };

  const renderListOrNoDataScreen = () => {
    return isEmpty(listOfLinks) ? (
      <NoContentScreen />
    ) : (
      <PlatformSelectorWithLink
        control={control}
        handleSubmit={handleSubmit}
        fields={fields}
        remove={remove}
        errors={errors}
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
            <LinkViewPanel />
          </Box>
        </Card>
        <Card
          className="bg-white p-5 border-none max-h-[600px] overflow-y-scroll"
          variant="outlined"
        >
          <Box className="mb-6">
            <LinkManagementPanel onAddNewLinkClick={handleToggleCreationForm} />
          </Box>
          <Box className="mb-8">{renderListOrNoDataScreen()}</Box>
        </Card>
      </Box>
    </Fragment>
  );
};

export default LinksDashboard;
