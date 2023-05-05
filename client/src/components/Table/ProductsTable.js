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
import EditPartData from "../Forms/EditPartData";
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

function ProductsTable({all_products, searchName, setAllProducts}) {
  
  const products = getProducts();

  function getProducts() {
    if (searchName) {
      const filteredProducts = Object.values(all_products).filter((product) =>
        product.name.toLowerCase().includes(searchName.toLowerCase())
      );
      return filteredProducts;
    } else {
      return all_products;
    }
  }

  function handleEditRequest(_id ,partName, partDescription, callback) {
    axios.put(`/api/part/${_id}`, 
    {partName: partName, partDescription: partDescription},
    {headers:{'Content-Type': 'application/json'}, withCredentials: true }
    ).then((response) => {
        if (response.status === 200) {
          const updatedProduct = response.data;
          const updatedProducts = all_products.map(product =>
              product._id === updatedProduct._id ? updatedProduct : product
              );

          // Update the state with the modified all_users array
          setAllProducts(updatedProducts);
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
    axios.delete(`/api/part/${id}`, { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          const updatedAllProducts = all_products.filter(product => product._id !== id);
          // Update the state with the new arrays
          setAllProducts(updatedAllProducts);
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
            <StyledHeaderCell>Part ID</StyledHeaderCell>
            <StyledHeaderCell>Part Name</StyledHeaderCell>
            <StyledHeaderCell>Part Description</StyledHeaderCell>
            {/* <StyledHeaderCell>Product Image URL</StyledHeaderCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product, index) => (
            <StyledTableRow key={product.id} odd={index % 2 === 0}>
              <TableCell>{product._id}</TableCell>
              <TableCell>{product.partName}</TableCell>
              <TableCell>{product.partDescription}</TableCell>
              {/* edit button */}
              <TableCell>
                <EditPartData
                product={product}
                handleRequest={handleEditRequest}
                />
              </TableCell>
              {/* delete button */}
              <TableCell> 
                <DeleteButtonWithDialog
                    userId={product._id}
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

export default ProductsTable;
