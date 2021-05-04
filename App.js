import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import "./styles.css";
import CreateUpdateUserForm from "./CreateUpdateUserForm";
import DeleteUser from "./DeleteUser";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  addUser = (data) => {
    const { users } = this.state;
    this.setState({
      users: [data, ...users],
    });
  };

  deleteUser = (employee_code) => {
    this.setState((prevState) => ({
      users: prevState.users.filter(
        (user) => user.employee_code !== employee_code
      ),
    }));
  };

  updateUser = (data) => {
    const user = this.state.users[data.index];
    user.employee_code = data.employee_code;
    user.employee_name = data.employee_name;
    user.employee_age = data.employee_age;
    user.employee_profession = data.employee_profession;
    this.setState({
      user: user,
    });
  };

  // Show User Details Section Starts //

  renderTableHead = () => {
    return (
      <TableHead className="UserDetailsTableHead">
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
      <div className="main-div">
        <CreateUpdateUserForm addNewUser={this.addUser} />

        <Table className="UserDetailsTable">
          {this.renderTableHead()}
          {this.renderTableBody()}
        </Table>
      </div>
    );
  }
}

export default App;
