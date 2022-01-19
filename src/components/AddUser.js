import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../api/apiService";

const AddUser = () => {
  const [formValue, setFormValue] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    age: "",
    salary: "",
  });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const saveUser = (e) => {
    e.preventDefault();
    let user = formValue;
    apiService.addUser(user).then((res) => {
      setMessage("User added successfully.");
      navigate("/users");
    });
  };

  const onChange = (e) => {
    setFormValue((formValue) => ({
      ...formValue,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <Typography
        variant="h4"
        style={{ display: "flex", justifyContent: "center" }}
      >
        Add User
      </Typography>
      <form style={{ display: "flex", flexFlow: "row wrap" }}>
        <TextField
          type="text"
          placeholder="username"
          fullWidth
          margin="normal"
          name="username"
          value={formValue.username}
          onChange={(e) => onChange(e)}
        />

        <TextField
          type="password"
          placeholder="password"
          fullWidth
          margin="normal"
          name="password"
          value={formValue.password}
          onChange={(e) => onChange(e)}
        />

        <TextField
          placeholder="First Name"
          fullWidth
          margin="normal"
          name="firstName"
          value={formValue.firstName}
          onChange={(e) => onChange(e)}
        />

        <TextField
          placeholder="Last name"
          fullWidth
          margin="normal"
          name="lastName"
          value={formValue.lastName}
          onChange={(e) => onChange(e)}
        />

        <TextField
          type="number"
          placeholder="age"
          fullWidth
          margin="normal"
          name="age"
          value={formValue.age}
          onChange={(e) => onChange(e)}
        />

        <TextField
          type="number"
          placeholder="salary"
          fullWidth
          margin="normal"
          name="salary"
          value={formValue.salary}
          onChange={(e) => onChange(e)}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={(e) => saveUser(e)}
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default React.memo(AddUser);
