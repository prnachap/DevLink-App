"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import emptyImage from "../../public/images/illustration-empty.svg";

const NoContentScreen = () => {
  return (
    <Card
      variant="outlined"
      className="bg-lotion p-5 border-none flex flex-col justify-center items-center gap-4"
    >
      <Box className="h-32 w-52">
        <Image
          src={emptyImage}
          width={250}
          height={100}
          alt="image with mobile icon"
        />
      </Box>
      <Box>
        <Typography
          variant="h2"
          className="text-2xl font-bold text-darkCharcoal text-center"
          gutterBottom
        >
          Let&apos;s get you started
        </Typography>
        <Typography
          variant="body2"
          className="bodyTwo !text-nickel max-w-sm text-center"
        >
          Use the “Add new link” button to get started. Once you have more than
          one link, you can reorder and edit them. We&apos;re here to help you
          share your profiles with everyone!
        </Typography>
      </Box>
    </Card>
  );
};

export default NoContentScreen;
