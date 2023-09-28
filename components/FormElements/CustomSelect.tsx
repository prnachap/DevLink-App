import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputBase, { InputBaseProps } from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import Select, { type SelectProps } from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import { ChangeEvent, forwardRef, useState } from "react";
import DownIcon from "../Icons/DownIcon";

type CustomSelectProps = SelectProps & {
  helperText?: string;
  onChange: (event: string | ChangeEvent<Element>) => void;
};
type Ref = any;

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

  const { label, error, helperText, children, onChange, ...otherProps } = props;

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
        {children}
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
