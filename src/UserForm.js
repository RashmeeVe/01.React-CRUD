import React from "react";

import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";

const styles = {
  TextFieldDivs: {
    paddingBottom: "15px",
  },

  TextFieldContainerDiv: {
    display: "flex",
    flexDirection: "column",
  },

  CreateUpdateUserFormFields: {
    width: "100%",
  },
};

const UserForm = (props) => {
  const {
    errorEmployeeAge,
    errorEmployeeName,
    employee_code,
    employee_name,
    employee_age,
    employee_profession,
    indexToUpdateUser,
  } = props.state;

  const { classes } = props;

  return (
    <form onSubmit={props.handleCreateUpdateUser} autoComplete="off">
      <DialogContent>
        <DialogContentText>Enter User Details</DialogContentText>
        <div className={classes.TextFieldContainerDiv}>
          <div className={classes.TextFieldDivs}>
            <TextField
              name="employee_code"
              placeholder="Employee Code"
              variant="outlined"
              className={classes.CreateUpdateUserFormFields}
              defaultValue={employee_code}
              onChange={props.handleFormEntries}
              label="Employee Code"
            />
          </div>
          <div className={classes.TextFieldDivs}>
            <TextField
              name="employee_name"
              placeholder="Name"
              variant="outlined"
              className={classes.CreateUpdateUserFormFields}
              multiline
              defaultValue={employee_name}
              onChange={props.handleFormEntries}
              label={errorEmployeeName ? errorEmployeeName : "Employee Name"}
              error={errorEmployeeName ? true : false}
            />
          </div>

          <div className={classes.TextFieldDivs}>
            <TextField
              name="employee_age"
              placeholder="Employee Age"
              variant="outlined"
              type="number"
              className={classes.CreateUpdateUserFormFields}
              defaultValue={employee_age}
              onChange={props.handleFormEntries}
              label={errorEmployeeAge ? errorEmployeeAge : "Employee Age"}
              error={errorEmployeeAge ? true : false}
            />
          </div>

          <div className={classes.TextFieldDivs}>
            <FormControl
              variant="outlined"
              className={classes.CreateUpdateUserFormFields}
            >
              <InputLabel htmlFor="outlined-profession-native-simple">
                Profession
              </InputLabel>
              <Select
                native
                defaultValue={employee_profession}
                placeholder="Profession"
                inputProps={{
                  name: "employee_profession",
                  id: "outlined-profession-native-simple",
                }}
                onChange={props.handleFormEntries}
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
          onClick={props.handleCloseUserFormDialog}
          color="primary"
          variant="outlined"
        >
          Cancel
        </Button>
        <Button color="primary" type="submit" variant="contained">
          {indexToUpdateUser >= 0 ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </form>
  );
};

export default withStyles(styles)(UserForm);
