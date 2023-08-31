import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CustomSelect from "../FormElements/CustomSelect";
import DragAndDropIcon from "../Icons/DragAndDropIcon";

const PlatformSelectorWithLink = () => {
  return (
    <Card
      variant="outlined"
      className="bg-lotion p-5 border-none flex flex-col gap-3"
    >
      <Box className="flex justify-between items-center">
        <Box className="flex gap-2 items-center">
          <DragAndDropIcon />
          <Typography
            variant="body1"
            className="bodyOne !font-bold !text-nickel"
          >
            Link #1
          </Typography>
        </Box>
        <Box>
          <Button className="bodyTwo !font-normal !text-nickel">Remove</Button>
        </Box>
      </Box>
      <CustomSelect />
      <CustomSelect />
    </Card>
  );
};

export default PlatformSelectorWithLink;
