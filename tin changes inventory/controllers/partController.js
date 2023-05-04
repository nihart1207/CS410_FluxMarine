const Inventory = require('../models/inventory');
const Part = require('../models/parts');
const { createInventory } = require('./inventoryController');

exports.getAllParts = async (req, res, next) => {
    try {
      const parts = await Part.find();
      return res.status(200).json(parts);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
};

exports.getPartByName = async (req, res, next) => {
  try {
    const partName = req.query.partName;
    const parts = await Part.find({partName: partName});
    return res.status(200).json(parts);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

exports.addNewPart = async (req, res, next) => {
  /* if (req.user.role === "USER") res.status(401).json({message : "unauthorized to add"}); */

  try {
    const {partName, partDescription} = req.body;
    if (!partName) {
      return res.status(400).json({message: "partName missing"});
    }
    const part = new Part({ partName, partDescription });
    await part.save();
    
    // after creating a new part create an inventory for it
    // make a request for createInventory with the part._id
    req.inventory = {
      partTypeID: part._id,
      threshold: 0,
      quantity: 0,
    }
    createInventory(req.inventory, res)

    return res.status(200).json({message: "succesfully added new part"});
  } catch (err) {
    return res.status(500).json({ error: err });
  }

};

exports.deletePartById = async (req, res, next) => {
  if (req.user.role === "USER") res.status(401).json({message : "unauthorized to delete"});

  try {
    const {_id} = req.params;
    await Part.findOneAndDelete({_id: _id});
    await Inventory.findOneAndDelete({partTypeID: _id})
    return res.status(200).json({message: "succesfully removed part"});
  } catch (err) {
    return res.status(500).json({error: err.message});
  }
};

exports.getPartById = async (req, res, next) => {
  try {
    const {_id} = req.params;
    const part = await Part.findById(_id);
    return res.status(200).json(part);
  } catch (err) {
    return res.status(500).json({error: err.message});
  }
};

exports.updatePartById = async (req, res, next) => {
  if (req.user.role === "USER") res.status(401).json({message : "unauthorized to add"});

  try {
    const {_id} = req.params;
    const {partName, partDescription} = req.body;

    const part = Part.findById(_id);
    if (!part) res.status(404).json({message: "part not found"});
    if (partName) part.partName = partName;
    if (partDescription) part.partDescription = partDescription;

    await part.save();
    return res.status(200).json({message: "succesfully updated"});
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};
