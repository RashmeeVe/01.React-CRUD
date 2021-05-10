import React from "react";
import Button from "@material-ui/core/Button";
import CreateUpdateUserForm from "./CreateUpdateUserForm";
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteUser from "./DeleteUser";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import styles from "./styles.module.css";
import styled from "styled-components";
import Tooltip from "@material-ui/core/Tooltip";
import MainDiv from "./myStyles.js";

const UserDetailsTable = styled(Table)`
  width: 100% !important;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isUserFormDialogOpen: false,
      isDeleteUserDialogOpen: false,
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

  addUser = (userDetails) => {
    const { users } = this.state;
    this.setState({
      users: [userDetails, ...users],
    });
  };

  updateUser = (userDetails) => {
    const user = this.state.users[userDetails.index];
    user.employee_code = userDetails.employee_code;
    user.employee_name = userDetails.employee_name;
    user.employee_age = userDetails.employee_age;
    user.employee_profession = userDetails.employee_profession;
    this.setState({
      user: user,
    });
  };

  setStateValues = (e, user, index) => {
    if (user) {
      const {
        employee_code,
        employee_name,
        employee_age,
        employee_profession,
      } = user;
      const indexToUpdateUser = index;
      this.setState({
        employee_code,
        employee_name,
        employee_age,
        employee_profession,
        indexToUpdateUser,
      });
    } else {
      this.setState({
        employee_code: "",
        employee_name: "",
        employee_age: "",
        employee_profession: "",
        indexToUpdateUser: -1,
      });
    }
    this.handleOpenUserFormDialog();
  };

  handleOpenDeleteUserDialog = (e, employee_code, index) => {
    this.setState({
      isDeleteUserDialogOpen: true,
      indexToDeleteUser: index,
      employeeCodeToDelete: employee_code,
    });
  };

  handleCloseDeleteUserDialog = () => {
    this.setState({ isDeleteUserDialogOpen: false });
  };

  deleteUser = (employee_code) => {
    this.setState((prevState) => ({
      users: prevState.users.filter(
        (user) => user.employee_code !== employee_code
      ),
    }));
    this.handleCloseDeleteUserDialog();
  };

  // Show User Details Section Starts //

  renderTableHead = () => {
    return (
      <TableHead className={styles.UserDetailsTableHead}>
        <TableRow>
          <TableCell>Sr. No.</TableCell>
          <TableCell>Employee Code</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Age</TableCell>
          <TableCell>Profession</TableCell>
          <TableCell colSpan="2">Action</TableCell>
        </TableRow>
      </TableHead>
    );
  };

  renderTableBody = () => {
    const { users } = this.state;

    return (
      <TableBody>
        {users.map((user, index) => (
          <TableRow key={user.employee_code}>
            {/* <TableRow key={index}> */}
            <TableCell component="th" scope="row">
              {" "}
              {index + 1}{" "}
            </TableCell>
            <TableCell>{user.employee_code}</TableCell>
            <TableCell>{user.employee_name}</TableCell>
            <TableCell>{user.employee_age}</TableCell>
            <TableCell>{user.employee_profession}</TableCell>
            <TableCell>
              <Tooltip title="Delete">
                <IconButton
                  aria-label="delete"
                  onClick={(e) =>
                    this.handleOpenDeleteUserDialog(
                      e,
                      user.employee_code,
                      index
                    )
                  }
                >
                  <DeleteIcon color="primary" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Edit">
                <IconButton
                  aria-label="edit"
                  onClick={(e) => this.setStateValues(e, user, index)}
                >
                  <EditIcon color="primary" />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  };

  // Show User Details Section Ends //

  render() {
    const { isUserFormDialogOpen } = this.state;
    return (
      <div style={MainDiv}>
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => this.setStateValues(e)}
        >
          Add User
        </Button>

        {isUserFormDialogOpen && (
          <CreateUpdateUserForm
            addNewUser={this.addUser}
            state={this.state}
            handleCloseUserFormDialog={this.handleCloseUserFormDialog}
            updateThisUser={this.updateUser}
          />
        )}
        <DeleteUser
          state={this.state}
          deleteThisUser={this.deleteUser}
          handleCloseDeleteUserDialog={this.handleCloseDeleteUserDialog}
        />
        <UserDetailsTable>
          {this.renderTableHead()}
          {this.renderTableBody()}
        </UserDetailsTable>
      </div>
    );
  }
}

export default App;
