const mongoose = require('mongoose');
const Supplier = require('./suppliers');
const Part = require('./parts');

const stockSchema = new mongoose.Schema({
    supplier: { type: mongoose.Schema.Types.ObjectId, 
        ref: 'Supplier',
        required: true,
    },

    part: {type: mongoose.Schema.Types.ObjectId, 
        ref: 'Part', 
        required: true,
    },

    status: {
      type: String,
      enum : ["INVENTORY", "ASSEMBLY", "RECEIVED"],
      default: "RECEIVED"
    },

    notes: {
        type: String,
        default: "",
    },
    
  }, {timestamps: true});

  const Stock = mongoose.model('Stock', stockSchema);
  module.exports = Stock;