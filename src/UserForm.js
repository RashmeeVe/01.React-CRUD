import React from "react";

import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import styled from "styled-components";
import styles from "./styles.module.css";
import TextField from "@material-ui/core/TextField";

const TextFieldDivs = styled.div`
  padding-bottom: 15px;
`;

const TextFieldContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

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

  return (
    <form onSubmit={props.handleCreateUpdateUser} autoComplete="off">
      <DialogContent>
        <DialogContentText>Enter User Details</DialogContentText>
        <TextFieldContainerDiv>
          <TextFieldDivs>
            <TextField
              name="employee_code"
              placeholder="Employee Code"
              variant="outlined"
              className={styles.CreateUpdateUserFormFields}
              defaultValue={employee_code}
              onChange={props.handleFormEntries}
              label="Employee Code"
            />
          </TextFieldDivs>
          <TextFieldDivs>
            <TextField
              name="employee_name"
              placeholder="Name"
              variant="outlined"
              className={styles.CreateUpdateUserFormFields}
              multiline
              defaultValue={employee_name}
              onChange={props.handleFormEntries}
              label={errorEmployeeName ? errorEmployeeName : "Employee Name"}
              error={errorEmployeeName ? true : false}
            />
          </TextFieldDivs>

          <TextFieldDivs>
            <TextField
              name="employee_age"
              placeholder="Employee Age"
              variant="outlined"
              className={styles.CreateUpdateUserFormFields}
              defaultValue={employee_age}
              onChange={props.handleFormEntries}
              label={errorEmployeeAge ? errorEmployeeAge : "Employee Age"}
              error={errorEmployeeAge ? true : false}
            />
          </TextFieldDivs>

          <TextFieldDivs>
            <FormControl
              variant="outlined"
              className={styles.CreateUpdateUserFormFields}
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
          </TextFieldDivs>
        </TextFieldContainerDiv>
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

export default UserForm;
