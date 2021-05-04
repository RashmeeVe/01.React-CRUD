import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import "./styles.css";

import UserForm from "./UserForm";

class CreateUpdateUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserFormDialogOpen: false,
      employee_code: "",
      employee_name: "",
      employee_age: "",
      employee_profession: "",
    };
  }

  handleOpenUserFormDialog = () => {
    this.setState({
      isUserFormDialogOpen: true,
    });
  };

  handleCloseUserFormDialog = () => {
    this.setState({ isUserFormDialogOpen: false });
  };

  handleFormEntries = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleCreateUpdateUser = (event) => {
    event.preventDefault();
    let index = null;
    index = this.props.index;

    const form = event.target;
    const userDetails = {
      employee_code: form.elements["employee_code"].value,
      employee_name: form.elements["employee_name"].value,
      employee_age: form.elements["employee_age"].value,
      employee_profession: form.elements["employee_profession"].value,
      index: index,
    };

    if (
      userDetails.employee_code.trim() === "" ||
      userDetails.employee_name.trim() === "" ||
      userDetails.employee_age.trim() === "" ||
      userDetails.employee_profession.trim() === ""
    ) {
      return;
    } else if (userDetails.employee_age > 99) {
      return;
    } else if (!userDetails.employee_name.match(/^[a-zA-Z]+$/)) {
      return;
    } else {
      index >= 0
        ? this.props.updateThisUser(userDetails)
        : this.props.addNewUser(userDetails);
      this.handleCloseUserFormDialog();
    }
  };

  renderCreateUpdateUserForm = () => {
    // const selectedUser = this.props.selectedUser ? this.props.selectedUser : "";

    return (
      <Dialog
        open={this.state.isUserFormDialogOpen}
        onClose={this.handleCloseUserFormDialog}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {this.props.selectedUser ? "Update User" : "Create User"}
        </DialogTitle>
        <UserForm
          selectedUser={this.props.selectedUser}
          handleCreateUpdateUser={this.handleCreateUpdateUser}
          handleCloseUserFormDialog={this.handleCloseUserFormDialog}
          handleFormEntries={this.handleFormEntries}
        />
      </Dialog>
    );
  };

  render() {
    const { isUserFormDialogOpen } = this.state;
    let button = "";
    if (this.props.selectedUser) {
      button = (
        <Tooltip title="Edit">
          <IconButton aria-label="edit" onClick={this.handleOpenUserFormDialog}>
            <EditIcon color="primary" />
          </IconButton>
        </Tooltip>
      );
    } else {
      button = (
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleOpenUserFormDialog}
        >
          Add User
        </Button>
      );
    }
    return (
      <div className="main-div">
        {button}
        {isUserFormDialogOpen && this.renderCreateUpdateUserForm()}
        <br /> <br />
      </div>
    );
  }
}

export default CreateUpdateUserForm;
