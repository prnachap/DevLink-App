"use client";

import Box from "@mui/material/Box";
import DevIcon from "../Icons/DevIcon";
import LinkIcon from "../Icons/LinkIcon";
import PreviewIcon from "../Icons/PreviewIcon";
import ProfileDetailIcon from "../Icons/ProfileDetailIcon";
import StyledButton from "../NavButton/StyledButton";

const Navbar = () => {
  return (
    <Box className="bg-white rounded-lg w-full p-4 flex justify-between">
      <Box>
        <DevIcon />
      </Box>
      <Box className="flex gap-4">
        <StyledButton
          className="rounded-md group navBarButton transition-all ease-in-out duration-500"
          startIcon={<LinkIcon className="navBarIcon" />}
          isIconRequired={true}
        >
          Links
        </StyledButton>

        <StyledButton
          className="rounded-md group navBarButton transition-all ease-in-out duration-500"
          startIcon={
            <ProfileDetailIcon className="group-hover:[&>path]:fill-hanPurple  " />
          }
          isIconRequired={true}
        >
          Profile Details
        </StyledButton>
      </Box>
      <Box>
        <StyledButton
          variant="outlined"
          className="capitalize body-one !text-hanPurple border-hanPurple !font-bold hover:bg-Lavender 
         px-4 transition-all ease-in-out duration-500"
          startIcon={<PreviewIcon />}
          isIconRequired={false}
        >
          Preview
        </StyledButton>
      </Box>
    </Box>
  );
};

export default Navbar;
