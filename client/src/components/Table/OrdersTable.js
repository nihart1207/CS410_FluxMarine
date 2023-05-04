// import React from "react";
import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
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
      case "RECEIVED":
        return "#4CAF50"; // Green
      case "INVENTORY":
        return "#FFC107"; // Amber
      case "ASSEMBLY":
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

const date = (isoDate) => {
  const date = new Date(isoDate);
  const day = date.getDate();
  const month = date.getMonth() + 1; // add 1 to adjust for zero-based index
  const year = date.getFullYear();

  return `${day}/${month}/${year}`; // output: 26/3/2023
}

function OrdersTable({ orders }) {

  const [selectedOrders, setSelectedOrders] = useState([]);

  const handleSelectOrder = (orderId) => {
    const isSelected = selectedOrders.includes(orderId);
    if (isSelected) {
      setSelectedOrders(selectedOrders.filter((id) => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };

  const isOrderSelected = (orderId) => selectedOrders.includes(orderId);

  const handleCheckboxChange = (orderId) => {
    setSelectedOrders((selectedOrders) => {
      if (selectedOrders.has(orderId)) {
        selectedOrders.delete(orderId);
      } else {
        selectedOrders.add(orderId);
      }
      return new Set(selectedOrders);
    });
  };
  

  return (
    <StyledTableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledHeaderCell>Select</StyledHeaderCell>
            <StyledHeaderCell>Order ID</StyledHeaderCell>
            <StyledHeaderCell>Date</StyledHeaderCell>
            <StyledHeaderCell>Supplier</StyledHeaderCell>
            <StyledHeaderCell>Part Name</StyledHeaderCell>
            <StyledHeaderCell>Status</StyledHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {orders.map((order, index) => (
            <StyledTableRow key={order.id} odd={index % 2 === 0}>
              <TableCell>
                <Checkbox
                  checked={selectedOrders.includes(order._id)}
                  onChange={() => handleCheckboxChange(order._id)}
                />
              </TableCell>
              <TableCell>{order._id}</TableCell>
              <TableCell>{date(order.createdAt)}</TableCell>
              <TableCell>{order.supplier.supplierName}</TableCell>
              <TableCell>{order.part.partName}</TableCell>
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
