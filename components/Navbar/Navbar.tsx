"use client";

import Box from "@mui/material/Box";
import DevIcon from "../Icons/DevIcon";
import LinkIcon from "../Icons/LinkIcon";
import PreviewIcon from "../Icons/PreviewIcon";
import ProfileDetailIcon from "../Icons/ProfileDetailIcon";
import NavButton from "../NavButton/NavButton";

const Navbar = () => {
  return (
    <Box className="bg-white rounded-lg w-full p-4 flex justify-between">
      <Box>
        <DevIcon />
      </Box>
      <Box className="flex gap-4">
        <NavButton
          className="rounded-md group navBarButton"
          startIcon={<LinkIcon className="navBarIcon" />}
          isIconRequired={true}
        >
          Links
        </NavButton>

        <NavButton
          className="rounded-md group navBarButton"
          startIcon={
            <ProfileDetailIcon className="group-hover:[&>path]:fill-hanPurple  " />
          }
          isIconRequired={true}
        >
          Profile Details
        </NavButton>
      </Box>
      <Box>
        <NavButton
          variant="outlined"
          className="capitalize body-one !text-hanPurple border-hanPurple !font-bold hover:bg-Lavender 
         px-4"
          startIcon={<PreviewIcon />}
          isIconRequired={false}
        >
          Preview
        </NavButton>
      </Box>
    </Box>
  );
};

export default Navbar;
