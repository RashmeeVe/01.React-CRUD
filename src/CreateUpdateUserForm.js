import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import PropTypes from "prop-types";
import styled from "styled-components";
import Tooltip from "@material-ui/core/Tooltip";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import UserForm from "./UserForm";

const Div = styled.div`
  width: 100%;
  text-align: right;
`;

class CreateUpdateUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserFormDialogOpen: false,
      employee_code: "",
      employee_name: "",
      employee_age: "",
      employee_profession: "",
      errorEmployeeAge: "",
      errorEmployeeName: "",
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

  setStateValues = () => {
    if (this.props.selectedUser) {
      const {
        employee_code,
        employee_name,
        employee_age,
        employee_profession,
      } = this.props.selectedUser;
      this.setState({
        employee_code,
        employee_name,
        employee_age,
        employee_profession,
      });
    } else {
      this.setState({
        employee_code: "",
        employee_name: "",
        employee_age: "",
        employee_profession: "",
      });
    }
    this.handleOpenUserFormDialog();
  };

  handleCreateUpdateUser = (event) => {
    event.preventDefault();
    let index = null;
    index = this.props.index;
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
      this.handleCloseUserFormDialog();
    }
  };

  renderCreateUpdateUserForm = () => {
    const { fullScreen } = this.props;
    return (
      <Dialog
        fullScreen={fullScreen}
        open={this.state.isUserFormDialogOpen}
        onClose={this.handleCloseUserFormDialog}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {this.props.selectedUser ? "Update User" : "Create User"}
        </DialogTitle>
        <UserForm
          state={this.state}
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
      //Show Edit Icon
      button = (
        <Tooltip title="Edit">
          <IconButton aria-label="edit" onClick={this.setStateValues}>
            <EditIcon color="primary" />
          </IconButton>
        </Tooltip>
      );
    } else {
      //Show Add User Button
      button = (
        <Button
          variant="contained"
          color="primary"
          onClick={this.setStateValues}
        >
          Add User
        </Button>
      );
    }
    return (
      <Div>
        {button}
        {isUserFormDialogOpen && this.renderCreateUpdateUserForm()}
        <br /> <br />
      </Div>
    );
  }
}

CreateUpdateUserForm.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(CreateUpdateUserForm);
