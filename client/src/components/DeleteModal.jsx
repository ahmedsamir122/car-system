import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { MdDeleteOutline } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";

export default function DeleteModal(props) {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();

  console.log(props.id, props.source);

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/${props.source}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [props.source] });
      setOpen(false);
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAgree = () => {
    deleteMutation.mutate(props.id);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        <MdDeleteOutline />{" "}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <DialogTitle id="alert-dialog-title">{"Warning"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want delete this car
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Disagree
          </Button>
          <Button onClick={handleAgree}>Agree</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
