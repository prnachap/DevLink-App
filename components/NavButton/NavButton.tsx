import IconButton from "@mui/material/IconButton";
import Button, { ButtonProps } from "@mui/material/Button";
import { Fragment } from "react";

type NavButtonProps = ButtonProps & {
  className: string;
  isIconRequired: boolean;
};
const NavButton = ({
  children,
  startIcon,
  className,
  isIconRequired,
  ...restProps
}: NavButtonProps) => {
  return (
    <Fragment>
      <IconButton className={`${className} flex md:hidden`} {...restProps}>
        {startIcon}
      </IconButton>
      <Button
        className={`${className} hidden md:flex`}
        startIcon={isIconRequired && startIcon}
        {...restProps}
      >
        {children}
      </Button>
    </Fragment>
  );
};

export default NavButton;
