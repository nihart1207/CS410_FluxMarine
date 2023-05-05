require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const userRoutes = require('./server/routes/user');
const supplierRoutes = require('./server/routes/supplier');
const partRoutes = require('./server/routes/part');
const stockRoutes = require('./server/routes/stocks');
const {authenticationMiddleware} = require('./server/middleware/auth')
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 3000;
const uri = process.env.MONGODB_CONNECTION_STRING
const app = express();



app.use(express.json());
app.use(cookieParser());
// middleware

app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use((req, res, next) => {
  if (req.url === "/" || req.url === "/api/login") {
    return next();
  } else {
    return authenticationMiddleware(req, res, next);
  }
});

//api routes
app.use('/api', userRoutes);
app.use('/api', supplierRoutes);
app.use('/api', partRoutes);
app.use('/api', stockRoutes);

// static files
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});


mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connection established.'))
.catch((error) => console.error("MongoDB connection failed:", error.message))




app.listen(port, () => {
    console.log('Server is listening');
    console.log(port)
})