import { Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../api/apiService";

const EditUser = () => {
  const [formValue, setFormValue] = useState({
    id: "",
    firstName: "",
    lastName: "",
    age: "",
    salary: "",
  });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    apiService
      .fetchUserById(window.localStorage.getItem("userId"))
      .then((res) => {
        let user = res.data.result;
        setFormValue((formValue) => ({
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          age: user.age,
          salary: user.salary,
        }));
      });
  }, []);

  const onChange = (e) =>
    setFormValue((formValue) => ({
      ...formValue,
      [e.target.name]: e.target.value,
    }));

  const saveUser = (e) => {
    e.preventDefault();
    let user = formValue;
    apiService.editUser(user).then((res) => {
      setMessage("User added successfully.");
      navigate("/users");
    });
  };

  return (
    <div>
      <Typography
        variant="h4"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        Edit User
      </Typography>
      <form>
        <TextField
          type="text"
          placeholder="username"
          fullWidth
          margin="normal"
          name="username"
          readonly="true"
          value={formValue.username}
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

        <Button variant="contained" color="primary" onClick={() => saveUser()}>
          Save
        </Button>
      </form>
    </div>
  );
};

export default React.memo(EditUser);
