import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const DeleteUser = (props) => {
  const { employeeCodeToDelete } = props.state;
  return (
    <Dialog
      open={props.state.isDeleteUserDialogOpen}
      onClose={props.handleCloseDeleteUserDialog}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Delete User</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete "{employeeCodeToDelete}" user ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={props.handleCloseDeleteUserDialog}
          color="primary"
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          color="primary"
          type="submit"
          variant="contained"
          onClick={() => props.deleteThisUser(employeeCodeToDelete)}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteUser;
