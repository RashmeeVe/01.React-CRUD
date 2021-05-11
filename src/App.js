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
import { withStyles } from "@material-ui/styles";
import Tooltip from "@material-ui/core/Tooltip";

const styles = {
  UserDetailsTable: {
    width: "100%",
  },

  MainDiv: { width: "100%", textAlign: "right" },
};

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
    // const user = this.state.users[userDetails.index];
    // user.employee_code = userDetails.employee_code;
    // user.employee_name = userDetails.employee_name;
    // user.employee_age = userDetails.employee_age;
    // user.employee_profession = userDetails.employee_profession;
    // this.setState({
    //   user: user,
    // });
    const usersData = this.state.users;
    usersData[userDetails.index] = userDetails;
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
      <TableHead>
        <TableRow style={{ backgroundColor: "black" }}>
          <TableCell style={{ color: "white" }}>Sr. No.</TableCell>
          <TableCell style={{ color: "white" }}>Employee Code</TableCell>
          <TableCell style={{ color: "white" }}>Name</TableCell>
          <TableCell style={{ color: "white" }}>Age</TableCell>
          <TableCell style={{ color: "white" }}>Profession</TableCell>
          <TableCell style={{ color: "white" }} colSpan="2">
            Action
          </TableCell>
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
    const { classes } = this.props;
    const { isUserFormDialogOpen } = this.state;
    return (
      <div className={classes.MainDiv}>
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
        <Table className={classes.UserDetailsTable}>
          {this.renderTableHead()}
          {this.renderTableBody()}
        </Table>
      </div>
    );
  }
}

export default withStyles(styles)(App);
