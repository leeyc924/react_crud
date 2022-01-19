import React, { useCallback, useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";

import apiService from "../api/apiService";
import { useNavigate } from "react-router-dom";

const ListUser = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const reloadUserList = useCallback(() => {
    apiService.fetchUsers().then((res) => {
      setUsers(res.data.result);
    });
  }, []);

  useEffect(() => {
    reloadUserList();
  }, [reloadUserList]);

  const deleteUser = (userId) => {
    apiService.deleteUser(userId).then((res) => {
      setMessage("User deleted successfully.");
      setUsers(users => users.filter((user) => user.id !== userId));
    });
  };

  const editUser = (id) => {
    window.localStorage.setItem("userId", id);
    navigate("/edit-user");
  };

  const addUser = () => {
    window.localStorage.removeItem("userId");
    navigate("/add-user");
  };

  return (
    <div>
      <Typography
        variant="h4"
        style={{ display: "flex", justifyContent: "center" }}
      >
        User Details
      </Typography>
      <Button variant="contained" color="primary" onClick={() => addUser()}>
        Add User
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>FirstName</TableCell>
            <TableCell align="right">LastName</TableCell>
            <TableCell align="right">UserName</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">Salary</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.firstName}</TableCell>
              <TableCell align="right">{row.lastName}</TableCell>
              <TableCell align="right">{row.username}</TableCell>
              <TableCell align="right">{row.age}</TableCell>
              <TableCell align="right">{row.salary}</TableCell>
              <TableCell align="right" onClick={() => editUser(row.id)}>
                <CreateIcon />
              </TableCell>
              <TableCell align="right" onClick={() => deleteUser(row.id)}>
                <DeleteIcon />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default React.memo(ListUser);
