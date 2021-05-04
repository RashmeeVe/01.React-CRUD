import React from "react";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import "./styles.css";

class DeleteUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDeleteUserDialogOpen: false,
    };
  }

  handleOpenDeleteUserDialog = () => {
    this.setState({
      isDeleteUserDialogOpen: true,
    });
  };

  handleCloseDeleteUserDialog = () => {
    this.setState({ isDeleteUserDialogOpen: false });
  };

  renderDeleteUserDialog = () => {
    const user = this.props.selectedUser;
    return (
      <Dialog
        open={this.state.isDeleteUserDialogOpen}
        onClose={this.isDeleteUserDialogOpen}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Delete User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "{user.employee_code}" user ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.handleCloseDeleteUserDialog}
            color="primary"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            color="primary"
            type="submit"
            variant="contained"
            onClick={() => this.props.deleteThisUser(user.employee_code)}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  render() {
    const { isDeleteUserDialogOpen } = this.state;
    return (
      <div className="main-div">
        <Tooltip title="Delete">
          <IconButton
            aria-label="delete"
            onClick={this.handleOpenDeleteUserDialog}
          >
            <DeleteIcon color="primary" />
          </IconButton>
        </Tooltip>
        {isDeleteUserDialogOpen && this.renderDeleteUserDialog()}
        <br /> <br />
      </div>
    );
  }
}
export default DeleteUser;
