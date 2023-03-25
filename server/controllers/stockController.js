const Stock = require('../models/stocks');

exports.getAllStocks = async (req, res, next) => {
    try {
      const stocks = await Stock.find();
      res.status(200).json(stocks);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err });
    }
};