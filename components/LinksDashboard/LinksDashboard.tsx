"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import LinkManagementPanel from "../LinkProfileBuilder/LinkManagementPanel";
import NoContentScreen from "../LinkProfileBuilder/NoContentScreen";
import PlatformSelectorWithLink from "../LinkProfileBuilder/PlatformSelectorWithLink";

const LinksDashboard = () => {
  return (
    <>
      <Box className="pb-6 px-6 mt-4 grid grid-cols-1 lg:grid-cols-[2fr,3fr] lg:gap-6 lg:p-0">
        <Card
          className="hidden lg:block bg-white p-5 border-none"
          variant="outlined"
        >
          TBD
        </Card>
        <Card className="bg-white p-5 border-none" variant="outlined">
          <Box className="mb-6">
            <LinkManagementPanel />
          </Box>
          <Box className="mb-8">
            <PlatformSelectorWithLink />
            <NoContentScreen />
          </Box>

          <Divider />
          <Box className="flex justify-end mt-4">
            <Button
              variant="contained"
              className="capitalize body-one bg-hanPurple !text-white
         px-4 hover:bg-hanPurple transition-all ease-in-out duration-500"
            >
              Save
            </Button>
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default LinksDashboard;
