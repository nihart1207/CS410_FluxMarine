const mongoose = require('mongoose');

const partTypeSchema = new mongoose.Schema({

      partName: {
        type: String,
        required: true,
      },
  
      partDescription: {
          type: String,
          default: "",
      },
      
      partSupplier: {
           type: String,
      },
  
      partImageURL: {
        type: String,
        default: "images/default.png"
    }
  }, {timestamps: true});

  const Part = mongoose.model('PartType', partTypeSchema);
  module.exports = Part;
