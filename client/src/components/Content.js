import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Card } from "@mui/material";
import { CardContent } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function Content() {

  React.useEffect(() => {
    fetch('/api/stocks', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);
  
  const stocks = [
    { name: 'Product A', quantity: 20 },
    { name: 'Product B', quantity: 35 },
    { name: 'Product C', quantity: 10 },
    { name: 'Product D', quantity: 45 },
    { name: 'Product E', quantity: 30 },
  ];
  
  // For Orders table
  return (

        <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              Total Products
            </Typography>
            <Typography color="textSecondary">
              1435
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              Low In Stock 
            </Typography>
            <Typography color="textSecondary">
            26
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              Out of Stock 
            </Typography>
            <Typography color="textSecondary">
            4
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              Stock Quantity
            </Typography>
            <BarChart width={500} height={300} data={stocks}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="quantity" fill="#8884d8" />
            </BarChart>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}