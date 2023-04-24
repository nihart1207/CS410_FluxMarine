const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    supplierName: {
        type: String,
        required: true,
    },
    
    supplierID: {
        type: Number
    },

    email: {
      type :String,
      default: ""
    },

    contact: {
      type: String,
      default: ""
    }

  },{timestamps: true});

  const Supplier = mongoose.model('Supplier', supplierSchema);
  module.exports = Supplier;
