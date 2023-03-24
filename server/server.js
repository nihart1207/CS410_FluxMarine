const express = require('express');
const mongoose = require('mongoose');
const path = require('path');


require("dotenv").config();

const app = express();
app.use(express.json());

const userRoutes = require('./routes/user');

app.use('/users', userRoutes);

const port = 3000;
const uri = process.env.MONGODB_CONNECTION_STRING



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