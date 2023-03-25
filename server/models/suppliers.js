const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    supplierName: {
        type: String,
        required: true,
      },
  
      supplierId: {
          type: Number,
          required: true,
          unique: true,
    },
  }, {timestamps: true});

  const Supplier = mongoose.model('Supplier', supplierSchema);
  module.exports = Supplier;