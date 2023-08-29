"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const LinkManagementPanel = () => {
  return (
    <Box>
      <Typography
        variant="h1"
        className="text-2xl lg:text-3xl font-bold text-darkCharcoal"
        gutterBottom
      >
        Customize your links
      </Typography>
      <Typography variant="body2" className="bodyTwo !text-nickel">
        Add/edit/remove links below and then share all your profiles with the
        world!
      </Typography>
      <Button
        variant="outlined"
        className="capitalize outlineButton px-4 customTransition w-full mt-6"
      >
        Add new link
      </Button>
    </Box>
  );
};

export default LinkManagementPanel;
