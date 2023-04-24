const mongoose = require('mongoose');

const partSchema = new mongoose.Schema({

      // partName will be used to form relationships between individual parts in this schema to the partTypes
      partName: {
        type: String,
        required: true,
      },
      
      // We are creating barcodes using 3 random Uppercase/Numbers prepended to the now() function in JS
      partID: {
        type: String,
      },
  
      dateReceived: {
        type: Date,
      },
  
      currentState: {
        type: String,
      },

      qcstatus: {
        type: Boolean,
      },
      
      notes: {
        type: String,
      },
 
  }, {timestamps: true});

  const Part = mongoose.model('Part', partSchema);
  module.exports = Part;
