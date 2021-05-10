import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import UserForm from "./UserForm";

class CreateUpdateUserForm extends React.Component {
  constructor(props) {
    super(props);
    const {
      employee_code,
      employee_name,
      employee_age,
      employee_profession,
      indexToUpdateUser,
    } = this.props.state;

    this.state = {
      employee_code: employee_code,
      employee_name: employee_name,
      employee_age: employee_age,
      employee_profession: employee_profession,
      errorEmployeeAge: "",
      errorEmployeeName: "",
      indexToUpdateUser: indexToUpdateUser,
    };
  }

  handleFormEntries = (event) => {
    const { name, value } = event.target;
    let errorEmployeeAge, errorEmployeeName;

    if (name === "employee_name" && !value.match(/^[a-zA-Z ]+$/)) {
      errorEmployeeName = "Enter Characters Only";
    }

    if (name === "employee_age" && !value.match(/^[0-9]+$/)) {
      errorEmployeeAge = "Enter Numbers Only";
    }

    if (name === "employee_age" && value > 99) {
      errorEmployeeAge = "Age should be less than 99";
    }

    this.setState({ [name]: value, errorEmployeeAge, errorEmployeeName });
    return true;
  };

  handleCreateUpdateUser = (event) => {
    event.preventDefault();
    let index = null;
    index = this.props.state.indexToUpdateUser;
    const {
      employee_code,
      employee_name,
      employee_age,
      employee_profession,
    } = this.state;
    if (
      employee_code.trim() === "" ||
      employee_name.trim() === "" ||
      employee_age.trim() === "" ||
      employee_profession.trim() === "" ||
      employee_age > 99 ||
      !employee_age.match(/^[0-9]+$/) ||
      !employee_name.match(/^[a-zA-Z ]+$/)
    ) {
      return;
    } else {
      const userDetails = {
        employee_code: employee_code,
        employee_name: employee_name,
        employee_age: employee_age,
        employee_profession: employee_profession,
        index: index,
      };

      index >= 0
        ? this.props.updateThisUser(userDetails)
        : this.props.addNewUser(userDetails);
      this.props.handleCloseUserFormDialog();
    }
  };

  render() {
    const { fullScreen } = this.props;
    const { indexToUpdateUser } = this.props.state;
    return (
      <Dialog
        fullScreen={fullScreen}
        open={this.props.state.isUserFormDialogOpen}
        onClose={this.props.handleCloseUserFormDialog}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {indexToUpdateUser >= 0 ? "Update User" : "Create User"}
        </DialogTitle>
        <UserForm
          state={this.state}
          userToUpdate={this.props.state}
          handleCreateUpdateUser={this.handleCreateUpdateUser}
          handleCloseUserFormDialog={this.props.handleCloseUserFormDialog}
          handleFormEntries={this.handleFormEntries}
        />
      </Dialog>
    );
  }
}

CreateUpdateUserForm.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(CreateUpdateUserForm);
