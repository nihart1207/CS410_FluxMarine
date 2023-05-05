const Stock = require('../models/stocks');
const Part = require('../models/parts');
const Supplier = require('../models/suppliers');
const fs = require('fs');
const path = require('path');

//get all stocks
exports.getAllStocks = async (req, res) => {
    try {
      const stocks = await Stock.find().populate("supplier").populate("part");
      return res.status(200).json(stocks);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
};

//returns a csv of the stocks from-date to to-date
exports.getStocksInDateRange = async (req, res) => {
  const { fromDate, toDate } = req.query;

  if (!fromDate || !toDate) {
    return res.status(400).json({ error: 'Both from date and to date are required' });
  }

  const startDate = new Date(fromDate);
  const endDate = new Date(toDate);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return res.status(400).json({ error: 'Invalid date format' });
  }

  const stocks = await Stock.find({ createdAt: { $gte: startDate, $lte: endDate } })
    .populate('supplier')
    .populate('part');

  const fields = ['_id' ,'supplier.supplierName', 'part.partName', 'status', 'createdAt'];
  const csvData = [];

  stocks.forEach((stock) => {
    const row = {};
    fields.forEach((field) => {
      const value = field.split('.').reduce((obj, key) => obj[key], stock);
      row[field] = value;
    });
    csvData.push(row);
  });

  const filename = `stocks_${fromDate}_${toDate}.csv`;
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename=${filename}`);

  const stream = fs.createWriteStream(filename);
  csvData.forEach((row) => stream.write(`${Object.values(row).join(',')}\n`));
  stream.end();

  stream.on('finish', () => {
    fs.createReadStream(path.resolve(__dirname, '..', '..', filename))
      .on('error', (err) => console.error(err))
      .on('end', () => {
        fs.unlinkSync(path.resolve(__dirname, '..', '..', filename));
      })
      .pipe(res.status(200).send());
  });
  stream.on('close', () => {
    fs.unlink(path.resolve(__dirname, '..', '..', filename), (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`File ${filename} deleted successfully`);
      }
    });
  })
}


//create new stock
exports.createNewStock = async (req, res) => {
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
exports.updateStockById = async(req, res) => {
  const {status, notes} = req.body;
  const {_id} = req.params;
  if (!status) res.status(400).json({error: "missing fields"});
  const stock = await Stock.find({_id: _id});
  if (!stock) res.status(404).json({error: "stock not found"});

  try { 
    await Stock.findOneAndUpdate({ _id: _id },{ status: status });
    const updatedOrder = await Stock.findOne({ _id: _id }).populate("supplier").populate("part");
    return res.status(200).json(updatedOrder);
  } catch (err) {
    console.log(err)
    return res.status(500).json({message: err.message});
  }
};

//get a specific stock by ID
exports.getStockByID = async(req, res) => {
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