import FormControl from "@mui/material/FormControl";
import InputBase, { InputBaseProps } from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectProps } from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import DownIcon from "../Icons/DownIcon";
import FacebookIcon from "../Icons/FacebookIcon";
import FreeCodeCampIcon from "../Icons/FreeCodeCampIcon";
import FrontendMentorIcon from "../Icons/FrontendMentorIcon";
import GithubIcon from "../Icons/GithubIcon";
import GitlabIcon from "../Icons/GitlabIcon";
import LinkedInIcon from "../Icons/LinkedInIcon";
import YouTubeIcon from "../Icons/YouTubeIcon";

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

const BootstrapInput = styled(InputBase)<InputBaseProps & { open: boolean }>(
  ({ theme, open }) => ({
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
      border: "1px solid #ced4da",
      padding: "10px 26px 10px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      "&:hover,&:focus": {
        boxShadow: `0px 0px 32px 0px rgba(99, 60, 255, 0.25)`,
        borderWidth: "1px",
        borderColor: theme.palette.custom.hanPurple,
      },
    },
    "& > svg": {
      position: "absolute",
      right: "10px",
      top: "20px",
      transition: "transform 0.3s ease-in-out",
      transform: `rotate(${!open ? "180deg" : "0deg"})`,
    },
  })
);

type CustomSelectProps = SelectProps;
const CustomSelect = (CustomSelectProps: CustomSelectProps) => {
  const [age, setAge] = useState("");
  const [iconOpen, setIconOpen] = useState(false);
  const handleChange = (event: { target: { value: string } }) => {
    setAge(event.target.value);
  };

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
    <FormControl variant="filled" fullWidth>
      <InputLabel
        shrink={false}
        id="custom-select"
        className="bodyTwo !text-darkCharcoal top-[-12px] !left-[-12px]"
      >
        Platform
      </InputLabel>
      <Select
        id="custom-select"
        fullWidth
        label="Platform"
        className="bodyOne capitalize"
        value={age}
        onOpen={() => setIconOpen(false)}
        onClose={() => setIconOpen(true)}
        onChange={handleChange}
        input={<BootstrapInput open={!iconOpen} />}
        IconComponent={DownIcon}
        MenuProps={{
          PaperProps: {
            style: { paddingLeft: 12, paddingRight: 12, marginTop: 10 },
          },
        }}
      >
        {renderOptions()}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
