"use client";

import { NAV_LINKS } from "@/constants/constant";
import Box from "@mui/material/Box";
import { isEqual } from "lodash";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

  const renderNavLinks = () => {
    return NAV_LINKS.map((link) => {
      const isActive = isEqual(pathName, link.href);
      const StartIcon = NavIconMapper[link.name];
      return (
        <Link href={link.href} key={link.name}>
          <StyledButton
            className={`rounded-md group navBarButton transition-all ease-in-out duration-500 ${
              isActive ? "navBarButton-active" : "navBarButton"
            }`}
            startIcon={
              <StartIcon
                className={`${isActive ? "navBarIcon-active" : "navBarIcon"}`}
              />
            }
            isIconRequired={true}
          >
            {link.name}
          </StyledButton>
        </Link>
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
