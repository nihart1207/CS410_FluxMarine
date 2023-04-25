import React from "react";
import styled from "@emotion/styled";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableContainer = styled(TableContainer)`
  margin-top: 1rem;
`;

const StyledHeaderCell = styled(TableCell)`
  font-weight: bold;
`;


const StyledTableRow = styled(TableRow)`
  background-color: ${(props) => (props.odd ? "#f5f5f5" : "inherit")};
`;

function SuppliersTable({ suppliers }) {
  return (
    <StyledTableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledHeaderCell>Supplier ID</StyledHeaderCell>
            <StyledHeaderCell>Supplier Name</StyledHeaderCell>
            {/* <StyledHeaderCell>Supplier Address</StyledHeaderCell> */}
            <StyledHeaderCell>Supplier Contact</StyledHeaderCell>
            <StyledHeaderCell>Email</StyledHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {suppliers.map((supplier, index) => (
            <StyledTableRow key={supplier.id} odd={index % 2 === 0}>
              <TableCell>{supplier.id}</TableCell>
              <TableCell>{supplier.name}</TableCell>
              {/* <TableCell>{supplier.address}</TableCell> */}
              <TableCell>{supplier.contact}</TableCell>
              <TableCell>{supplier.email}</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
}

export default SuppliersTable;
