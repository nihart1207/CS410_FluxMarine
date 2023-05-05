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
import EditSupplierData from "../Forms/EditSupplierData";
import DeleteButtonWithDialog from "../Forms/DeleteButtonWithDialog";

const StyledTableContainer = styled(TableContainer)`
  margin-top: 1rem;
`;

const StyledHeaderCell = styled(TableCell)`
  font-weight: bold;
`;


const StyledTableRow = styled(TableRow)`
  background-color: ${(props) => (props.odd ? "#f5f5f5" : "inherit")};
`;



function SuppliersTable({all_suppliers, searchName, setAllSuppliers}) {
  
  const suppliers = getSuppliers();

  function getSuppliers() {
    if (searchName) {
      const filteredUsers = Object.values(all_suppliers).filter((supplier) =>
        supplier.name.toLowerCase().includes(searchName.toLowerCase())
      );
      return filteredUsers;
    } else {
      return all_suppliers;
    }
  }

  function handleEditRequest(_id ,supplierName, email, contact, callback) {
    axios.put(`/api/supplier/${_id}`, 
    {supplierName: supplierName, email: email, contact:contact},
    {headers:{'Content-Type': 'application/json'}, withCredentials: true }
    ).then((response) => {
        if (response.status === 200) {
          const updatedSupplier = response.data;
          const updatedSuppliers = all_suppliers.map(supplier =>
              supplier._id === updatedSupplier._id ? updatedSupplier : supplier
              );

          // Update the state with the modified all_users array
          setAllSuppliers(updatedSuppliers);
          callback(true, 'Success');
        } else {
          callback(false, 'Error: ' + response.statusText);
        }
      })
      .catch((error) => {
        callback(false, 'Error: ' + error.message);
      });
  }

  function handleDeleteRequest(id, callback) {
    axios.delete(`/api/supplier/${id}`, { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          const updatedAllSuppliers = all_suppliers.filter(supplier => supplier._id !== id);
          // Update the state with the new arrays
          setAllSuppliers(updatedAllSuppliers);
          callback(true, 'Success');
        } else {
          callback(false, 'Error: ' + response.statusText);
        }
      })
      .catch((error) => {
        callback(false, 'Error: ' + error.message);
      });
  }

  return (
    <StyledTableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledHeaderCell>Supplier ID</StyledHeaderCell>
            <StyledHeaderCell>Supplier Name</StyledHeaderCell>
            <StyledHeaderCell>Supplier Contact</StyledHeaderCell>
            <StyledHeaderCell>Email</StyledHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {suppliers.map((supplier, index) => (
            <StyledTableRow key={supplier.id} odd={index % 2 === 0}>
              <TableCell>{supplier._id}</TableCell>
              <TableCell>{supplier.supplierName}</TableCell>
              <TableCell>{supplier.contact}</TableCell>
              <TableCell>{supplier.email}</TableCell>
              
              {/* edit button */}
              <TableCell>
                <EditSupplierData
                supplier={supplier}
                handleRequest={handleEditRequest}
                />
              </TableCell>
              {/* delete button */}
              <TableCell> 
                <DeleteButtonWithDialog
                    userId={supplier._id}
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

export default SuppliersTable;
