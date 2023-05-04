const mongoose = require('mongoose');

// schema for keeping track of quantity of each part and their threshold for notification that is in inventory
// will be used to send low inventory emails

const inventorySchema = new mongoose.Schema({

      partTypeID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Part'
      },
  
      threshold: {
          type: Number,
          default: 0,
      },
      
      quantity: {
        type: Number,
        default: 0,
      },

  }, {timestamps: true});

  const Inventory = mongoose.model('Inventory', inventorySchema);
  module.exports = Inventory;
