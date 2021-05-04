import React from "react";

import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";

class UserForm extends React.Component {
  render() {
    // console.log("this.props.error==>", this.props.error);
    const { errorEmployeeAge, errorEmployeeName } = this.props;
    let selectedUser,
      employee_code,
      employee_name,
      employee_age,
      employee_profession;
    if (this.props.selectedUser) {
      const { selectedUser } = this.props;
      employee_code = selectedUser.employee_code;
      employee_name = selectedUser.employee_name;
      employee_age = selectedUser.employee_age;
      employee_profession = selectedUser.employee_profession;
    }

    return (
      <form onSubmit={this.props.handleCreateUpdateUser} autoComplete="off">
        <DialogContent>
          <DialogContentText>Enter User Details</DialogContentText>
          <div className="textFieldContainer">
            <div className="textFieldDivs">
              <TextField
                name="employee_code"
                placeholder="Employee Code"
                variant="outlined"
                className="CreateUpdateUserFormFields"
                defaultValue={employee_code && employee_code}
                onChange={this.props.handleFormEntries}
                label="Employee Code"
              />
            </div>
            <div className="textFieldDivs">
              <TextField
                name="employee_name"
                placeholder="Name"
                variant="outlined"
                className="CreateUpdateUserFormFields"
                multiline
                defaultValue={employee_name && employee_name}
                onChange={this.props.handleFormEntries}
                label="Employee Name"
                label={errorEmployeeName ? errorEmployeeName : "Employee Name"}
                error={errorEmployeeName ? true : false}
              />
            </div>

            <div className="textFieldDivs">
              <TextField
                name="employee_age"
                placeholder="Employee Age"
                variant="outlined"
                type="number"
                className="CreateUpdateUserFormFields"
                defaultValue={employee_age && employee_age}
                onChange={this.props.handleFormEntries}
                label={errorEmployeeAge ? errorEmployeeAge : "Employee Age"}
                error={errorEmployeeAge ? true : false}
              />
            </div>

            <div className="textFieldDivs">
              <FormControl
                variant="outlined"
                className="CreateUpdateUserFormFields"
              >
                <InputLabel htmlFor="outlined-profession-native-simple">
                  Profession
                </InputLabel>
                <Select
                  native
                  defaultValue={employee_profession && employee_profession}
                  placeholder="Profession"
                  inputProps={{
                    name: "employee_profession",
                    id: "outlined-profession-native-simple",
                  }}
                  onChange={this.props.handleFormEntries}
                  label="Profession"
                >
                  <option aria-label="None" value="" />
                  <option value="Graphics Designer">Graphics Designer</option>
                  <option value="Project Manager">Project Manager</option>
                  <option value="Software Developer">Software Developer</option>
                  <option value="Software Tester">Software Tester</option>
                  <option value="Web Designer">Web Designer</option>
                </Select>
              </FormControl>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.props.handleCloseUserFormDialog}
            color="primary"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button color="primary" type="submit" variant="contained">
            {selectedUser ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </form>
    );
  }
}

export default UserForm;
