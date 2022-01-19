import { Container } from "@mui/material";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AddUser from "../components/AddUser";
import EditUser from "../components/EditUser";
import ListUser from "../components/ListUser";
import NavBar from "../components/Navbar";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <div>
          <NavBar />
          <Container>
            <div style={{ marginTop: "20px" }}>
              <Routes>
                <Route path="/" element={<ListUser />} />
                <Route path="/users" element={<ListUser />} />
                <Route path="/add-user" element={<AddUser />} />
                <Route path="/edit-user" element={<EditUser />} />
              </Routes>
            </div>
          </Container>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
