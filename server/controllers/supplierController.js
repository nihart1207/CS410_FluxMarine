const Supplier = require('../models/suppliers');

exports.getAllSuppliers = async (req, res) => {
    try {
      const suppliers = await Supplier.find();
      return res.status(200).json(suppliers);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
};

exports.addNewSupplier = async (req, res) => {
  try {
    const {supplierName, email, contact} = req.body;
    if (!supplierName || !email || !contact) {
      return res.status(400).json({error: "missing fields"});
    }

    const supplier = new Supplier({supplierName, email, contact});
    await supplier.save();
    return res.status(200).json(supplier);
  } catch (err) {
    return res.status(500).json({error: err.message});
  }
};

exports.updateSupplierById = async (req, res) => {

  try {
    const {_id} = req.params;
    const {supplierName, email, contact} = req.body;
    const supplier = await Supplier.findById(_id);
    if (!supplier) res.status(404).json({error: "supplier doesnt exist"});
    
    const updateData = {};
    if (supplierName) updateData.supplierName = supplierName;
    if (email) updateData.email = email;
    if (contact) updateData.contact = contact;

    await Supplier.updateOne({ _id: _id }, updateData);
    const newData = await Supplier.findOne({_id: _id});
    return res.status(200).json(newData);
  } catch (err) {
    return res.status(500).json({error: err.message});
  }
};

exports.deleteSupplierById = async (req, res) => {

  try {
    const {_id} = req.params;
    if (!_id) {
      res.status(400).json({error: "_id missing "});
    }

    const supplier = await Supplier.findById(_id);
    if (!supplier) {
      res.status(404).json({error: "supplier doesnt exist"});
    }

    await Supplier.findOneAndDelete({_id: _id});
    return res.status(200).json({message: "supplier removed successfully"});
  } catch (err) {
    return res.status(500).json({error: err.message});
  }
};


exports.getSupplierById = async (req, res, next) => {
  try {
    const {_id} = req.params;
    const supplier = await Supplier.findById(_id);
    if (!supplier) res.status(404).json({error: "supplier doesnt exist"});
    return res.status(200).json(supplier);
  } catch (err) {
    return res.status(500).json({error: err.message});
  }
};

