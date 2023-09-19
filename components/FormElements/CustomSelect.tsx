import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputBase, { InputBaseProps } from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectProps } from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import { ChangeEvent, forwardRef, useState } from "react";
import DownIcon from "../Icons/DownIcon";
import FacebookIcon from "../Icons/FacebookIcon";
import FreeCodeCampIcon from "../Icons/FreeCodeCampIcon";
import FrontendMentorIcon from "../Icons/FrontendMentorIcon";
import GithubIcon from "../Icons/GithubIcon";
import GitlabIcon from "../Icons/GitlabIcon";
import LinkedInIcon from "../Icons/LinkedInIcon";
import YouTubeIcon from "../Icons/YouTubeIcon";

type CustomSelectProps = SelectProps & {
  helperText?: string;
  onChange: (event: string | ChangeEvent<Element>) => void;
};
type Ref = any;

const IconOptionsMapper: Record<string, React.FC<{ className?: string }>> = {
  github: GithubIcon,
  facebook: FacebookIcon,
  linkedin: LinkedInIcon,
  gitlab: GitlabIcon,
  youtube: YouTubeIcon,
  freecodecamp: FreeCodeCampIcon,
  frontendmentor: FrontendMentorIcon,
};
const options = [
  "github",
  "facebook",
  "linkedin",
  "gitlab",
  "youtube",
  "freecodecamp",
  "frontendmentor",
];

const BootstrapInput = styled(InputBase)<
  InputBaseProps & { open: boolean; error: boolean | undefined }
>(({ theme, open, error }) => {
  return {
    "label + &": {
      marginTop: theme.spacing(3),
    },
    "& .MuiInputBase-input": {
      display: "flex",
      alignItems: "center",
      gap: 8,
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      border: `1px solid ${error ? theme.palette.custom.coralRed : "#ced4da"}`,
      padding: "12px 26px 12px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      "&:focus": {
        boxShadow: `0px 0px 32px 0px ${
          error ? "rgba(203, 40, 40, 0.25)" : "rgba(99, 60, 255, 0.25)"
        } `,
        borderWidth: "1px",
        borderColor: error
          ? theme.palette.custom.coralRed
          : theme.palette.custom.hanPurple,
      },
    },
    "& > svg": {
      "& > path": {
        stroke: error
          ? theme.palette.custom.coralRed
          : theme.palette.custom.hanPurple,
      },
      position: "absolute",
      right: "10px",
      top: "20px",
      transition: "transform 0.3s ease-in-out",
      transform: `rotate(${!open ? "360deg" : "180deg"})`,
    },
  };
});

const CustomSelect = forwardRef<Ref, CustomSelectProps>((props, ref) => {
  const [iconOpen, setIconOpen] = useState(false);

  const { label, error, helperText, onChange, ...otherProps } = props;

  const renderOptions = () => {
    return options.map((item) => {
      const IconComponent = IconOptionsMapper?.[item];
      return (
        <MenuItem
          key={item}
          value={item}
          divider
          className="flex items-center justify-start gap-4 customTransition hover:bg-white focus:!bg-white icon-svg bodyOne capitalize pb-2 last:border-b-0 last:pb-0 "
        >
          <IconComponent className="icon-svg" />
          {item}
        </MenuItem>
      );
    });
  };

  return (
    <FormControl variant="filled" fullWidth error>
      <InputLabel
        shrink={false}
        id="custom-select"
        className="bodyTwo !text-darkCharcoal top-[-12px] !left-[-12px]"
      >
        {label}
      </InputLabel>
      <Select
        id="custom-select"
        fullWidth
        label="Platform"
        className="bodyOne capitalize"
        onOpen={() => setIconOpen(false)}
        onClose={() => setIconOpen(true)}
        input={<BootstrapInput open={!iconOpen} error={error} />}
        IconComponent={DownIcon}
        MenuProps={{
          PaperProps: {
            style: { paddingLeft: 12, paddingRight: 12, marginTop: 10 },
          },
        }}
        onChange={onChange}
        ref={ref}
        {...otherProps}
      >
        {renderOptions()}
      </Select>
      {error && (
        <FormHelperText className="absolute top-[50%] right-8 text-coralRed">
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
});

CustomSelect.displayName = "CustomSelect";

export default CustomSelect;
