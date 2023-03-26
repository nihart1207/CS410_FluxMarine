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

const StyledStatusCell = styled(TableCell)`
  font-weight: bold;
  border: none;
  background-color: ${(props) => {
    switch (props.status) {
      case "Shipped":
        return "#4CAF50"; // Green
      case "Processing":
        return "#FFC107"; // Amber
      case "Pending":
        return "#F44336"; // Red
      default:
        return "inherit";
    }
  }};
  border-radius: 999px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
  color: #fff;
  padding: 0 1rem;
  margin-top: 0.5rem;
  margin-right: 0.6rem;
`;

const StyledTableRow = styled(TableRow)`
  background-color: ${(props) => (props.odd ? "#f5f5f5" : "inherit")};
`;

function OrdersTable({ orders }) {
  return (
    <StyledTableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledHeaderCell>Order ID</StyledHeaderCell>
            <StyledHeaderCell>Date</StyledHeaderCell>
            <StyledHeaderCell>Supplier</StyledHeaderCell>
            <StyledHeaderCell>Part Number</StyledHeaderCell>
            <StyledHeaderCell>Description</StyledHeaderCell>
            <StyledHeaderCell>Status</StyledHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order, index) => (
            <StyledTableRow key={order.id} odd={index % 2 === 0}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>{order.supplier}</TableCell>
              <TableCell>{order.PartNumber}</TableCell>
              <TableCell>{order.description}</TableCell>
              <StyledStatusCell status={order.status}>
                {order.status}
              </StyledStatusCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
}

export default OrdersTable;
