const Supplier = require('../models/suppliers');

exports.getAllSuppliers = async (req, res, next) => {
    try {
      const suppliers = await Supplier.find();
      res.status(200).json(suppliers);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err });
    }
};

exports.addNewSupplier = async (req, res, next) => {
  try {
    const {supplierId, supplierName} = req.body;
    const supplier = new Supplier({supplierId, supplierName});
    await supplier.save();
    res.status(200).json({message: "supplier added"});
  } catch (err) {
    console.log(err);
    res.status(500).json({err});
  }
};