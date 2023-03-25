require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const userRoutes = require('./routes/user');
const supplierRoutes = require('./routes/supplier');
const partRoutes = require('./routes/part');
const stockRoutes = require('./routes/stocks');


const app = express();
app.use(express.json());


const port = 3000;
const uri = process.env.MONGODB_CONNECTION_STRING


app.use('/api', userRoutes);
app.use('/api', supplierRoutes);
app.use('/api', partRoutes);
app.use('/api', stockRoutes);


app.use(express.static(path.join(__dirname, '..', 'clientside', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'clientside', 'build', 'index.html'));
});



mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true

})
.then(() => console.log('MongoDB connection established.'))
.catch((error) => console.error("MongoDB connection failed:", error.message))




app.listen(port, () => {
    console.log('App is running');
})