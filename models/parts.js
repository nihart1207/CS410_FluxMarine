const mongoose = require('mongoose');

const partSchema = new mongoose.Schema({

      partName: {
        type: String,
        required: true,
      },
  
      partDescription: {
          type: String,
          default: "",
      },
      
      partImageURL: {
        type: String,
        default: "images/default.png"
    }
  }, {timestamps: true});

  const Part = mongoose.model('Part', partSchema);
  module.exports = Part;
