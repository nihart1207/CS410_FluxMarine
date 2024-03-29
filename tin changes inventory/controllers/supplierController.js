const Supplier = require('../models/suppliers');

exports.getAllSuppliers = async (req, res, next) => {
    try {
      const suppliers = await Supplier.find();
      return res.status(200).json(suppliers);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
};

exports.addNewSupplier = async (req, res, next) => {
  //if (req.user.role === "USER") res.status(401).json({message : "unauthorized to add"});

  try {
    const {supplierName, email, contact} = req.body;
    const supplier = new Supplier({supplierName, email, contact});
    await supplier.save();
    return res.status(200).json({message: "succesfully added new supplier"});
  } catch (err) {
    return res.status(500).json({error: err.message});
  }
};

exports.updateSupplierById = async (req, res, next) => {
  if (req.user.role === "USER") res.status(401).json({message : "unauthorized to add"}); 

  try {
    const {_id} = req.params;
    const {supplierName, email, contact} = req.body;
    const supplier = await Supplier.findById(_id);
    if (!supplier) res.status(404).json({error: "supplier doesnt exist"});
    
    if (supplierName) supplier.supplierName = supplierName;
    if (email) supplier.email = email;
    if (contact) supplier.contact = contact;
    await supplier.save();
    return res.status(200).json({message: "supplier data updated successfully"});
  } catch (err) {
    return res.status(500).json({error: err.message});
  }
};

exports.deleteSupplierById = async (req, res, next) => {
  if (req.user.role === "USER") res.status(401).json({message : "unauthorized to add"});

  try {
    const {_id} = req.params;
    const supplier = await Supplier.findById(_id);
    if (!supplier) res.status(404).json({error: "supplier doesnt exist"});
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

