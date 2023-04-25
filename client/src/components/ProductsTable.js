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

function ProductsTable({ products }) {
  return (
    <StyledTableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledHeaderCell>Product ID</StyledHeaderCell>
            <StyledHeaderCell>Product Name</StyledHeaderCell>
            <StyledHeaderCell>Product Description</StyledHeaderCell>
            {/* <StyledHeaderCell>Product Image URL</StyledHeaderCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product, index) => (
            <StyledTableRow key={product._id} odd={index % 2 === 0}>
              <TableCell>{product._id}</TableCell>
              <TableCell>{product.partName}</TableCell>
              <TableCell>{product.partDescription}</TableCell>
              {/* <TableCell>{product.url}</TableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
}

export default ProductsTable;
