import { PlatformType, type FormValues } from "@/global";
import { type SelectChangeEvent, type SelectProps } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { isEmpty } from "lodash";
import { forwardRef, type ChangeEvent, type ReactNode } from "react";
import { type FieldErrors } from "react-hook-form";
import CustomSelect from "../FormElements/CustomSelect";
import Codepen from "../Icons/CodepenIcon";
import CodewarsIcon from "../Icons/CodewarsIcon";
import DevToIcon from "../Icons/DevToIcon";
import FacebookIcon from "../Icons/FacebookIcon";
import FreeCodeCampIcon from "../Icons/FreeCodeCampIcon";
import FrontendMentorIcon from "../Icons/FrontendMentorIcon";
import GithubIcon from "../Icons/GithubIcon";
import GitlabIcon from "../Icons/GitlabIcon";
import HashnodeIcon from "../Icons/HashnodeIcon";
import LinkedInIcon from "../Icons/LinkedInIcon";
import TwitchIcon from "../Icons/TwitchIcon";
import TwitterIcon from "../Icons/TwitterIcon";
import YouTubeIcon from "../Icons/YouTubeIcon";

type SelectPlatformProps = SelectProps & {
  helperText?: string;
  onChange: (event: string | ChangeEvent<Element>) => void;
  errors: FieldErrors<FormValues>;
  index: number;
  platformOptions: PlatformType[];
};

type SelectOnChangeType = ((
  event: SelectChangeEvent<unknown>,
  child: ReactNode
) => void) &
  ((event: string | ChangeEvent<Element>) => void);

type Ref = any;

const IconOptionsMapper: Record<string, React.FC<{ className?: string }>> = {
  github: GithubIcon,
  facebook: FacebookIcon,
  linkedin: LinkedInIcon,
  gitlab: GitlabIcon,
  youtube: YouTubeIcon,
  freecodecamp: FreeCodeCampIcon,
  frontendmentor: FrontendMentorIcon,
  twitch: TwitchIcon,
  twitter: TwitterIcon,
  codepen: Codepen,
  "dev.to": DevToIcon,
  codewars: CodewarsIcon,
  hashnode: HashnodeIcon,
};

const SelectPlatform = forwardRef<Ref, SelectPlatformProps>((props, ref) => {
  const { errors, index, platformOptions, onChange, ...otherProps } = props;
  const { linksList } = errors;
  const renderOptions = () => {
    return platformOptions?.map((item) => {
      const IconComponent =
        IconOptionsMapper?.[item.platform] ?? IconOptionsMapper?.["github"];
      return (
        <MenuItem
          key={item.platform}
          value={item.platform}
          divider
          className="flex items-center justify-start gap-4 customTransition hover:bg-white focus:!bg-white icon-svg bodyOne capitalize pb-2 last:border-b-0 last:pb-0 "
        >
          <IconComponent className="icon-svg" />
          {item.platform}
        </MenuItem>
      );
    });
  };

  return (
    <CustomSelect
      error={!isEmpty(linksList?.[index]?.["platform"])}
      helperText={linksList?.[index]?.["platform"]?.message}
      label="Platform"
      onChange={onChange as SelectOnChangeType}
      {...otherProps}
    >
      {renderOptions()}
    </CustomSelect>
  );
});

SelectPlatform.displayName = "SelectPlatform";

export default SelectPlatform;
