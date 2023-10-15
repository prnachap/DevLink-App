"use client";

import { NAV_LINKS } from "@/constants/constant";
import { useAppSelector } from "@/redux";
import Box from "@mui/material/Box";
import { isEqual } from "lodash";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import CustomDialog from "../CustomDialog/CustomDialog";
import DevIcon from "../Icons/DevIcon";
import LinkIcon from "../Icons/LinkIcon";
import PreviewIcon from "../Icons/PreviewIcon";
import ProfileDetailIcon from "../Icons/ProfileDetailIcon";
import StyledButton from "../NavButton/StyledButton";

type NavIconMapperType = {
  [key: string]: React.ComponentType<{ className?: string }>;
};

const NavIconMapper: NavIconMapperType = {
  dashboard: ({ className }) => <LinkIcon className={className} />,
  "profile details": ({ className }) => (
    <ProfileDetailIcon className={className} />
  ),
};

const Navbar = () => {
  const pathName = usePathname();
  const exludePaths = ["/register", "/login"];
  const showNavbar = exludePaths.includes(pathName);
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();
  const isFormChanged = useAppSelector((state) => state.links.isFormChanged);

  const handleCloseDialog = () => setOpenDialog(false);

  const handleRouting = (href: string) => {
    if (isFormChanged) {
      setOpenDialog(true);
      return;
    }
    router.push(href);
  };

  const renderNavLinks = () => {
    return NAV_LINKS.map((link) => {
      const isActive = isEqual(pathName, link.href);
      const StartIcon = NavIconMapper[link.name];
      return (
        <StyledButton
          key={link.name}
          className={`rounded-md group navBarButton transition-all ease-in-out duration-500 ${
            isActive ? "navBarButton-active" : "navBarButton"
          }`}
          startIcon={
            <StartIcon
              className={`${isActive ? "navBarIcon-active" : "navBarIcon"}`}
            />
          }
          isIconRequired={true}
          onClick={() => handleRouting(link.href)}
        >
          {link.name}
        </StyledButton>
      );
    });
  };

  if (showNavbar) return null;

  return (
    <Box className="bg-white rounded-lg w-full p-4 flex justify-between">
      <Box>
        <DevIcon />
      </Box>
      <Box className="flex gap-4">{renderNavLinks()}</Box>
      <CustomDialog
        open={openDialog}
        title="Unsaved Changes"
        description="You have unsaved data. Please save your changes before continuing."
        handleClose={handleCloseDialog}
      />
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
