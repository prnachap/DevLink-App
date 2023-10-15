import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type CustomDialogProps = {
  title: string;
  open: boolean;
  description: string;
  handleClose: () => void;
};

export default function CustomDialog({
  open,
  title,
  description,
  handleClose,
}: CustomDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="unsaved-data"
      aria-describedby="unsaved-data"
    >
      <DialogTitle id="alert-dialog-title" className="headingTwo">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          className="bodyOne !text-nickel"
        >
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          className="capitalize body-one !text-hanPurple border-hanPurple !font-bold hover:bg-Lavender 
          px-4 transition-all ease-in-out duration-500"
          type="submit"
          onClick={handleClose}
        >
          okay
        </Button>
      </DialogActions>
    </Dialog>
  );
}
