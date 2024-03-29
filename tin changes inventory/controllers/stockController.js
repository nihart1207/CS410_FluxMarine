const Stock = require('../models/stocks');
const Part = require('../models/parts');
const Supplier = require('../models/suppliers');
const Inventory = require('../models/inventory');
const { incInventory, decInventory } = require('./inventoryController');

//get all stocks
exports.getAllStocks = async (req, res, next) => {
    try {
      const stocks = await Stock.find().populate("supplier").populate("part");
      return res.status(200).json(stocks);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
};

//create new stock
exports.createNewStock = async (req, res, next) => {
  //if (req.user.role === "USER") res.status(401).json({message : "unauthorized to add"});

  const {notes, supplier_id, part_id} = req.body;

  if (!supplier_id || !part_id) {
    return res.status(404).json({error : "supplier id / part number not provided"})
  }

  try {
    const part = await Part.findOne({_id: part_id});
    const supplier = await Supplier.findOne({_id: supplier_id});
    const stock = new Stock({supplier, part, notes});

    await stock.save();
    return res.status(200).json({message: "successfully added new stock"})
  } catch (err) {
    return res.status(500).json({error: err.message})
  }
}

// update a specific stock by ID
exports.updateStockById = async(req, res, next) => {
  //if (req.user.role === "USER") res.status(401).json({message : "unauthorized to add"});

  const {status, notes} = req.body;
  const {_id} = req.params;
  const stock = await Stock.find({_id: _id});
  if (!stock) res.status(404).json({error: "stock not found"});
  const oldStatus = stock.status
  try { 
    const result = await Stock.findOneAndUpdate(
      { _id: _id },
      { status: status },
      { notes: notes},
    );

    // if stock wasnt in inventory before and was updated to inventory, increase that inventory
  const inventory = await Inventory.findOne({partTypeID: stock.part})
  if (oldStatus != "INVENTORY" && status === "INVENTORY") {
    
      req.params.id = stock.part
      incInventory(req, res)
  }
    // if stock was in inventory before and was updated to something else, decrease inventory
    if (oldStatus === "INVENTORY" && status != "INVENTORY") {
      req.params.id = stock.part
      decInventory(req, res)
  }

    return res.status(200).json({message: "updated succesfully"});
  } catch (err) {
    console.log(err)
    return res.status(500).json({message: err.message});
  }
};

//get a specific stock by ID
exports.getStockByID = async(req, res, next) => {
    const {_id} = req.params;
    if (!_id) {
      return res.status(404).json({error: "id not provided"});
    }
    try {
      const stock = await Stock.findOne({_id: _id});
      if (!stock) res.status(404).json({error: "stock not found"});
      return res.status(200).json(stock);
    } catch (err){
      return res.status(500).json({error: err.message});
    }
};

// Delete a specific stock item by ID
exports.deleteStockByID = async function(req, res) {
  if (req.user.role === "USER") res.status(401).json({message : "unauthorized to add"});

  try {
    const {_id} = req.params;
    const stock =  await getStock({_id: _id});
    if (!stock) res.status(404).json({error: 'stock not found'});
    await Stock.findByIdAndDelete({_id: _id});
    if (stock.status === "INVENTORY") {
      const inventory = await Inventory.findOne({partTypeID: stock.part})
      inventory.quantity = inventory.quantity - 1
      inventory.save()
    }
    return res.json({ message: 'stock item deleted' });
  } catch (err) {
    return res.status(500).json({ message: err.message});
  }
};

// helper function
async function getStock(id) {
  try {
    const stock = await Stock.findById(id).populate('supplier').populate('part');
    return stock;
  } catch (err) {
    return null;
  }
};