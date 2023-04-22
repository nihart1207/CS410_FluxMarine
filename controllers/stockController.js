const Stock = require('../models/stocks');
const Part = require('../models/parts');
const Supplier = require('../models/suppliers');
const { get } = require('mongoose');

//get all stocks
exports.getAllStocks = async (req, res, next) => {
    try {
      const stocks = await Stock.find();
      res.status(200).json(stocks);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
};

//create new stock
exports.createNewStock = async (req, res, next) => {
  if (req.user.role === "USER") res.status(401).json({message : "unauthorized to add"});

  const {notes, supplier_id, part_id} = req.body;

  if (!supplier_id || !part_id) {
    res.status(404).json({error : "supplier id / part number not provided"})
  }

  try {
    const part = await Part.findOne({part_id});
    const supplier = await Supplier.findOne({supplier_id});
    const stock = new Stock({supplier, part, notes});
    await stock.save();
    console.log(stock.supplier);
    console.log(stock.part);
    res.status(200).json({message: "successfully added new stock"})
  } catch (err) {
    res.status(500).json({error: err.message})
  }
}

// update a specific stock by ID
exports.updateStockById = async(req, res, next) => {
  if (req.user.role === "USER") res.status(401).json({message : "unauthorized to add"});

  const {status, notes} = req.body;
  const _id = req.params;
  const stock = getStock(_id);
  if (!stock) res.status(404).json({error: "stock not found"});

  try {
    if (status) stock.status = status;
    if (notes) stock.notes = notes;
    await stock.save();
    res.status(200).json({message: "updated succesfully"});
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

//get a specific stock by ID
exports.getStockByID = async(req, res, next) => {
    const _id = req.params;
    if (!id) {
      res.status(404).json({error: "id not provided"});
    }
    try {
      const stock = await getStock(_id);
      if (!stock) res.status(404).json({error: "stock not found"});
      res.status(200).json(stock);
    } catch (err){
      res.status(500).json({error: err.message});
    }
};

// Delete a specific stock item by ID
exports.deleteStockByID = async function(req, res) {
  if (req.user.role === "USER") res.status(401).json({message : "unauthorized to add"});

  try {
    const _id = req.params;
    const stock =  await getStock(_id);
    if (!stock) res.status(404).json({error: 'stock not found'});
    await res.stock.remove();
    res.json({ message: 'stock item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message});
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