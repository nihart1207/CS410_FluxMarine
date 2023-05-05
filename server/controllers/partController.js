const Part = require('../models/parts');

exports.getAllParts = async (req, res) => {
    try {
      const parts = await Part.find();
      return res.status(200).json(parts);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
};


exports.addNewPart = async (req, res) => {
  
  const {partName, partDescription} = req.body;
  if (!partName || !partDescription) {
    return res.status(400).json({message: "missing fields"});
  }

  try {
    const part = new Part({ partName, partDescription });
    await part.save();
    return res.status(200).json(part);
  } catch (err) {
    return res.status(500).json({ error: "internal error" });
  }
};


exports.deletePartById = async (req, res, next) => {
  
  const {_id} = req.params;

  if (!_id) {
    return res.status(400).json({message: "missing fields"});
  }

  try {
    const part = await Part.findOne({_id: _id});
    if (!part) {
      return res.status(404).json({error: "part doesnt exist"});
    }
    await Part.findOneAndDelete({_id: _id});
    return res.status(200).json({message: "succesfully removed part"});
  } catch (err) {
    console.log(err);
    return res.status(500).json({error: "internal error"});
  }
};

exports.getPartById = async (req, res, next) => {
  const {_id} = req.params;

  if (!_id) {
    return res.status(400).json({message: "missing fields"});
  }

  try {
    const part = await Part.findOne({_id: _id});
    if (!part) {
      return res.status(404).json({error: "part doesnt exist"});
    }

    return res.status(200).json(part);
  } catch (err) {
    console.log(err);
    return res.status(500).json({error: "internal error"});
  }
};

exports.updatePartById = async (req, res) => {
  
  const {_id} = req.params;
  const {partName, partDescription} = req.body;

  if (!_id || !partName || !partDescription) {
    return res.status(400).json({message: "missing fields"});
  }

  try {
    const part = await Part.findOne({_id: _id});
    if (!part) {
      return res.status(404).json({error: "part doesnt exist"});
    }
    await Part.updateOne({_id: _id}, {partName: partName, partDescription: partDescription})
    const newPart = await Part.findOne({_id: _id});
    return res.status(200).json(newPart);
  } catch (err) {
    console.log(err);
    return res.status(500).json({error: "internal error"});
  }
};
