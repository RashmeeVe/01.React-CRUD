import React from "react";
import CreateUpdateUserForm from "./CreateUpdateUserForm";
import DeleteUser from "./DeleteUser";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import styles from "./styles.module.css";
import styled from "styled-components";
import MainDiv from "./myStyles.js";

const UserDetailsTable = styled(Table)`
  width: 100% !important;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  addUser = (userDetails) => {
    const { users } = this.state;
    this.setState({
      users: [userDetails, ...users],
    });
  };

  deleteUser = (employee_code) => {
    this.setState((prevState) => ({
      users: prevState.users.filter(
        (user) => user.employee_code !== employee_code
      ),
    }));
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

  // Show User Details Section Starts //

  renderTableHead = () => {
    return (
      <TableHead>
        <TableRow className={styles.UserDetailsTableHead}>
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
              <DeleteUser
                index={index}
                selectedUser={user}
                deleteThisUser={this.deleteUser}
              />
            </TableCell>

            <TableCell>
              <CreateUpdateUserForm
                index={index}
                selectedUser={user}
                updateThisUser={this.updateUser}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  };

  // Show User Details Section Ends //

  render() {
    return (
      <div style={MainDiv}>
        <CreateUpdateUserForm addNewUser={this.addUser} />
        <UserDetailsTable>
          {this.renderTableHead()}
          {this.renderTableBody()}
        </UserDetailsTable>
      </div>
    );
  }
}

export default App;
