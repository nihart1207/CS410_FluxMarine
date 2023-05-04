import React from "react";
import axios from "axios";
import styled from "@emotion/styled";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteButtonWithDialog from "../Forms/DeleteButtonWithDialog"
import EditButtonWithDialog from "../Forms/EditButtonWithDialog";

const StyledTableContainer = styled(TableContainer)`
  margin-top: 1rem;
`;

const StyledHeaderCell = styled(TableCell)`
  font-weight: bold;
`;


const StyledTableRow = styled(TableRow)`
  background-color: ${(props) => (props.odd ? "#f5f5f5" : "inherit")};
`;

function handleEditRequest(userId, callback) {
  axios.put(`/api/user/${userId}`, {})
    .then((response) => {
      if (response.ok) {
        callback(true, 'Success');
      } else {
        callback(false, 'Error: ' + response.statusText);
      }
    })
    .catch((error) => {
      callback(false, 'Error: ' + error.message);
    });
}

function handleDeleteRequest(userId, callback) {
  axios.delete(`/api/user/${userId}`)
    .then((response) => {
      if (response.ok) {
        callback(true, 'Success');
      } else {
        callback(false, 'Error: ' + response.statusText);
      }
    })
    .catch((error) => {
      callback(false, 'Error: ' + error.message);
    });
}

function UsersTable({ users }) {
  return (
    <StyledTableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledHeaderCell>User ID</StyledHeaderCell>
            <StyledHeaderCell>User Name</StyledHeaderCell>
            <StyledHeaderCell>Email</StyledHeaderCell>
            <StyledHeaderCell>User Role</StyledHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <StyledTableRow key={user._id} odd={index % 2 === 0}>
              <TableCell>{user._id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              
              <TableCell>
                <EditButtonWithDialog
                    userId={user._id}
                    handleEditRequest={handleEditRequest}
                  />
              </TableCell>

              <TableCell> 
                <DeleteButtonWithDialog 
                    userId={user._id}
                    handleRequest={handleDeleteRequest}
                />
              </TableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
}

export default UsersTable;
